angular.module('starter')
  .service('NotificacionService',
  function($ionicPlatform){


    /**
     * Debug push
     * @type {Ionic.Push}
     */
    this.iniciarPush = function(){
      return new Ionic.Push({
        "debug": true,
        "onNotification": function(notification) {
          var payload = notification.payload;
          notificationHandle(payload);
          alert('entro en OnNot ');
          console.log(payload);
        }
      });
    };

    var notificationHandle = function(payload){
      if(payload.numero){
        alert(payload.numero);
      }
    };

    var notificationAdmin = function(){
    };

  });
