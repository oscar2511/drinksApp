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

    var fechaHoraActual = new Date();


    //todo HACER EL CALCULO DIRECTAMENTE EN EL SERVIDOR
    /*if(horaActual < horaApertura or horaActual > horaCierre){
      $scope.Abierto = false;
      // todo podria llamar  a un template que muestre los horarios y cualquier otra informacion a definir

    }*/
    var urlAbierto = 'http://oscarnr.16mb.com/appDrinks/general/horario.php';
    $http.get(urlAbierto)
      .then(function(data){
        var array = data.data.data;
        if(array[0] != 1)
          alert("cerrado");
        console.log(array[0]);
      });


    //////////////////////////////

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
        'uuid' : 9999,//ionic.Platform.device().uuid,
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
