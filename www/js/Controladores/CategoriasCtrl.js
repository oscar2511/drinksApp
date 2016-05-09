
angular.module('starter')
  .controller('categoriasCtrl', function($scope, $http, $sce){
    var url = 'http://oscarnr.16mb.com/appDrinks/categorias/getCategorias.php';
    var postUrl = $sce.trustAsResourceUrl(url);

    console.log(url);

    $http.get(url)
      .then(function(data){
        console.log(data.data);
        angular.forEach(data.data, function(value, key) {
       //   console.log(value);
          $scope.dataCruda = value;
        });
        $scope.categorias =[];
          angular.forEach($scope.dataCruda, function(valor, key) {
            //console.log(valor.id);
            $scope.categorias.push({
              id    :valor.id,
              nombre: valor.nombre
            });
          });
        //  console.log($scope.categorias);

      });

  });
