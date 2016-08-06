angular.module('starter')
  .service('NotificacionService',
  function($ionicPlatform,
           $state,
           $q,
           $http,
           $rootScope,
           $ionicLoading,
           dispositivoService
  ) {

    /**
     * Registra un pedido en la base de datos
     */
    this.registrarNuevoPedido = function(pedido){
      var url = 'http://23.94.249.163/appDrinks/pedidos/pedidos.php';
      return $http.post(url, pedido, {headers: { 'Content-Type': 'application/json'}})
        .then(function (data){
          if(!data) return $q.reject();
          $rootScope.idUltPedido = data.data.data.id_pedido;
          return $q.resolve();
        }).catch(function(){
          alert('error');
          $ionicLoading.hide();
          $state.go('app.error');
        });
    };


    /**
     * Envia notificación push cuando se realiza un pedido.
     */
    this.enviarPushNuevoPedido = function(pedido, dispAdm){
      var tokenAdmins = [];
          angular.forEach(dispAdm, function (valor) {
             tokenAdmins.push(valor.token) ;
          });
          console.log(tokenAdmins);
          var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4MjllZTIxOS01MzA4LTRhZDMtYWQ5NS1lZTQ3Y2YxMzhiMTMifQ.QzA7PSQHEEiSz-cEun7iUZdJRyAXd3iIRQSlsWPL0Yw';
          //var tokens = ['dlGvLxSg0Mc:APA91bGs3RIp6_wlkX7sW8AG1DmWTLKvFWlmsGal-Dor4tZuXAV9Ey43LSu3nPge5SqGHlpNak4UrbW1vTPamDa9mtRGmTstY54so5dTwySdOEMnpVkgyP782da_wEsNBvb7KJ1hSHbD'];
          //var tokens = ['dlGvLxSg0Mc:APA91bGs3RIp6_wlkX7sW8AG1DmWTLKvFWlmsGal-Dor4tZuXAV9Ey43LSu3nPge5SqGHlpNak4UrbW1vTPamDa9mtRGmTstY54so5dTwySdOEMnpVkgyP782da_wEsNBvb7KJ1hSHbD','dxJgVmX0NUI:APA91bF8XLWKDQMYs50aHB4ox7V7yuXE9HQnNpbuoTRs7NVlJ8ENGg_Kb_fSiFSGCKY7RL8T1auW9drFjVncRsMwzyGE0xaDtOqO6icufzVLwWMxxYS67c9XPWZIEah6bEzsY7kDSUYZ'];
          var tokens = tokenAdmins;
          var profile = 'testdevelopment';
          var req = {
            method: 'POST',
            url: 'https://api.ionic.io/push/notifications',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + jwt
            },
            data: {
              "tokens": tokens,
              "profile": profile,
              "notification": {
                "title": "Drink up: nuevo pedido!",
                "message": "Direccion: "+pedido.ubicacion.direccion.calle+"\n"+pedido.ubicacion.direccion.numero,
                "android": {
                  "title": "Nuevo pedido",
                  "message": "Direccion: "+pedido.ubicacion.direccion.calle+"\n"+pedido.ubicacion.direccion.numero,
                  "payload": pedido
                }
              }
            }
          };
      console.log(req);
          return $http(req);

    };



    /**
     * Envia notificación push a usuario.
     */
    this.pushUsuario = function(mensaje, idDispositivo, token){

      if(token){
        var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4MjllZTIxOS01MzA4LTRhZDMtYWQ5NS1lZTQ3Y2YxMzhiMTMifQ.QzA7PSQHEEiSz-cEun7iUZdJRyAXd3iIRQSlsWPL0Yw';
        var tokens = [token];
        var profile = 'testdevelopment';
        var req = {
          method: 'POST',
          url: 'https://api.ionic.io/push/notifications',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
          },
          data: {
            "tokens": tokens,
            "profile": profile,
            "notification": {
              "title": 'Drink up: ' + mensaje.titulo,
              "message": mensaje.contenido,
              "android": {
                "title": 'Drink up: ' + mensaje.titulo,
                "message": mensaje.contenido
              }
            }
          }
        };
      }
      else {
        dispositivoService.getTokenDispositivo({id: idDispositivo})
          .then(function (data) {
            angular.forEach(data.data, function (value) {
              return dataCruda = value;
            });
            angular.forEach(dataCruda, function (valor) {
              return token = valor.token;
            });

            console.log(token);
            var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4MjllZTIxOS01MzA4LTRhZDMtYWQ5NS1lZTQ3Y2YxMzhiMTMifQ.QzA7PSQHEEiSz-cEun7iUZdJRyAXd3iIRQSlsWPL0Yw';
            var tokens = [token];
            var profile = 'testdevelopment';
            var req = {
              method: 'POST',
              url: 'https://api.ionic.io/push/notifications',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
              },
              data: {
                "tokens": tokens,
                "profile": profile,
                "notification": {
                  "title": 'Drink up: ' + mensaje.titulo,
                  "message": mensaje.contenido,
                  "android": {
                    "title": 'Drink up: ' + mensaje.titulo,
                    "message": mensaje.contenido
                  }
                }
              }
            };

          });
      }
      return $http(req);
    };


    /**
     *  Envia notificacion a los dispositivos administradores
     *
     * @param mensaje
     * @returns {*}
     */
    this.pushAdministrador = function(mensaje){
      var dispAdm = dispositivoService.getAdministradores();

      var tokenAdmins = '';
      angular.forEach(dispAdm, function (valor) {
        return tokenAdmins = valor.token+','+valor.token;
      });

     this.pushUsuario(mensaje, null, token)
    };


    /**
     * Manejo de notificaciones recibidas
     *
     * @param notificacion
     */
    this.postNotificacion = function (notificacion){
      var payload = notificacion.payload;
      console.log(notificacion, payload);
      alert(payload.title);
      switch (payload.title){
        case 'Drink up: nuevo pedido!':
          $state.go('app.admin');
        break;
        case 'Confirmación de pedido':
          $state.go('app.confirmacion');
        break;
        default :
          alert('llegó un mensaje personalizado');
          break;
      }
    };

  });
