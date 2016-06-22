angular.module('starter')
  .controller('categoriasCtrl',
  function($scope,
           $http,
           $sce,
           $ionicLoading,
           $ionicPush,
           $ionicPlatform,
           $ionicUser,
           PedidoService
  ){

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    $scope.pedido = PedidoService;

    var push = new Ionic.Push({
      "debug": true
    });

    $ionicPlatform.ready(function() {
      push.register(function(token) {
        setDataDispositivo(token.token);
        console.log("Mi token:", token.token);
        push.saveToken(token);
      });
    }).then(function(data){

    });

    var setDataDispositivo = function(token){
      var dataDispositivo =  {
        'uuid' : ionic.Platform.device().uuid,
        'token': token
      };

      var defaultHTTPHeaders = {
        'Content-Type':'aplication/json',
        'Accept':'' +
        'application/json'
      };

      $http.defaults.headers.post = defaultHTTPHeaders;

      var urlDispositivo = 'http://23.94.249.163/appDrinks/dispositivos/dispositivos.php';
      $http.post(urlDispositivo, dataDispositivo)
        .then(function (data){
          $scope.pedido.dispositivo = data.dispositivo; //todo poner dentro del pedido, el objeto Dispositivo (crear factory)
        });


    };

    //console.log($ionicPlatform.ionic.Platform.platform());
    //var url = 'http://oscarnr.16mb.com/appDrinks/categorias/getCategorias.php';
    var url = 'http://23.94.249.163/appDrinks/categorias/getCategorias.php';
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


  });
