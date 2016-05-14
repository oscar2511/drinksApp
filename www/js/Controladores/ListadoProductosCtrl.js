angular.module('starter')
  .controller('listadoProductosCtrl', function(
    $scope,
    $stateParams,
    $http,
    $ionicLoading,
    $ionicPopup
  ){

    $ionicLoading.show({
      template: 'Cargando, espere por favor...'
    });

    var url = 'http://oscarnr.16mb.com/appDrinks/listadoProductos/listarProductos.php';

    var categoria = angular.fromJson($stateParams.categoria);

    $http.post(url, categoria, {headers: { 'Content-Type': 'application/json'}})
      .then(function (data){
        console.log(angular.fromJson(data.data));
        angular.forEach(data.data, function(value, key) {
          $scope.dataCruda = value;
        });
        $scope.productos =[];
          angular.forEach($scope.dataCruda, function(valor, key) {
            $scope.productos.push({
              id    :valor.id,
              precio: valor.precio,
              descripcion: valor.descripcion,
              nombre: valor.nombre
            });
          });
        $ionicLoading.hide();
      });
///////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////

  });
