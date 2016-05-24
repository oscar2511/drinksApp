angular.module('starter')
  .controller('categoriasCtrl', function($scope, $http, $sce, $ionicLoading){

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    var url = 'http://oscarnr.16mb.com/appDrinks/categorias/getCategorias.php';

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
