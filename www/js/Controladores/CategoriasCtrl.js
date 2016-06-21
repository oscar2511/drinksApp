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
      $scope.pedido.uuid = ionic.Platform.device().uuid;
    });

    push.register(function(token) {
      console.log("Mi token:", token.token);
      $scope.pedido.token = token.token;
      push.saveToken(token);
    });

    var dataDispositivo = {
      'uuid' : $scope.pedido.uuid,
      'token': $scope.pedido.token
    };

    // enviar uuid de dispositivo al servidor para ver si ya existe el dispositivo
    /**
     *
     * @type {string}
     */
    var url = 'http://23.94.249.163/appDrinks/dispositivos/dispositivos.php';
    $http.post(url,dataDispositivo , {headers: { 'Content-Type': 'application/json'}})
      .then(function (data){
        $scope.pedido.dispositivo = data.dispositivo; //todo poner dentro del pedido, el objeto Dispositivo (crear factory)
      });

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

    ////////////////
    $scope.enviarPush = function(){
      // Define relevant info
      var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MjllZTIxOS01MzA4LTRhZDMtYWQ5NS1lZTQ3Y2YxMzhiMTMifQ.uNr-tPQzL63TOKShweE2Tychft3fPHF5H5Pc_8xmVeM';
      var tokens = ['DEV-a62db0db-fd8c-45c1-bf06-4f823c5b4241'];
      var profile = 'api-ionic-drinksApp';

// Build the request object
      var req = {
        method: 'POST',
        url: 'https://api.ionic.io/push/notifications',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        },
        data: {
          "tokens": tokens,
          "profile": profile,
          "notification": {
            "title": "Hi",
            "message": "Hello world!",
            "android": {
              "title": "Hey",
              "message": "Hello Android!"
            },
            "ios": {
              "title": "Howdy",
              "message": "Hello iOS!"
            }
          }
        }
      };

// Make the API call
      $http(req).success(function(resp){
        // Handle success
        console.log("Ionic Push: Push success", resp);
      }).error(function(error){
        // Handle error
        console.log("Ionic Push: Push error", error);
      });
    };
    ///////////////

  });
