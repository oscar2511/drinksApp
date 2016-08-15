angular.module('starter')
  .controller('stockCtrl', function(
    $scope,
    $state,
    $http
  ) {

    $scope.atrasEst = function (){
      $state.go('app.categorias');
    };


    var url = 'http://23.94.249.163/appDrinks/admin/getStock.php';


    $scope.getProductos = function(){
      $http.get(url)
        .then(function(data){
          console.log(data);
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

          console.log($scope.productos);
        })
    };


    /**
     *
     * @param idProducto
     * @param stockCambio
     */
    $scope.cambiarStock = function(idProducto, stockCambio){
      var urlCambio = 'http://23.94.249.163/appDrinks/admin/cambiarEstadoStock.php';
      var nuevoStock;
      console.log(idProducto);
      if(stockCambio == 'Stock') nuevoStock = 'Sin stock';
      if(stockCambio == 'Sin stock') nuevoStock = 'Stock';
      $http.post(urlCambio,{idProducto:idProducto, stockCambio:nuevoStock},  {headers: {'Content-Type': 'application/json'}})
        .then(function(data){
        $scope.getProductos();
      });

    };


    $scope.getProductos();

  });
