
angular.module('starter')
  .controller('contactoCtrl', function($scope, $http) {

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

  });
