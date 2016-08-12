angular.module('starter')
  .service('NotificacionService',
  function($ionicPlatform,
           $state,
           $q,
           $http,
           $rootScope,
           $ionicLoading,
           dispositivoService,
           PedidoService
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
          console.log('token admin: '+$rootScope.tokenAdm);
          var jwt     = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4MjllZTIxOS01MzA4LTRhZDMtYWQ5NS1lZTQ3Y2YxMzhiMTMifQ.QzA7PSQHEEiSz-cEun7iUZdJRyAXd3iIRQSlsWPL0Yw';
          var tokens  = $rootScope.tokenAdm;
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
                  "title": "Drink up: nuevo pedido!",
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
        dispositivoService.getTokenDispositivo({id: idDispositivo})
          .then(function (data) {
            var token ='';
            angular.forEach(data.data, function (value) {
              return dataCruda = value;
            });
            angular.forEach(dataCruda, function (valor) {
              token = valor.token;
            });

            console.log('Token de usuario: '+token);
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
            return $http(req);
          }); return $q.resolve();
    };


    /**
     *  Envia notificacion a los dispositivos administradores
     *
     * @param mensaje
     * @param nroPedido
     * @returns {*}s
     */
    this.pushAdministrador = function(mensaje, nroPedido){
      console.log('token admin: '+$rootScope.tokenAdm);
      var jwt     = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4MjllZTIxOS01MzA4LTRhZDMtYWQ5NS1lZTQ3Y2YxMzhiMTMifQ.QzA7PSQHEEiSz-cEun7iUZdJRyAXd3iIRQSlsWPL0Yw';
      var tokens  = $rootScope.tokenAdm;//tokenAdmins;
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
            "title": "Drink up: "+mensaje.titulo,
            "message": "Drink up: "+mensaje.contenido,
            "android": {
              "title": "Drink up: "+mensaje.titulo,
              "message": "Drink up: "+mensaje.contenido,
              "payload": {"idPedido": nroPedido}
            }
          }
        }
      };
      return $http(req);
    };


    /**
     * Manejo de notificaciones recibidas
     *
     * @param notificacion
     */
    this.postNotificacion = function (notificacion){
      var payload = notificacion.payload;
      //console.log(notificacion, payload);
      switch (notificacion.title){
        case 'Drink up: nuevo pedido!':
          alert("Nuevo pedido!");
          $state.go('app.admin');
        break;
        case 'Drink up: Pedido procesado!':
          alert("Pedido procesado");
          //$state.go('app.confirmacion');
        break;
        case 'Drink up: Pedido cancelado!':
          alert('Pedido nro. '+payload.idPedido +' cancelado!');
          PedidoService.limpiarPedido();
          //$state.go('app.confirmacion');
          break;
        case 'Drink up: Pedido cerrado!':
          alert('Pedido nro. '+payload.idPedido +' cerrado!');
          PedidoService.limpiarPedido();
          //$state.go('app.confirmacion');
          break;
        default :
//          alert('Llegó un mensaje personalizado');
          break;
      }
    };

  });
