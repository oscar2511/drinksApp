angular.module('starter')
  .controller('productoCtrl', function($scope, $stateParams, $rootScope, pedidoDrinks){
    var producto = angular.fromJson($stateParams.producto);
    console.log(producto.nombre);

    console.log(pedidoDrinks);

    $scope.producto = producto;

    $rootScope.test =123;
    //------------popup--------------

//-------------------/popup-------------------------
  });
