angular.module('starter')
  .controller('listadoProductosCtrl', function(
                                              $scope,
                                              $stateParams,
                                              $http,
                                              $ionicLoading,
                                              $rootScope,
                                              ConstantsService,
                                              UtilitiesService)
  {
    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    $scope.imgCategoria = null; //todo revisar si es está al dope


    var categoria = angular.fromJson($stateParams.categoria);

    $scope.categoria = categoria;
    $scope.showBySubCategory = false;
    $scope.showAll = false;

    var getSubcategory = function() {
      switch (categoria.nombre) {
        case 'Vinos':
              //todo: obtener las bodegas por api https://s3-sa-east-1.amazonaws.com/cavaonline-app/subcategories/bianchi-logo.jpg
              $scope.cellars = [
                {'id': 1, 'name': 'Bodega Santa Helena', 'urlImg': 'https://s3-sa-east-1.amazonaws.com/cavaonline-app/subcategories/santa-helena-logo.png'},
                {'id':2,'name': 'Bodega Trapiche', 'urlImg': 'https://s3-sa-east-1.amazonaws.com/cavaonline-app/subcategories/trapiche-logo.png'},
                {'id':3,'name': 'Bodega Bianchi', 'urlImg': 'https://s3-sa-east-1.amazonaws.com/cavaonline-app/subcategories/bianchi-logo.jpg'}
              ];
              break;
        case 'Cervezas':
              //todo: obtener los paises api
              $scope.countries = [
                {'id':4, 'name': "Holanda", 'urlImg': 'https://s3-sa-east-1.amazonaws.com/cavaonline-app/subcategories/Bandera-Holanda.jpg'},
                {'id':5, 'name': "Alemania", 'urlImg': 'https://s3-sa-east-1.amazonaws.com/cavaonline-app/subcategories/alemania.png'},
                {'id':6, 'name': "Argentina", 'urlImg': 'https://s3-sa-east-1.amazonaws.com/cavaonline-app/subcategories/bandera-argentina.jpg'}
              ];
              break;
      }
    };


    $scope.showProductsBySubCategory = function(subCategory) {
      $scope.subCategory = subCategory;
      $scope.showBySubCategory = true;
      $scope.showAll = false;
    };

    $scope.backToSubcategory = function() {
      $scope.subCategory = null;
      $scope.showBySubCategory = false;
      $scope.showAll = false;
    };

    $scope.showAllProducts = function() {
      $scope.subCategory = null;
      $scope.showBySubCategory = false;
      $scope.showAll = true;
    };

    /**
     * Obtener los producto de una categoria
     *
     */
    var url = ConstantsService.LIST_PRODUCTS + categoria.id;
    $http.get(url)
      .then(function (data){
        $scope.productos = [];
        angular.forEach(data.data, function(valor, key) {
          $scope.idCategoria = valor.idCategoria;

          $scope.productos.push({
            id:           valor._id,
            precio:       valor.price,
            descripcion:  UtilitiesService.encode(valor.description),
            nombre:       valor.name,
            stock:        valor.stock ? 'Disponible' : 'Sin stock',
            idCategoria:  valor.categoriaId,
            subCategoryId: valor.subCategoryId ? valor.subCategoryId : null,
            urlImg  :     UtilitiesService.encode(valor.urlImg)
          });
        });
        $ionicLoading.hide();
      });


    getSubcategory();

    /**
     * Decode url
     * @param urlEncoded
     * @returns {*}
     */
    $scope.decode = function(urlEncoded) {
      return UtilitiesService.decode(urlEncoded)
    };


  });
