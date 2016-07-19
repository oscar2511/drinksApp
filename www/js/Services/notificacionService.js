angular.module('starter')
  .service('NotificacionService',
  function($ionicPlatform, $state, $q) {

    /**
     * Debug push
     * @type {Ionic.Push}
     */
    this.iniciarPush = function () {
      var deferred = $q.defer();

    $ionicPlatform.ready(function() {
        var push = new Ionic.Push({
          'debug': true,
          'onNotification': function (notification) {
            var payload = notification.payload;
            console.log(notification, payload);
            $state.go('app.admin');
            alert('entro push admin');
          }
        });

        push.register(function(token) {
          var tokenDisp = token.token;
          console.log("Mi token:", tokenDisp.token);
          push.saveToken(token);
          deferred.resolve(tokenDisp) ;
        });
      return deferred.promise;
      });

    };






    });
