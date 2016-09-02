angular.module('starter')
  .service('NotificacionService',
  function($ionicPlatform,
           $state,
           $q,
           $http,
           $rootScope,
           $ionicLoading,
           dispositivoService,
           PedidoService,
           $ionicPopup,
           $timeout
  ) {

    /**
     * Registra un pedido en la base de datos
     */
    this.registrarNuevoPedido = function(pedido){
      var url = 'http://23.94.249.163/appDrinks-dev/pedidos/pedidos.php';
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
          //console.log('token admin: '+$rootScope.tokenAdm);
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
                  "priority": "high",
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

            //console.log('Token de usuario: '+token);
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
                    "priority": "high",
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
     * Envia notificación push a usuario.
     * esta notificacion se ejecuta cuando se cambia el estado del pedido desde el admin a "cancelado o recibido".
     * Esto limpiará el pedido del dispositivo.
     */
    this.pushSilencioso = function(mensaje, idDispositivo, estado){
      dispositivoService.getTokenDispositivo({id: idDispositivo})
        .then(function (data) {
          var token ='';
          angular.forEach(data.data, function (value) {
            return dataCruda = value;
          });
          angular.forEach(dataCruda, function (valor) {
            token = valor.token;
          });

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
                  "priority": "high",
                  //"title": 'Drink up: ' + mensaje.titulo,
                  //"message": mensaje.contenido,
                  "content_available": 1,
                  "payload": {"estado": estado}
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
      //console.log('token admin: '+$rootScope.tokenAdm);
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
              "priority": "high",
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
      if(payload.estado == 3 || payload.estado == 4 )
      {
        //alert(payload.estado);
        PedidoService.limpiarPedido();
      }
      else {
        switch (notificacion.title) {
          case 'Drink up: nuevo pedido!':
            var confirmPopup = $ionicPopup.confirm({
              title: 'Nuevo pedido!',
              template: 'Ir al listado de pedidos?',
              cancelText: 'Cancelar',
              okText: 'Ok'
            });
            confirmPopup.then(function (res) {
              if (res) {
                $state.go('app.admin');
              }
            });

            break;
          case 'Drink up: Pedido procesado!':
            var alertPopup = $ionicPopup.alert({
              title: 'Tu pedido fué procesado!',
              buttons: null
            });

            $timeout(function () {
              alertPopup.close();
              $state.go('app.pedido-pendiente');
            }, 1500);
            break;
          case 'Drink up: Pedido cancelado!':
            PedidoService.limpiarPedido();
            var popupCancelado = $ionicPopup.confirm({
              title: 'Pedido cancelado!',
              template: 'El pedido n° ' + payload.idPedido + ' fué cancelado. Ir a pedidos? ',
              cancelText: 'Cancelar',
              okText: 'Ok'
            });
            popupCancelado.then(function (res) {
              if (res) {
                $state.go('app.admin');
              }
            });
            break;
          case 'Drink up: Pedido recibido!':
            var popupRecibido = $ionicPopup.confirm({
              title: 'Pedido recibido!',
              template: 'El pedido n° ' + payload.idPedido + ' fué marcado como recibido. Ir a pedidos? ',
              cancelText: 'Cancelar',
              okText: 'Ok'
            });
            popupRecibido.then(function (res) {
              if (res) {
                $state.go('app.admin');
              }
            });
            break;
          default :
//          alert('Llegó un mensaje personalizado');
            break;
        }
      }
    };

  });
