angular.module('starter')
  .controller('adminCtrl', function(
    $scope,
    $stateParams,
    $http,
    $ionicLoading,
    $ionicPopover
  ){



    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    var url = 'http://23.94.249.163/appDrinks/admin/listarPedidos.php';

//    var categoria = angular.fromJson($stateParams.categoria);

   // $scope.catUrlImg = categoria.urlImg;

    $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
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
