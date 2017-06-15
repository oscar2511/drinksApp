
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
             $base64,
             $ionicModal) {

    $scope.shouldShowCategories  = true;
    $scope.showProducts          = false;
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
            angular.forEach($scope.categories, function (category) {
              if(valor.categoryId == category.id) {
                valor.categoriaNombre = category.nombre;
              }
            });
            $scope.idCategoria = valor.idCategoria;

            $scope.productos.push({
              id:              valor._id,
              precio:          valor.price,
              descripcion:     valor.description,
              nombre:          valor.name,
              stock:           valor.stock ? 1 : 0,
              idCategoria:     valor.categoryId,
              categoriaNombre: valor.categoriaNombre,
              urlImg  :        $base64.encode(valor.urlImg)
            });
          });
          $ionicLoading.hide();
        });
    };


    $scope.showEditProduct = function(product) {
      $scope.productToEdit = product;

      if(angular.isUndefined(product)) {
        $scope.productToEdit = {};
        $scope.newProduct = true;
      } else $scope.newProduct = false;

      $scope.shouldShowEditProduct = true;
      $scope.shouldShowProducts = false;
    };

    $scope.showListProducts = function() {
      $scope.shouldShowEditProduct = false;
      $scope.shouldShowProducts = true;
    };

    $scope.decodeUrl = function(urlEncoded) {
      return $base64.decode(urlEncoded)
    };

    $scope.toAdmin = function () {
      clearProductToEdit();
      $state.go('app.admin');
    };

    $scope.toCategories = function () {
      clearProductToEdit();
      $scope.shouldShowEditProduct = false;
      $scope.shouldShowProducts    = false;
      $scope.shouldShowCategories  = true;
    };

      //modal estado
      $scope.crearModalCategory = function() {
        $ionicModal.fromTemplateUrl('modal-category.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $scope.modal = modal;
        });
        $scope.openModalCategory = function () {
          $scope.modal.show();
        };
        $scope.closeModal = function () {
          $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
          $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
          // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
          // Execute action
        });
      };

      $scope.crearModalCategory();


      $scope.SelectCategory = function(category) {
        $scope.productToEdit.idCategoria = category.id;
        $scope.productToEdit.categoriaNombre  = category.nombre;
      };

      getCategories();

    $scope.product = {};

    $scope.save = function(product) {

      $ionicLoading.show({
        template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });

      if(product.nombre != '' && product.precio != '') {
        ProductService.save(product, $scope.newProduct)
          .then(function (response) {
            console.log(response);
            $ionicLoading.hide();
            clearProductToEdit();
            alert('Producto editado!');
            $scope.toCategories();
          })
          .catch(function (err) {
            $ionicLoading.hide();
            alert('Error editando el producto');
          });

      }
      else {
        $ionicLoading.hide();
        alert('Verifique si el nombre y/o la descripción están en blanco');
      }
    };

    function clearProductToEdit() {
      $scope.productToEdit = {};
    }

    $scope.cambiarStock = function(currentStock) {
      if(currentStock)  $scope.productToEdit.stock = false;
      if(!currentStock) $scope.productToEdit.stock = true;
    };




});
