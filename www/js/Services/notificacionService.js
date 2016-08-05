angular.module('starter')
  .service('NotificacionService',
  function($ionicPlatform,
           $state,
           $q,
           $http,
           $rootScope,
           $ionicLoading,
           $state,
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
    this.enviarPushNuevoPedido = function(pedido){

      var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4MjllZTIxOS01MzA4LTRhZDMtYWQ5NS1lZTQ3Y2YxMzhiMTMifQ.QzA7PSQHEEiSz-cEun7iUZdJRyAXd3iIRQSlsWPL0Yw';
      var tokens = ['dR0mBCNclQg:APA91bGjdUHQk2Y_g89HTSF-XAr_44Rcr2UTbqaqY2MlF9D_ofGFmI4MHjs3PwA2OoDuEcm-yOfpTmOAECa1psgUUl_N1WRQOQmVXOlZWOtkY1PHGXidcruKWuFuvVCdzz5aUNGl79TL'];
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
      return $http(req);
    };



    /**
     * Envia notificación push a usuario.
     */
    this.pushUsuario = function(mensaje, idDispositivo){

      return dispositivoService.getTokenDispositivo({id: idDispositivo})
        .then(function(data){
          angular.forEach(data.data, function (value) {
            return  dataCruda = value;
          });
          angular.forEach(dataCruda, function (valor) {
            return  token = valor.token;
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
                "title": 'Drink up: '+mensaje.titulo,
                "message": mensaje.contenido,
                "android": {
                  "title": 'Drink up: '+mensaje.titulo,
                  "message": mensaje.contenido
                }
              }
            }
          };
          return $http(req);
        });
    };

    this.pushAdministrador = function(mensaje){
      var idDispositivoAdmin = 59; //todo buscar el id del tel de los admin con una funcion (traer array)
      this.pushUsuario(mensaje, idDispositivoAdmin)
    };


    /**
     * Manejo de notificaciones recibidas
     *
     * @param notificacion
     */
    this.postNotificacion = function (notificacion){
      var payload = notificacion.payload;
      console.log(notificacion, payload);
      alert(notificacion.title);
      switch (notificacion.title){
        case 'Drink up: nuevo pedido!':
          $state.go('app.admin');
        break;
        case 'Confirmación de pedido':
          $state.go('app.confirmacion');
        break;
        default :
          alert('llegó un mensaje personalizado');
      }
    };

  });
