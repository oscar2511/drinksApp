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
           $rootScope,
           $q,
           $state
  ){

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
     });

    $scope.pedido = PedidoService;

    //$state.go('app.error');

    /**
     * Chequeo si esta abierto (horario)
     * @type {string}
     */
    $scope.obtenerHorario = function(){
      var urlAbierto = 'http://23.94.249.163/appDrinks/general/horario.php';
      return $http.get(urlAbierto)
        .then(function(data){
          var array = data.data.data;
          if(array.length < 1)
            $rootScope.abierto = true;
          return $q.resolve();
        })
    };


    /**
     * Ejecuta todas las funcines de inicializacion (resuelve todas las promesas)
     * @returns {*}
     */
    $scope.inicializar = function() {
      return $q.all([
        $scope.obtenerHorario(),
        $scope.obtenerCategorias()
      ])
      .then(function() {
        console.log('Llamadas api OK.');
      })
      .catch(function(err) {
        console.log('error resolviendo las promesas'+ err); //todo ver como manejar el error
      });
    };


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

      var urlDispositivo = 'http://23.94.249.163/appDrinks/dispositivos/dispositivos.php';
      $http.post(urlDispositivo, dataDispositivo, {headers: { 'Content-Type': 'application/json'}})
        .then(function (data){
          $rootScope.estadoUltPedido = data.data.data.estado_ult_pedido;
          console.log($rootScope.estadoUltPedido);
          if($rootScope.estadoUltPedido == 1)
            $scope.setDataUltPedido(data);
        })
        .catch(function(){
          alert("error registrando el dispositivo");
        });
    };

    /**
     * Setea los datos del ultimo pedido
     * @param data
     */
    $scope.setDataUltPedido = function(data){
       console.log(data.data.data.id_pedido);
       $rootScope.totalProductos = 'pendiente';
       console.log($rootScope.totalProductos);
       $rootScope.pedidoPendiente = true;
      $scope.pedido.setTotalProductos();
       $rootScope.idUltPedido     = data.data.data.id_pedido;
       $rootScope.totalUltPedido  = data.data.data.total;
       $rootScope.fechaUltPedido  = data.data.data.fecha_pedido;
    };


    /**
     * Obtener las categorias del servidor
     * @returns {*}
     */
    $scope.obtenerCategorias = function() {
      var url = 'http://23.94.249.163/appDrinks/categorias/getCategorias.php';
      return $http.get(url)
        .then(function (data) {
          angular.forEach(data.data, function (value) {
            $scope.dataCruda = value;
          });
          $scope.categorias = [];

          angular.forEach($scope.dataCruda, function (valor) {
            $scope.categorias.push({
              id: valor.id,
              nombre: valor.nombre,
              urlImg: valor.urlImg
            });
          });
          $ionicLoading.hide();
          return $q.resolve();
        });
      };

    $scope.inicializar();

  });
