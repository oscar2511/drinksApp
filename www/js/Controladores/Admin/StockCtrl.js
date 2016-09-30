angular.module('starter')
  .controller('stockCtrl', function(
    $scope,
    $state,
    $http,
    $ionicLoading,
    $timeout,
    $ionicPopup,
    $rootScope
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

    var url = $rootScope.urls.stock;

    /**
     * Obtener los productos
     */
    $scope.getProductos = function(){
      $http.get(url)
        .then(function(data){
          angular.forEach(data.data, function (value) {
            $scope.dataCruda = value;
          });
          $scope.productos = [];
          angular.forEach($scope.dataCruda, function (valor) {
            $scope.productos.push({
              id:          valor.id,
              idCategoria: valor.id_categoria,
              nombre:      valor.nombre,
              precio:      valor.precio,
              stock:       valor.stock,
              urlImg:      valor.url_img,
              estado:      valor.estado
            });
          });
          $timeout.cancel(timer);
          $ionicLoading.hide();
        })
    };

    /**
     *
     * @param idProducto
     * @param stockCambio
     */
    $scope.cambiarStock = function(idProducto, stockCambio){
      $ionicLoading.show({
        template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });

      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };
      var urlCambio = $rootScope.urls.cambiarStock;
      var nuevoStock;
      if(stockCambio == 'Stock') nuevoStock = 'Sin stock';
      if(stockCambio == 'Sin stock') nuevoStock = 'Stock';

      var params = {
        idProducto : idProducto,
        stockCambio: nuevoStock
      };
      $http.post(urlCambio, params, config)
        .then(function(data){
          if(data.data.estado == 200) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Se cambió el estado de stock!',
              buttons: null
            });

            $timeout(function () {
              alertPopup.close();
            }, 1500);
          }else{
            $ionicLoading.hide();
            var alertPopupError = $ionicPopup.alert({
              title: 'Error cambiando estado de stock',
              buttons: null
            });
            $timeout(function () {
              alertPopupError.close();
            }, 1500);
          }

        $scope.getProductos();
      })
      .catch(function(){
        alert('error');//$state.go('app.error');
      });

    };

    $scope.getProductos();

  });
