
angular.module('starter')
  .controller('pedidoCtrl',
  function($scope,
           PedidoService,
           $ionicPopup,
           $timeout,
           $cordovaGeolocation,
           $http
  )
  {
    $scope.pedido                = PedidoService;
    $scope.pedidoActual          = $scope.pedido.getPedido();
    $scope.mostrarMapa           = false;
    $scope.mostrarTotales        = true;
    $scope.mostrarFormUbicacion  = false;
    $scope.bloquearBtns          = false;

    //***************** geo localizacion  *********************


    /**
     * Muestra el mapa
     */
    var verUbicacion = function(){
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

          $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

          //marker//
          var marker = new google.maps.Marker({
            position: latLng,
            map     : $scope.map,
            title   : "Dirección de entrega"
          });



          //detectar calle
          var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitud+','+longitud+'&key=AIzaSyDDM7IL8Ep6r1jUoMXZUo0fDGNuigfX-GU';

          $http.get(url)
            .then(function(data){
              $scope.direccion={
                calle:"",
                numero: null
              };
              //console.log(data.data.results[0].formatted_address);
              console.log(data.data.results[0].address_components[1].short_name);

              $scope.direccion.calle  = data.data.results[0].address_components[1].short_name;
              $scope.direccion.numero = data.data.results[0].address_components[0].short_name;
            });

        }, function(error){
          console.log("Could not get location");
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
            $scope.pedido.limpiarPedido();
          }
        });
    };

    /**
     * Agrega en 1 la cantidad de un producto de un pedido
     *
     * @param productoPedido
     */
    $scope.addCantidad = function(productoPedido){
      console.log(ionic.Platform.device());
      var producto = productoPedido.producto;
      var cantidad = 1;
      $scope.pedido.addProductoCantidad(producto, cantidad);
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
      console.log(productoPedido);
     var producto = productoPedido.producto;
     var cantidad = -1;
     $scope.pedido.decrementarProductoCantidad(producto, cantidad);
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
          $scope.pedido.eliminarProductoPedido(producto);
        }
      });
    };

    $scope.volverAPedido = function(){
      $scope.mostrarMapa           = false;
      $scope.mostrarTotales        = true;
      $scope.mostrarFormUbicacion  = false;
      $scope.bloquearBtns          = false;
    };

});
