
angular.module('starter')
  .controller('listadoProductosCtrl', function($scope, $stateParams, $http) {
    console.log(angular.fromJson($stateParams.categoria));
    var url = 'http://oscarnr.16mb.com/appDrinks/listadoProductos/listarProductos.php';

    console.log(url);

    var categoria = angular.fromJson($stateParams);

    $http.post(url, categoria)
      .then(function (data){
        //console.log(angular.toJson(data.data));

        $scope.cate = angular.fromJson($stateParams.categoria);
      });
  });
