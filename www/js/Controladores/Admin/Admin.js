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
    $rootScope,
    ConstantsService
  ){


    var timer = $timeout(
      function() {
        $ionicLoading.hide();
        $state.go('app.error');
      },
      10000
    );

    var estado = null;

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
      $state.go('app.pedDet',{pedido : pedido});

    };

    /**
     * Obtener los pedidos del servidor
     *
     */
    $scope.getPedidos = function(estado) {
      var url = '';
      $scope.tieneFiltro = estado ? true : false;
      $scope.estadoFiltro = estado;

      if(!estado) url = ConstantsService.LIST_ORDERS;
      else  url = ConstantsService.LIST_ORDERS_BY_STATE + estado;

      $ionicLoading.show({
        template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });
      $http.get(url)
        .then(function (data) {
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
          if (valor.state == 1) $scope.nuevos++;
          if (valor.state == 2) $scope.enCamino++;
          if (valor.state == 3) $scope.recibidos++;
          if (valor.state == 4) $scope.cancelados++;
        }
        /*$scope.pedidos.push({
          id:             valor._id,
          numero:         valor.number,
          fecha:          new Date(valor.created),
          total:          valor.total,
          idDispositivo:  valor.dispositivo.id,
          calle:          valor.calle,
          nro  :          valor.nro,
          telefono :      valor.telefono,
          estado :        valor.estado,
          latitud :       valor.latitud,
          longitud :      valor.longitud,
          dirReferencia : valor.dir_referencia
        });*/
        $scope.pedidos.push({
          id:             valor._id,
          numero:         valor.number,
          fecha:          new Date(valor.created),
          total:          valor.total,
          device:         valor.device,
          address:        valor.address,
          state :         valor.state,
        });
      });
    };


    $scope.getPedidos(estado);


  });
