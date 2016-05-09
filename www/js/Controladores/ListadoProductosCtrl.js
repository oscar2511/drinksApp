
angular.module('starter')
  .controller('listadoProductosCtrl', function($scope, $stateParams, $http) {
    //console.log(angular.fromJson($stateParams.categoria));
    var url = 'http://oscarnr.16mb.com/appDrinks/listadoProductos/listarProductos.php';

    //console.log(angular.fromJson($stateParams.categoria));

    var categoria = angular.fromJson($stateParams.categoria);
    //console.log(categoria.id);
    $http.post(url, categoria, {headers: { 'Content-Type': 'application/json'}})
      .then(function (data){
        //console.log((data.data));
        angular.forEach(data.data, function(value, key) {
          console.log(value);
          //$scope.dataCruda = value;
        });
        console.log($scope.dataCruda);
        $scope.cate = angular.fromJson($stateParams.categoria);
      });
  });
