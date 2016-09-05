angular.module('starter')
  .controller('adminCtrl', function(
    $scope,
    $stateParams,
    $http,
    $ionicLoading,
    $ionicPopover,
    $state,
    $timeout,
    $ionicActionSheet,
    $rootScope
  ){


    var timer = $timeout(
      function() {
        $ionicLoading.hide();
        $state.go('app.error');
      },
      20000
    );

    var estado = null;
    //var url = 'http://23.94.249.163/appDrinks-dev/admin/listarPedidos.php';
    //var url = '$rootScope.urls.listarPedidos';

    $scope.atrasAdmin = function (){
      $state.go('app.categorias');
    };

    $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };

    $scope.closePopover = function() {
      $scope.popover.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
      // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
      // Execute action
    });

    $scope.verDetallePedido = function(pedido){
      console.log(pedido);
      $state.go('app.pedDet',{pedido : pedido});

    };

    /**
     * Obtener los pedidos del servidor
     *
     */
    $scope.getPedidos = function(estado){

      var url ='';
      $scope.tieneFiltro = estado ? true : false;
      $scope.estadoFiltro = estado;

      if(!estado) url = $rootScope.urls.listarPedidos;
      else  url = $rootScope.urls.listarPedidos+'/'+estado;

      $ionicLoading.show({
        template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });
      $http.get(url)
        .then(function (data){
          setPedidos(data.data, estado);
          $ionicLoading.hide();
          $timeout.cancel(timer);
          $scope.$broadcast('scroll.refreshComplete');
        });
    };


    /**
     * @param data array
     * @param  estado int
     */
    var setPedidos = function(data, estado){
      if(!estado) {
        $scope.nuevos     = 0;
        $scope.enCamino   = 0;
        $scope.cancelados = 0;
        $scope.recibidos  = 0;
      }
        $scope.pedidos =[];
      angular.forEach(data, function(valor, key) {
        if(!estado) {
          if (valor.estado.id == 1) $scope.nuevos++;
          if (valor.estado.id == 2) $scope.enCamino++;
          if (valor.estado.id == 3) $scope.cancelados++;
          if (valor.estado.id == 4) $scope.recibidos++;
        }
        $scope.pedidos.push({
          id:             valor.id,
          numero:         valor.numero,
          fecha:          new Date(valor.fecha),
          total:          valor.total,
          idDispositivo:  valor.dispositivo.id,
          calle:          valor.calle,
          nro  :          valor.nro,
          telefono :      valor.telefono,
          estado :        valor.estado,
          latitud :       valor.latitud,
          longitud :      valor.longitud,
          dirReferencia : valor.dir_referencia
        });
      });
    };


    $scope.getPedidos(estado);


  });
