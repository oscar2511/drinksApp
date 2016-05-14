
angular.module('starter')
  .controller('categoriasCtrl', function($scope, $http, $sce, $ionicLoading){

    $ionicLoading.show({
      template: 'Cargando, espere por favor...'
    });
    var url = 'http://oscarnr.16mb.com/appDrinks/categorias/getCategorias.php';
    var postUrl = $sce.trustAsResourceUrl(url);


    $http.get(url)
      .then(function(data){
        angular.forEach(data.data, function(value, key) {
          $scope.dataCruda = value;
        });
        $scope.categorias =[];
          angular.forEach($scope.dataCruda, function(valor, key) {

            $scope.categorias.push({
              id      : valor.id,
              nombre  : valor.nombre,
              urlImg  : valor.urlImg
            });
          });
          console.log($scope.categorias);
        $ionicLoading.hide();
      });


  });
