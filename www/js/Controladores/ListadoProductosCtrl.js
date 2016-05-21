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
    $scope.imgCategoria = null;
    var url = 'http://oscarnr.16mb.com/appDrinks/listadoProductos/listarProductos.php';

    var categoria = angular.fromJson($stateParams.categoria);

    $scope.catUrlImg = categoria.urlImg;
    console.log(categoria.urlImg);

    $http.post(url, categoria, {headers: { 'Content-Type': 'application/json'}})
      .then(function (data){
        angular.forEach(data.data, function(value, key) {
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
              idCategoria:  valor.idCategoria
            });
          });

        console.log($scope.idCategoria);
        switch ($scope.idCategoria) {
          case '1':
            $scope.imgCategoria = "vinos.jpg";
            break;
          case '2':
            $scope.imgCategoria = "cerveza.jpg";
            break;
          case '3':
            $scope.imgCategoria = "cerveza.jpg";
            break;
          default:
            $scope.imgCategoria = "vinos.jpg";
            break;
        }

      });
    $ionicLoading.hide();
  });
