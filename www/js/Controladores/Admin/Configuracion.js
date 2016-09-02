
angular.module('starter')
  .controller('configuracionCtrl', function($rootScope, $scope, $http, $ionicLoading) {

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    var url = 'http://23.94.249.163/appDrinks-dev/general/abrir-cerrar.php';

    var getAbiertoCerrado = function(){
      $http.get(url)
        .then(function(data){
          console.log(data.data.data[0]);
          if(data.data.data[0] == 1){
            $scope.abierto = true;
          }
          else{
            $scope.abierto = false;
          }
          $ionicLoading.hide();
        })


    };

    $scope.abrirCerrar = function(){
      $ionicLoading.show({
        template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });

      if($scope.abierto == true)  estado  = 0;
      if($scope.abierto == false) estado = 1;
      $http.post(url, {estado:estado}, {headers: {'Content-Type': 'application/json'}})
        .then(function(data){
          $ionicLoading.hide();
        })
    };

  getAbiertoCerrado()




  });
