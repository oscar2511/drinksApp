
angular.module('starter')
  .controller('pedidoCtrl',
  function($scope,
           PedidoService,
           $ionicPopup,
           mapaService,
           $timeout,
           $ionicLoading,
           $cordovaGeolocation,
           $http,
           $state,
           $rootScope,
           NotificacionService,
           $q,
           dispositivoService
  )
  {


    $scope.pedido                = PedidoService;
    $scope.pedidoActual          = PedidoService.getPedido();
    $scope.mostrarMapa           = false;
    $scope.mostrarTotales        = true;
    $scope.mostrarFormUbicacion  = false;
    $scope.bloquearBtns          = false;
    $rootScope.tieneProductos    = false;
    $scope.mapaCargado           = false;
    $scope.errorUbicacion        = false;

    $rootScope.abierto = true;

    if($rootScope.totalProductos > 0)
      $rootScope.tieneProductos = true;


    $scope.abiertoCerrado = function(){
      var estadoApertura = $rootScope.urls.estadoApertura;
      $http.get(estadoApertura)
        .then(function(data){
          if(data.data[0].esta_abierto)
            $rootScope.abierto = true;
          else
            $rootScope.abierto = false;
        })
    };


    $scope.habilitarBtnPedido = function(value, type){
      if(type == 'dir_ref') {
        if (value != '')
          $scope.referencia = true;
        else
          $scope.referencia = false;
      }

      if(type == 'tel') {
        if (value != '')
          $scope.telefono = true;
        else
          $scope.telefono = false;
      }

      if($scope.referencia && $scope.telefono)
        $scope.mapaCargado = true;
      else{
        $scope.mapaCargado = false;
      }
    };

    if(true == $rootScope.pedidoPendiente)
      $state.go('app.pedido-pendiente');


    //***************** geo localizacion  *********************
    /**
     * Muestra el mapa
     */
    var verUbicacion = function(){

      var timer = $timeout(
        function() {
          $scope.errorUbicacion = true;
        },
        10000
      );

      $scope.bloquearBtns = true;
      var styles = [
        {
          stylers: [
            { hue: "#00ffe6" },
            { saturation: -20 }
          ]
        },{
          featureType: "road",
          elementType: "geometry",
          stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
          ]
        },{
          featureType: "road",
          elementType: "labels",
          stylers: [
            { visibility: "on" }
          ]
        }
      ];

      $scope.mostrarTotales = false;
      var options = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options)
        .then(function(position){
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          var latitud = position.coords.latitude;
          var longitud = position.coords.longitude;

          var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: styles,
            marker: marker
          };

          var map = new google.maps.Map(document.getElementById("map"), mapOptions);

          var marker = new google.maps.Marker({
            position: latLng,
            map     : map,
            title   : "Dirección de entrega"
          });

          //detectar calle
          var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitud+','+longitud+'&key=AIzaSyDDM7IL8Ep6r1jUoMXZUo0fDGNuigfX-GU';

          $http.get(url)
            .then(function(data){

              PedidoService.pedido.ubicacion.direccion.calle  = data.data.results[0].address_components[1].short_name;
              PedidoService.pedido.ubicacion.direccion.numero = data.data.results[0].address_components[0].short_name;

              PedidoService.pedido.ubicacion.coordenadas = {
                'lat' : latitud,
                'long': longitud
              }
            });
          $timeout.cancel(timer);
         // $scope.mapaCargado = true;

        }, function(error){
          $scope.errorUbicacion= true;
          //console.log("Could not get location");
        });
      $scope.mostrarMapa = true;
      $scope.mostrarFormUbicacion= true;
    };

    $scope.verUbicacion = function(){

    verUbicacion();
    };

    //*******************************************************************************************************************

    /**
     *  Elimina todos los productos del pedido
     */
    $scope.limpiarCarro = function(){

        var confirmPopup = $ionicPopup.confirm({
          title:      'Confirmar acción',
          template:   'Realmente quieres limpiar tu pedido?',
          cancelText: 'Cancelar',
          okText:     'Confirmar'
        });

        confirmPopup.then(function(res) {
          if(res) {
            PedidoService.limpiarPedido();
            $scope.tieneProductos = false;
          }
        });
    };

    /**
     * Agrega en 1 la cantidad de un producto de un pedido
     *
     * @param productoPedido
     */
    $scope.addCantidad = function(productoPedido){
      var producto = productoPedido.producto;
      var cantidad = 1;
      PedidoService.addProductoCantidad(producto, cantidad);
      var alertPopup = $ionicPopup.alert({
        title: 'Agregaste 1 unidad al producto',
        buttons: null
      });

       $timeout(function() {
        alertPopup.close();
       }, 2000);

    };

    /**
     * Decrementa en 1 la cantidad de un producto de un pedido
     * @param productoPedido
     */
    $scope.restarCantidad = function(productoPedido){
     var producto = productoPedido.producto;
      if(productoPedido.cantidad == 1)
        return $scope.eliminarProducto(productoPedido);
     var cantidad = -1;
      PedidoService.decrementarProductoCantidad(producto, cantidad);
      var alertPopup = $ionicPopup.alert({
        title: 'Quitaste 1 unidad al producto',
        buttons: null
      });

      $timeout(function() {
        alertPopup.close();
      }, 2000);

   };

    /**
     * Elimina un producto de un pedido
     *
     * @param productoPedido
     */
    $scope.eliminarProducto = function(productoPedido){
      var confirmPopup = $ionicPopup.confirm({
        title:      'Confirmar acción',
        template:   'Realmente quieres quitar el producto de tu pedido?',
        cancelText: 'Cancelar',
        okText:     'Confirmar'
      });

      confirmPopup.then(function(res) {
        if(res) {
          var producto = productoPedido.producto;
          PedidoService.eliminarProductoPedido(producto);
          $scope.tieneProductos = false;
        }
      });
    };

    $scope.volverAPedido = function(){
      $scope.mostrarMapa           = false;
      $scope.mostrarTotales        = true;
      $scope.mostrarFormUbicacion  = false;
      $scope.bloquearBtns          = false;
    };


    /**
     * Registra el pedido en la base de datos
     */

    var intentos            = 0,
        esperaEntreIntentos = 1000,
        maxIntentos         = 3;

    $scope.confirmarPedido = function(tel, dir_ref){
      $ionicLoading.show({
        template: 'Enviando pedido. Espera por favor...<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });

      var timer = $timeout(
        function() {
          $ionicLoading.hide();
          $state.go('app.error');
        },
        20000
      );

      PedidoService.pedido.ubicacion.referencia.tel     = tel;
      PedidoService.pedido.ubicacion.referencia.dir_ref = dir_ref;
      var pedido = angular.fromJson(PedidoService.pedido);

      // registra el pedido y envia push al admin
      //NotificacionService.registrarNuevoPedido(pedido)
      PedidoService.registrarNuevoPedido(pedido)
        .then(function(estado) {
          if(estado == 200) {
            /*NotificacionService.enviarPushNuevoPedido($scope.pedido)
              .success(function () {

              });
              */

            var alertPopup = $ionicPopup.alert({
              title: 'Tu pedido fué enviado, te notificaremos cuando sea procesado. Salud !!',
              buttons: [{
                text: 'Aceptar',
                type: 'button button-outline button-positive'
              }]
            });
            alertPopup.then(function (res) {
              /*$rootScope.totalProductos = "pendiente";
              $rootScope.pedidoPendiente = true;
              $rootScope.totalUltPedido = PedidoService.pedido.total;
              $rootScope.fechaUltPedido = PedidoService.pedido.fecha;
              $scope.mostrarMapa = false;*/
              $scope.mostrarMapa = false;
              PedidoService.limpiarTodo();

              $state.go('app.categorias');
            });
            $ionicLoading.hide();
            $timeout.cancel(timer);
          } else{
            $ionicLoading.hide();
            $timeout.cancel(timer);
            $state.go('app.error');
          }

      })
      .catch(function(err) {
        //console.log("Mensaje Push: Mensaje error", err);
          if(intentos < maxIntentos){
            intentos++;
            $timeout(function() {
              $scope.confirmarPedido(tel, dir_ref);
            }, esperaEntreIntentos);
          }
          else {
            $ionicLoading.hide();
            $state.go('app.error');
          }
      })
  };

});
