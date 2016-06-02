angular.module('starter')
  .controller('categoriasCtrl', function($scope, $http, $sce, $ionicLoading, $ionicPush, $ionicPlatform, $ionicUser){

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    var url = 'http://oscarnr.16mb.com/appDrinks/categorias/getCategorias.php';

    /**
     *  Obtener las categorias del servidor
     */
    $http.get(url)
      .then(function(data){
        angular.forEach(data.data, function(value) {
          $scope.dataCruda = value;
        });
        $scope.categorias =[];

        angular.forEach($scope.dataCruda, function(valor) {
          $scope.categorias.push({
            id      : valor.id,
            nombre  : valor.nombre,
            urlImg  : valor.urlImg
          });
        });
        $ionicLoading.hide();
      });

    ////////////////
    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
        var payload = notification.payload;
        console.log(notification, payload);
      },
      "onRegister": function(data) {
        console.log(data.token);
      }
    });
    ///////////////

  });
