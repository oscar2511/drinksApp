
angular.module('starter')
  .controller('listadoProductosCtrl', function($scope, $stateParams){
    console.log(angular.fromJson($stateParams.categoria));
    console.log($stateParams.categoria);
    $scope.cate = angular.fromJson($stateParams.categoria);
  });
