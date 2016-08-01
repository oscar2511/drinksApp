
angular.module('starter')
  .controller('contactoCtrl', function($scope, $http, PedidoService) {

    $scope.enviar = function () {

      var url = 'http://23.94.249.163/appDrinks/pedidos/pedidos.php';
      var pedido = angular.fromJson($scope.pedido);

      $http.post(url, pedido, {headers: {'Content-Type': 'application/json'}})
        .then(function (data) {
          console.log(data);

          var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4MjllZTIxOS01MzA4LTRhZDMtYWQ5NS1lZTQ3Y2YxMzhiMTMifQ.QzA7PSQHEEiSz-cEun7iUZdJRyAXd3iIRQSlsWPL0Yw';
          var tokens = ['dR0mBCNclQg:APA91bGjdUHQk2Y_g89HTSF-XAr_44Rcr2UTbqaqY2MlF9D_ofGFmI4MHjs3PwA2OoDuEcm-yOfpTmOAECa1psgUUl_N1WRQOQmVXOlZWOtkY1PHGXidcruKWuFuvVCdzz5aUNGl79TL'];
          var profile = 'testdevelopment';

          var req = {
            method: 'POST',
            url: 'https://api.ionic.io/push/notifications',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + jwt
            },
            data: {
              "tokens": tokens,
              "profile": profile,
              "notification": {
                "title": "Nuevo pedido",
                "message": "Direccion: " + $scope.pedido.ubicacion.direccion.calle + "\n" + $scope.pedido.ubicacion.direccion.numero,
                "android": {
                  "title": "Nuevo pedido",
                  "message": "Direccion: " + $scope.pedido.ubicacion.direccion.calle + "\n" + $scope.pedido.ubicacion.direccion.numero,
                }
              }
            }
          };

// Make the API call
          $http(req).success(function (resp) {
              alert('llego notif');

          }).error(function (error) {
            // Handle error
            console.log("Mensaje Push: Mensaje error", error);
          });
        }).catch(function () {
          alert('error');
        });
    };


    /**
     *
     */
    $scope.pedido = PedidoService;
    $scope.cambiarEstado = function(){
      $scope.pedido.cambiarEstado();
    };



    /**
     *
     */
    $scope.pedidoRecibido = function(idPedido,estado){
     /* var confirmPopup = $ionicPopup.confirm({
        title:      'Confirmar acción',
        template:   'Realmente quieres marcar tu pedido como "Recibido" ?',
        cancelText: 'Cancelar',
        okText:     'Confirmar'
      });
*/
      //confirmPopup.then(function(res) {

        //if(res) {
         // $ionicLoading.show({
           // template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
          //});
          var urlCambiarEstado = 'http://23.94.249.163/appDrinks/pedidos/cambiar_estado_pedido.php';
          $http.post(urlCambiarEstado, {idPedido: $rootScope.idUltPedido, estado:3}, {headers: { 'Content-Type': 'application/json'}})
            .then(function (data){
              $scope.pedido.limpiarTodo();
              $state.go('app.categorias');
              $ionicLoading.hide();
            });
        //}
     // });

    };












  });
