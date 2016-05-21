angular.module('starter')
  .service('pedidoService', pedidoService);

function pedidoService() {
  var _identity = null;

  return {
    producto: 123,
    cantidad: 456
  };

  /*function getUser() {
    return _identity;
  }

  function setUser(user) {
    _identity = user;
  }

  function login() {
    //your login logic here
  }

  function logout() {
    _identity = null;
    //other logout logic
  }*/

}
