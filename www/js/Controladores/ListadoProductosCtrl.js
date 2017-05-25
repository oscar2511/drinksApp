angular.module('starter')
  .controller('listadoProductosCtrl', function(
                                              $scope,
                                              $stateParams,
                                              $http,
                                              $ionicLoading,
                                              $rootScope)
  {
    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });
    $scope.imgCategoria = null; //todo revisar si es está al dope


    var categoria = angular.fromJson($stateParams.categoria);
    console.log(categoria);

    $scope.catUrlImg = categoria.urlImg;

    /**
     * Obtener los producto de una categoria
     *
     */
    var url = $rootScope.urls.listadoProductos+categoria.id;
    $http.get(url)
      .then(function (data){
        $scope.productos =[];
        angular.forEach(data.data, function(valor, key) {
          $scope.idCategoria = valor.idCategoria;

          console.log(valor);
          $scope.productos.push({
            id:           valor._id,
            precio:       valor.price,
            descripcion:  valor.descripcion,
            nombre:       valor.name,
            stock:        valor.stock ? 'Disponible' : 'Sin stock',
            idCategoria:  valor.categoriaId,
            urlImg  :     valor.urlImg
          });
        });
        $ionicLoading.hide();
      });


  });
