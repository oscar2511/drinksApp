
angular.module('starter')
  .controller('homeCtrl', function($scope, $http, $q, $rootScope) {

    $scope.obtenerCategorias = function() {
      var url = 'http://localhost/app-drink/web/app_dev.php/api/categorias';
      return $http.get(url)
        .then(function (data) {
          angular.forEach(data.data, function (value) {
            $scope.dataCruda = value;
          });
          $scope.categorias = [];

          angular.forEach($scope.dataCruda, function (valor) {
            $scope.categorias.push({
              id: valor.id,
              nombre: valor.nombre,
              urlImg: valor.url_imagen
            });
          });
          console.log($scope.categorias);

          return $q.resolve();
        })

    };

    $scope.obtenerDispositivos = function() {

      var data = {
        token: 'Dev-1212323-9923',
        uuid : 9999
      };

      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };

      //$http.post('/ServerRequest/PostDataResponse', data, config);


    var urlDispositivo = 'http://localhost/app-drink/web/app_dev.php/api/dispositivo/uuid';
    $http.post(urlDispositivo, data, config)
      .then(function (response) {
        console.log(response.data[0]);
        console.log(response.data[0].calle);
        $scope.idDis = data.data;
      })
    };


    $scope.getAdministradores = function(){
      //var urlDispAdm = 'http://23.94.249.163/appDrinks-dev/dispositivos/getAdministradores.php';
      var urlDispAdm = $rootScope.urls.dispositivo;
      var dispAdm;
      return $http.get(urlDispAdm)
        .then(function(data){
          console.log(data);
        })
    };




    $scope.productos = function(){
      var url = 'http://localhost/app-drink/web/app_dev.php/api/producto/2';
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
    };


    $scope.abiertoCerrado = function(){
      var estadoApertura = $rootScope.urls.estadoApertura;
      $http.get(estadoApertura)
        .then(function(data){
          if(data.data[0].esta_abierto)
            $rootScope.abierto = true;
          else
            $rootScope.abierto = false;
        })
    };













  });
