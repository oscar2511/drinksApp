angular.module('starter')
  .service('mapaService',
    function($q, $rootScope) {


    this.mostrarMapa = function(){
    return new Promise(function(resolve, reject){
      var styles = [
        {
          stylers: [
            { hue: "#00ffe6" },
            { saturation: -20 }
          ]
        },{
          featureType: "road",
          elementType: "geometry",
          stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
          ]
        },{
          featureType: "road",
          elementType: "labels",
          stylers: [
            { visibility: "on" }
          ]
        }
      ];

      var options = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options)
        .then(function(position){
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          var latitud = position.coords.latitude;
          var longitud = position.coords.longitude;

          var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: styles,
            marker: marker
          };

          $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

          var marker = new google.maps.Marker({
            position: latLng,
            map     : $scope.map,
            title   : "Dirección de entrega"
          });

          //detectar calle
          var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitud+','+longitud+'&key=AIzaSyDDM7IL8Ep6r1jUoMXZUo0fDGNuigfX-GU';

          $http.get(url)
            .then(function(data){
              $scope.direccion={
                calle:"",
                numero: null
              };

              $scope.direccion.calle  = data.data.results[0].address_components[1].short_name;
              $scope.direccion.numero = data.data.results[0].address_components[0].short_name;

              $scope.pedido.ubicacion.direccion = $scope.direccion;
              $scope.pedido.ubicacion.coordenadas = {
                'lat' : latitud,
                'long': longitud
              }
            });

          $scope.mapaCargado = true;

        }, function(error){
          console.log("Could not get location");
        });
      return resolve();

    });


    };



  });
