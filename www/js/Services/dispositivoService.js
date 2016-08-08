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


    /**
     *  Obtener el listado de dispositivos administradores
     *
      * @returns {*}
     */
    this.getAdministradores = function(){
      var urlDispAdm = 'http://23.94.249.163/appDrinks/dispositivos/getAdministradores.php';
      var dispAdm;
      return $http.get(urlDispAdm)
        .then(function(data){
          angular.forEach(data.data, function (value) {
             dispAdm = value;
          });
          return $q.resolve(dispAdm);
        })
    };



  });
