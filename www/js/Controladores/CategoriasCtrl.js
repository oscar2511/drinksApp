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
           $state,
           NotificacionService,
           $timeout
  ){


    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
     });

    $scope.pedido = PedidoService;

    var timer = $timeout(
      function() {
        $ionicLoading.hide();
        //$state.go('app.error');
      },
      10000
    );

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
            $rootScope.abierto = true; //cambiar a false
          return $q.resolve();
        })
    };


    /**
     * Ejecuta todas las funciones de inicializacion (resuelve todas las promesas)
     * @returns {*}
     */
    $scope.inicializar = function() {
      return $q.all([
        $scope.obtenerHorario(),
        $scope.obtenerCategorias()
      ])
      .then(function() {
        console.log('Llamadas api OK.');
        $scope.$broadcast('scroll.refreshComplete');
        $timeout.cancel(timer);
      })
      .catch(function(err) {
        console.log('error resolviendo las promesas'+ err); //todo ver como manejar el error
      });
    };

    /**
     * Inicializo notificaciones push
     * @type {Ionic.Push}
     */
    //var notificacion = NotificacionService.iniciarPush();
   $ionicPlatform.ready(function() {
      var push = new Ionic.Push({
        'debug': true,
        'onNotification': function (notification) {
          console.log(notification);
          NotificacionService.postNotificacion(notificacion);
        }
      });

      push.register(function(token) {
        setDataDispositivo(token.token);
        console.log("Mi token:", token.token);
        push.saveToken(token);
      })
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
     * Llamada api que registra el dispositivo en la bd y obtiene el ultimo pedido realizado
     * @param dataDispositivo
     */
    var registrarDisp = function(dataDispositivo){
      $scope.pedido.dispositivo.uuid  = dataDispositivo.uuid;
      $scope.pedido.dispositivo.token = dataDispositivo.token;

      var urlDispositivo = 'http://23.94.249.163/appDrinks/dispositivos/dispositivos.php';
      $http.post(urlDispositivo, dataDispositivo, {headers: { 'Content-Type': 'application/json'}})
        .then(function (data){
          $rootScope.estadoUltPedido = data.data.data.estado_ult_pedido;
          if($rootScope.estadoUltPedido == 1)
            $scope.setDataUltPedido(data);
        })
        .catch(function(){
          console.log('error registrando el dispositivo');
        });
    };

    /**
     * Setea los datos del ultimo pedido
     * @param data
     */
    $scope.setDataUltPedido = function(data){
       $rootScope.totalProductos = 'pendiente';
       $rootScope.pedidoPendiente = true;
       $scope.pedido.setTotalProductos();
       $rootScope.idUltPedido     = data.data.data.id_pedido;
       $rootScope.totalUltPedido  = data.data.data.total;
       $rootScope.fechaUltPedido  = data.data.data.fecha_pedido;//new Date(data.data.data.fecha_pedido);
    };


    /**
     * Obtener las categorias del servidor
     * @returns {*}
     */
    $scope.config = {};
    $scope.obtenerCategorias = function() {
      var url = 'http://23.94.249.163/appDrinks/categorias/getCategorias.php';
      return $http.get(url, { timeout: 100000 })
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
        })
        .catch(function(err){
         // $state.go('app.error'); //todo siempre entra al catch
        });
      };

    $scope.inicializar();

  });
