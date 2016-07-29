angular.module('starter')
  .service('dispositivoService',
  function($ionicPlatform,
           $state,
           $q,
           $http,
           $rootScope,
           $ionicLoading,
           $state) {


    /**
     *
     * @param integer $idDispositivo
     * @returns {*}
     */
    this.getTokenDispositivo = function(id){
      var url = 'http://23.94.249.163/appDrinks/dispositivos/getToken.php';
      return $http.post(url, id, {headers: { 'Content-Type': 'application/json'}})
        .then(function (data){
          if(!data) return $q.reject();
         // console.log(data);
          return $q.resolve(data);
        }).catch(function(){
          console.log('eror obteniendo el token');
        });
    };




  });
