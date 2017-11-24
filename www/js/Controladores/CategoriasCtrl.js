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
           $timeout,
           ConstantsService
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
     * Ejecuta todas las funciones de inicializacion
     * @returns {*}
     */
    $scope.inicializar = function() {
      return $q.all([
        $scope.obtenerCategorias()
      ])
      .then(function() {
        $timeout.cancel(timer);
      })
      .catch(function(err) {
        //console.log('error resolviendo las promesas'+ err); //todo ver como manejar el error
      });
    };


    /**
     * Setear datos del dispositivo
     * @param token
     */
   /* var setDataDispositivo = function(token){
      var dataDispositivo =  {
        'token' : token,
        'uuid'  : 9999//ionic.Platform.device().uuid
      };
      registrarDisp(dataDispositivo)
    };*/

    /**
     * Llamada api que registra el dispositivo en la bd y obtiene el ultimo pedido realizado
     *
     * @param dataDispositivo
     */
    /*var registrarDisp = function(dataDispositivo){
      if(typeof(dataDispositivo.uuid) != 'undefined' && dataDispositivo.token) {
        var config = {
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        };
        $scope.pedido.dispositivo.uuid  = dataDispositivo.uuid;
        $scope.pedido.dispositivo.token = dataDispositivo.token;

        var urlDispositivo = $rootScope.urls.registrarDispositivo;
        $http.post(urlDispositivo, dataDispositivo, config)
          .then(function (data) {
            if(typeof (data) != 'undefined' && data.data.length > 0)
              $rootScope.estadoUltPedido = data.data[0].estado.id;
            if ($rootScope.estadoUltPedido == 1 || $rootScope.estadoUltPedido == 2)
              $scope.setDataUltPedido(data);
          })
          .catch(function(){
            alert("Error obteniendo el ultimo pedido del dispositivo y/o registrandolo");
          });
      }else {
        console.log('No se encontró uuid o token, por favor cierra la aplicación y vuelve a iniciarla');
        $ionicLoading.hide();
        $state.go('app.error');
      }
    };*/


    /**
     * Obtener las categorias del servidor
     * @returns {*}
     */
    $scope.obtenerCategorias = function() {
      return $http.get(ConstantsService.CATEGORIES, { timeout: 100000 })
        .then(function (data) {
          var dataCruda = [];
          angular.forEach(data.data, function (value) {
            dataCruda.push(value);
          });

          $scope.categorias = [];
          angular.forEach(dataCruda, function (valor) {
            $scope.categorias.push({
              id    : valor._id,
              nombre: valor.name,
              urlImg: valor.urlImg
            });
          });
          $ionicLoading.hide();
          return $q.resolve();
        })
        .catch(function(err){
          $ionicLoading.hide();
         $state.go('app.error');
        });
      };

    $scope.inicializar();


  });
