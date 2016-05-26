
angular.module('starter')
  .controller('pedidoCtrl', function($scope, PedidoFactory, $ionicPopup, $timeout, $cordovaGeolocation, $ionicModal) {

    $scope.pedido       = PedidoFactory;
    $scope.pedidoActual = $scope.pedido.getPedido();

    $scope.mostrarMapa = false;


    //***************** geo localizacion test *********************
    $scope.verUbicacion = function(){
      var options = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options)
        .then(function(position){
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            map: map,
            title: "My Location"
          });

          var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        }, function(error){
          console.log("Could not get location");
        });



      $scope.mostrarMapa = true;
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
    $scope.addCantidad =  function(productoPedido){
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



//*****************   modal  ***********************

    $ionicModal.fromTemplateUrl('templates/ubicacion.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.cerrarUbicacion = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.ubicacionMostrar = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.cerrarUbicacion();
      }, 1000);
    };

    //**************************************************



  });
