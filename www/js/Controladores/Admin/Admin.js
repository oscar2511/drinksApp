angular.module('starter')
  .controller('adminCtrl', function(
    $scope,
    $stateParams,
    $http,
    $ionicLoading,
    $ionicPopover,
    $state
  ){



    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    var url = 'http://23.94.249.163/appDrinks/admin/listarPedidos.php';

   /* $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });
*/

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





    /**
     * Obtener los pedidos del servidor
     *
     */
    $scope.getPedidos = function(){
      $http.post(url, {headers: { 'Content-Type': 'application/json'}})
        .then(function (data){
          angular.forEach(data.data, function(value) {
            $scope.dataCruda = value;
          });
          $scope.pedidos =[];
          angular.forEach($scope.dataCruda, function(valor, key) {
            $scope.pedidos.push({
              id:            valor.id,
              numero:        valor.numero,
              fecha:         new Date(valor.fecha),
              total:         valor.total,
              idDispositivo: valor.id_dispositivo,
              calle:         valor.calle,
              nro  :         valor.nro,
              telefono  :    valor.telefono,
              estado    :    valor.estado
            });
          });
          $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.getPedidos();



  });
