angular.module('starter')
  .service('mapaService',
    function($q, $rootScope, $cordovaGeolocation) {


  this.verMapa = function(lat, long) {
    var styles = [
      {
        stylers: [
          {hue: "#00ffe6"},
          {saturation: -20}
        ]
      }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {lightness: 100},
          {visibility: "simplified"}
        ]
      }, {
        featureType: "road",
        elementType: "labels",
        stylers: [
          {visibility: "on"}
        ]
      }
    ];


    var options = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(options)
      .then(function (position) {
        var latitud  = lat ? lat : position.coords.latitude;
        var longitud = long ? long :position.coords.longitude;
        var latLng = new google.maps.LatLng(latitud, longitud);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: styles,
          marker: marker
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: "Dirección de entrega"
        });
      });
  }





  });
