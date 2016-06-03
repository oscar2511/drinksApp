angular.module('starter.controllers', [])

.controller('AppCtrl',
  function($scope,
           $ionicModal,
           $timeout,
           PedidoService,
            $http)
  {

  $scope.pedido = PedidoService;

    $scope.enviarPush = function(){
      // Define relevant info
      var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MjllZTIxOS01MzA4LTRhZDMtYWQ5NS1lZTQ3Y2YxMzhiMTMifQ.uNr-tPQzL63TOKShweE2Tychft3fPHF5H5Pc_8xmVeM';
      var tokens = ['DEV-0dd30c32-187c-4af9-8e64-bb24feb80e11'];
      var profile = 'api-ionic-drinksApp';

// Build the request object
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
            "title": "Hi",
            "message": "Hello world!",
            "android": {
              "title": "Hey",
              "message": "Hello Android!"
            },
            "ios": {
              "title": "Howdy",
              "message": "Hello iOS!"
            }
          }
        }
      };

// Make the API call
      $http(req).success(function(resp){
        // Handle success
        console.log("Ionic Push: Push success", resp);
      }).error(function(error){
        // Handle error
        console.log("Ionic Push: Push error", error);
      });
    };

});

