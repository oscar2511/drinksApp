angular.module('starter')
  .controller('listadoProductosCtrl', function($scope, $stateParams, $http, $ionicLoading) {

    $ionicLoading.show({
      template: 'Ten paciencia ;)'
    });

    var url = 'http://oscarnr.16mb.com/appDrinks/listadoProductos/listarProductos.php';

    var categoria = angular.fromJson($stateParams.categoria);
console.log("aca");
    $http.post(url, categoria, {headers: { 'Content-Type': 'application/json'}})
      .then(function (data){
        console.log(angular.fromJson(data.data));
        angular.forEach(data.data, function(value, key) {
          //console.log(value.id);
          $scope.dataCruda = value;
        });
        $scope.productos =[];
          angular.forEach($scope.dataCruda, function(valor, key) {
            //console.log(valor.id);
            $scope.productos.push({
              id    :valor.id,
              precio: valor.precio,
              descripcion: valor.descripcion,
              nombre: valor.nombre
            });
          });
        //console.log($scope.productos);
        $ionicLoading.hide();
      });
  });
