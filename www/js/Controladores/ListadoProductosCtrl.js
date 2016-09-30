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
     * Obtener los producto de una categoria del servidor
     *
     */
    var url = $rootScope.urls.listadoProductos+categoria.id;
    $http.get(url)
      .then(function (data){
        $scope.productos =[];
        angular.forEach(data.data, function(valor, key) {
          $scope.idCategoria = valor.idCategoria;

          console.log(valor.descripcion);
          $scope.productos.push({
            id:           valor.id,
            precio:       valor.precio,
            descripcion:  valor.descripcion,
            nombre:       valor.nombre,
            stock:        valor.stock,
            idCategoria:  valor.categoria.id,
            urlImg  :     valor.urlImg
          });
        });
        $ionicLoading.hide();
      });

  });
