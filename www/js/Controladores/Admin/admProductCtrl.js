
angular.module('starter')
  .controller('admProductCtrl',
    function($scope,
             $http,
             $q,
             ProductService,
             ConstantsService,
             $ionicLoading,
             $timeout,
             $state,
             $base64) {

    $scope.shouldShowCategories = true;
    $scope.showProducts = false;
    $scope.shouldShowEditProduct = false;

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    var timer = $timeout(
      function() {
        $ionicLoading.hide();
        $state.go('app.error');
      },
      10000
    );

    function getCategories () {
      return $http.get(ConstantsService.CATEGORIES, { timeout: 100000 })
        .then(function (data) {
          $timeout.cancel(timer);
          var dataCruda = [];
          angular.forEach(data.data, function (value) {
            dataCruda.push(value);
          });

          $scope.categories = [];
          angular.forEach(dataCruda, function (valor) {
            $scope.categories.push({
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
    }

    $scope.showProductFromCategory = function (category) {
      $scope.shouldShowCategories = false;
      $scope.shouldShowProducts = true;

      var url = ConstantsService.LIST_PRODUCTS + category.id;
      $http.get(url)
        .then(function (data) {
          $scope.productos = [];
          angular.forEach(data.data, function(valor, key) {
            $scope.idCategoria = valor.idCategoria;

            $scope.productos.push({
              id:           valor._id,
              precio:       valor.price,
              descripcion:  valor.description,
              nombre:       valor.name,
              stock:        valor.stock ? 1 : 0,
              idCategoria:  valor.categoryId,
              urlImg  :     $base64.encode(valor.urlImg)
            });
          });
          $ionicLoading.hide();
        });
    };


    $scope.showEditProduct = function(product) {
      $scope.productToEdit = product;
      $scope.shouldShowEditProduct = true;
      $scope.shouldShowProducts = false;
    }

    $scope.showListProducts = function() {
      $scope.shouldShowEditProduct = false;
      $scope.shouldShowProducts = true;
    }

    getCategories();

    $scope.product = {};

    $scope.save = function(product) {
      if(product.nombre != '' && product.precio != '')
        ProductService.save(product)
          .then(function(response) {
            alert('carga exitosa');
          });
      else
          alert('Verifique si el nombre y/o la descripción están en blanco')
      /*ProductService.Upload($scope.file)
        .then(function(response) {
          alert('carga exitosa');
        });*/
    }




});
