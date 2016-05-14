angular.module('starter')
  .controller('productoCtrl', function($scope, $stateParams){
    var producto = angular.fromJson($stateParams.producto);
    console.log(producto.nombre);

    $scope.producto = producto;


    //------------popup--------------

    $scope.detalleProducto = function() {
      $scope.data = {};
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        //template: '<input type="password" ng-model="data.wifi">',
        title: 'Enter Wi-Fi Password',
        subTitle: 'Please use normal things',
        templateUrl: '../templates/producto/detalleProducto.html',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.wifi) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.wifi;
              }
            }
          }
        ]
      });

    };
//-------------------/popup-------------------------
  });
