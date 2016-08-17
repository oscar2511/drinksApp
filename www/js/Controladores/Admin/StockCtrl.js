angular.module('starter')
  .controller('stockCtrl', function(
    $scope,
    $state,
    $http,
    $ionicLoading,
    $timeout,
    $ionicPopup
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

    var url = 'http://23.94.249.163/appDrinks/admin/getStock.php';

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
      var urlCambio = 'http://23.94.249.163/appDrinks/admin/cambiarEstadoStock.php';
      var nuevoStock;
      if(stockCambio == 'Stock') nuevoStock = 'Sin stock';
      if(stockCambio == 'Sin stock') nuevoStock = 'Stock';
      $http.post(urlCambio,{idProducto:idProducto, stockCambio:nuevoStock},  {headers: {'Content-Type': 'application/json'}})
        .then(function(data){
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Se cambió el estado de stock!',
            buttons: null
          });

          $timeout(function() {
            alertPopup.close();
          }, 1500);

        $scope.getProductos();
      })
      .catch(function(){
        $state.go('app.error');
      });

    };

    $scope.getProductos();

  });
