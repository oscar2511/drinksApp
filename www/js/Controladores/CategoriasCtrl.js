
angular.module('starter')
  .controller('categoriasCtrl', function($scope, $http, $sce){
    var url = 'http://oscarnr.16mb.com/appDrinks/appDrinks.php';
    var postUrl = $sce.trustAsResourceUrl(url);

    console.log(url);

    $http.get(url)
      .then(function(data){
        //console.log(angular.toJson(data.data));
        angular.forEach(data.data, function(value, key) {

          $scope.dataCruda = value;
        });
        $scope.categorias =[];
          angular.forEach($scope.dataCruda, function(valor, key) {
            console.log(valor.id);
            $scope.categorias.push({
              id    :valor.id,
              nombre: valor.nombre
            });
          });
        console.log($scope.categorias);

      });

   /* $scope.categorias = [
      { nombre: 'Vinos', id: 1 },
      { nombre: 'Cervezas', id: 2 },
      { nombre: 'Licores', id: 3 },
      { nombre: 'Whiskeys', id: 4 }
    ];*/
  });
