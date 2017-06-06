angular.module('starter')
  .controller('stockCtrl', function(
    $scope,
    $state,
    $http,
    $ionicLoading,
    $timeout,
    $ionicPopup,
    $rootScope,
    ConstantsService
  ) {

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    $scope.atrasEst = function (){
      $state.go('app.categorias');
    };

    var timer = $timeout(
      function() {
        $ionicLoading.hide();
        $state.go('app.error');
      },
      20000
    );

    /**
     * Obtener los productos
     */
    $scope.getProductos = function(){
      $http.get(ConstantsService.STOCK)
        .then(function(data){
          $scope.productos = data.data;
          $timeout.cancel(timer);
          $ionicLoading.hide();
        })
    };

    /**
     *
     * @param idProducto
     * @param stockCambio
     */
    $scope.cambiarStock = function(idProducto, stockCambio) {
      $ionicLoading.show({
        template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });

      var nuevoStock;

      if(stockCambio)  nuevoStock = false;
      if(!stockCambio) nuevoStock = true;

      var params = {
        id         : idProducto,
        newStock   : nuevoStock
      };

      $http.put(ConstantsService.STOCK_CHANGE, params)
        .then(function(data) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Se cambió el estado de stock!',
              buttons: null
            });
            $timeout(function () {
              alertPopup.close();
            }, 1500);
            $ionicLoading.hide();

        $scope.getProductos();
      })
      .catch(function(){
        var alertPopupError = $ionicPopup.alert({
          title: 'Error cambiando estado de stock',
          buttons: null
        });
        $timeout(function () {
          alertPopupError.close();
        }, 1500);
      });


    };

    $scope.getProductos();

  });
