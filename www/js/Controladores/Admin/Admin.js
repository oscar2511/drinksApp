angular.module('starter')
  .controller('adminCtrl', function(
    $scope,
    $stateParams,
    $http,
    $ionicLoading,
    $ionicPopover,
    $state,
    $timeout,
    $ionicActionSheet
  ){


    var timer = $timeout(
      function() {
        $ionicLoading.hide();
        $state.go('app.error');
      },
      20000
    );

    var estado = null;
    var url = 'http://23.94.249.163/appDrinks/admin/listarPedidos.php';

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

      if(!estado) $scope.tieneFiltro = false;

      $ionicLoading.show({
        template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });
      $http.post(url,{estado:estado}, {headers: { 'Content-Type': 'application/json'}})
        .then(function (data){
          angular.forEach(data.data, function(value) {
            $scope.dataCruda = value;
          });

          setPedidos($scope.dataCruda, estado);
          $ionicLoading.hide();
          $timeout.cancel(timer);
          $scope.$broadcast('scroll.refreshComplete');
        });
    };


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
          if (valor.estado == 1) $scope.nuevos++;
          if (valor.estado == 2) $scope.enCamino++;
          if (valor.estado == 3) $scope.cancelados++;
          if (valor.estado == 4) $scope.recibidos++;
        }
        $scope.pedidos.push({
          id:             valor.id,
          numero:         valor.numero,
          fecha:          new Date(valor.fecha),
          total:          valor.total,
          idDispositivo:  valor.id_dispositivo,
          calle:          valor.calle,
          nro  :          valor.nro,
          telefono :      valor.telefono,
          estado :        valor.estado,
          latitud :       valor.latitud,
          longitud :      valor.longitud,
          dirReferencia : valor.dir_ref
        });
      });
    };

    /**
     *
     */
    $scope.mostrarFiltro = function() {
      // Show the action sheet
      $scope.closePopover();
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Nuevo' },
          { text: 'En camino' },
          { text: 'Cerrado' },
          { text: 'Cancelado' }
        ],
        //destructiveText: 'Delete',
        titleText: '<h3>Filtrar por:</h3>',
        cancelText: '<i class="ion-close assertive"></i>',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {

          var estado;

          switch (index){
            case 0:
              console.log(index);
              estado = 1;
              break;
            case 1:
              console.log(index);
              estado = 2;
              break;
            case 2:
              console.log(index);
              estado = 3;
              break;
            case 3:
              console.log(index);
              estado = 4;
              break;
          }

          $scope.tieneFiltro = true;
          $scope.getPedidos(estado);
         /* var url = 'http://23.94.249.163/appDrinks/admin/ordenarPedidos.php';
          $http.post(url,{estado:estado}, {headers: { 'Content-Type': 'application/json'}})
            .then(function (data){
                    console.log(data);
            });
*/
          return true;
        }
      });

      // For example's sake, hide the sheet after two seconds
      $timeout(function() {
//        hideSheet();
      }, 2000);

    };


    $scope.getPedidos(estado);


  });
