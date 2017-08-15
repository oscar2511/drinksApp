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
    $scope.showProducts = false;

    var getSubcategory = function()
    {
      switch (categoria.nombre) {
        case 'Vinos':
              //todo: obtener las bodegas por api
              $scope.cellars = ['bodega1', 'bodega2'];
              break;
        case 'Cervezas':
              //todo: obtener los paises api
              break;
      }
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
