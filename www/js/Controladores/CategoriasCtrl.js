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
           dispositivoService,
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
        $state.go('app.error');
      },
      20000
    );

    /**
     * Ejecuta todas las funciones de inicializacion (resuelve todas las promesas)
     * @returns {*}
     */
    $scope.inicializar = function() {
      return $q.all([
        $scope.obtenerCategorias()
      ])
      .then(function() {
        //console.log('Llamadas api OK.');
        $timeout.cancel(timer);
      })
      .catch(function(err) {
        //console.log('error resolviendo las promesas'+ err); //todo ver como manejar el error
      });
    };


    /**
     *  Obtengo los token de los dispositivos administradores
     * esta en app.js
     * deprecated
     */
    /*var getTokenAdmins = function(){
      var tokenAdmins = [];
      dispositivoService.getAdministradores()
        .then(function(dispAdm){
          angular.forEach(dispAdm, function (valor) {
            tokenAdmins.push(valor.token) ;
          });
          $rootScope.tokenAdm = tokenAdmins;
        });
    };*/



    /**
     * Inicializo notificaciones push y manejo la recepcion de notif.
     *
     * @type {Ionic.Push}
     */
   $ionicPlatform.ready(function() {
      var push = new Ionic.Push({
        'debug': true,
        'onNotification': function (notificacion) {
          NotificacionService.postNotificacion(notificacion);
        }
      });

      push.register(function(token) {
        setDataDispositivo(token.token);
        //console.log("Mi token:", token.token);
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
     *
     * @param dataDispositivo
     */
    var intentos            = 0,
        esperaEntreIntentos = 1000,
        maxIntentos         = 3;

    var registrarDisp = function(dataDispositivo){
      if(typeof(dataDispositivo.uuid) != 'undefined' && dataDispositivo.token) {
        $scope.pedido.dispositivo.uuid  = dataDispositivo.uuid;
        $scope.pedido.dispositivo.token = dataDispositivo.token;

        var urlDispositivo = 'http://23.94.249.163/appDrinks/dispositivos/dispositivos.php';
        $http.post(urlDispositivo, dataDispositivo, {headers: {'Content-Type': 'application/json'}})
          .then(function (data) {
            intentos = 0;
            $rootScope.estadoUltPedido = data.data.data.estado_ult_pedido;
            if ($rootScope.estadoUltPedido == 1 || $rootScope.estadoUltPedido == 2)
              $scope.setDataUltPedido(data);
          })
          .catch(function () {
            //console.log('Error registrando el dispositivo, intento: ' + intentos);
            if (intentos < maxIntentos) {
              intentos++;
              $timeout(function () {
                registrarDisp(dataDispositivo);
              }, esperaEntreIntentos);
            }else{
              $state.go('app.error');
              $ionicLoading.hide();
            }
          });
      }else {
        //console.log('No se encontró uuid o token, por favor cierra la aplicación y vuelve a iniciarla');
        //alert('No se encontró uuid o token, por favor cierra la aplicación y vuelve a iniciarla');
        $ionicLoading.hide();
        $state.go('app.error'); // todo: en produccion quitar esto
      }
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
       $rootScope.fechaUltPedido  = new Date(data.data.data.fecha_pedido);
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
