/**
 * Utilities functions
 *
 * @author Oscar Rodríguez Almonacid <canrodriguez@gmail.com>
 *
 */

  "use strict";

  angular.module('starter')
    .service('UtilitiesService',
    function($base64) {

  this.encode = function(value) {
    return $base64.encode(value);
  };

  this.decode = function(value) {
    return $base64.decode(value);
  }

});
