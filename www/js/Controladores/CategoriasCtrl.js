angular.module('starter')
  .controller('categoriasCtrl',
  function($scope,
           $http,
           $sce,
           $ionicLoading,
           $ionicPush,
           $ionicPlatform,
           $ionicUser,
           PedidoService,
           $rootScope
  ){

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
     });

    $scope.pedido = PedidoService;

    /**
     * Chequeo si esta abierto (horario)
     * @type {string}
     */
    var urlAbierto = 'http://23.94.249.163/appDrinks/general/horario.php';
    $http.get(urlAbierto)
      .then(function(data){
        var array = data.data.data;
        if(array.length < 1)
          $rootScope.abierto = true;
      });


    /**
     * Debug push
     * @type {Ionic.Push}
     */
    var push = new Ionic.Push({
      "debug": true
    });

    /**
     * Obtener token
     */
    $ionicPlatform.ready(function() {
      push.register(function(token) {
        setDataDispositivo(token.token);
        console.log("Mi token:", token.token);
        push.saveToken(token);
      });
    }).then(function(data){

    });

    /**
     * Setear datos del dispositivo
     * @param token
     */
    var setDataDispositivo = function(token){
      var dataDispositivo =  {
        'token' : token,
        'uuid'  : ionic.Platform.device().uuid
      };
      registrarDisp(dataDispositivo)
    };

    /**
     * Llamada api que registra el dispositivo en la bd
     * @param dataDispositivo
     */
    var registrarDisp = function(dataDispositivo){
      $scope.pedido.dispositivo.uuid = dataDispositivo.uuid;
      $scope.pedido.dispositivo.token = dataDispositivo.token;
      console.log($scope.pedido);
      var urlDispositivo = 'http://23.94.249.163/appDrinks/dispositivos/dispositivos.php';
      $http.post(urlDispositivo, dataDispositivo, {headers: { 'Content-Type': 'application/json'}})
        .then(function (data){

        });
    };


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
