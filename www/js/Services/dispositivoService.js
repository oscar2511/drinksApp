angular.module('starter')
  .service('dispositivoService',
  function($ionicPlatform,
           $state,
           $q,
           $http,
           $rootScope,
           $ionicLoading) {


    /**
     *
     * @param {Number} id
     * @returns {*}
     */
    this.getTokenDispositivo = function(id){
      var url = $rootScope.urls.dispositivoId+id;
      return $http.get(url)
        .then(function (data){
          if(!data) return $q.reject();
          return $q.resolve(data);
        }).catch(function(){
          //console.log('eror obteniendo el token');
        });
    };


    /**
     *  Obtener el listado de dispositivos administradores
     *
      * @returns {*}
     */
    this.getAdministradores = function(){
      var urlDispAdm = $rootScope.urls.devicesAdmin;
      var dispAdm = [];
      return $http.get(urlDispAdm)
        .then(function(data){
          angular.forEach(data.data, function (value) {
             dispAdm.push(value);
          });
          console.log(dispAdm);
          return $q.resolve(dispAdm);
        })
        .catch(function(e) {
            console.log(e);
        })
    };



  });
