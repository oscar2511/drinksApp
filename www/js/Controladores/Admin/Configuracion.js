
angular.module('starter')
  .controller('configuracionCtrl', function(
    $rootScope,
    $scope,
    $ionicPopup,
    $http,
    $ionicLoading,
    $timeout
  ) {

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    var urlEstadoApertura = $rootScope.urls.estadoApertura;

    var getAbiertoCerrado = function(){
      $http.get(urlEstadoApertura)
        .then(function(data){
          console.log(data.data[0].esta_abierto);
          if(data.data[0].esta_abierto){
            $scope.abierto = true;
          }
          else{
            $scope.abierto = false;
          }
          $ionicLoading.hide();
        })


    };

    $scope.abrirCerrar = function(){
      var url = $rootScope.urls.abrirCerrar;
      $ionicLoading.show({
        template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });

      $http.post(url)
        .then(function(data){
          if(data.data.estado == 200){
            var alertPopupExito = $ionicPopup.alert({
              title: 'Exito cambiando estado!',
              buttons: null
            });

            $timeout(function() {
              alertPopupExito.close();
            }, 1500);
          }else{
            var alertPopupError = $ionicPopup.alert({
              title: 'Error cambiando estado',
              buttons: null
            });

            $timeout(function() {
              alertPopupError.close();
            }, 1500);
          }

          $ionicLoading.hide();
        })
    };

  getAbiertoCerrado()




  });
