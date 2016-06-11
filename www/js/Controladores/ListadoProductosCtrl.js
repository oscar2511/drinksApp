angular.module('starter')
  .controller('listadoProductosCtrl', function(
                                              $scope,
                                              $stateParams,
                                              $http,
                                              $ionicLoading)
  {
    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });
    $scope.imgCategoria = null;
    var url = 'http://oscarnr.16mb.com/appDrinks/listadoProductos/listarProductos.php';

    var categoria = angular.fromJson($stateParams.categoria);

    $scope.catUrlImg = categoria.urlImg;

    /**
     * Obtener los producto de una categoria del servidor
     *
     */
    $http.post(url, categoria, {headers: { 'Content-Type': 'application/json'}})
      .then(function (data){
        angular.forEach(data.data, function(value) {
          $scope.dataCruda = value;
        });
        $scope.productos =[];
          angular.forEach($scope.dataCruda, function(valor, key) {
            $scope.idCategoria = valor.idCategoria;
            $scope.productos.push({
              id:           valor.id,
              precio:       valor.precio,
              descripcion:  valor.descripcion,
              nombre:       valor.nombre,
              stock:        valor.stock,
              idCategoria:  valor.idCategoria,
              urlImg  :     valor.urlImg
            });
          });

        $ionicLoading.hide();
      });

  });
