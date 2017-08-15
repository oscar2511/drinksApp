/**
 * A set of global constants
 *
 * @author Oscar Rodríguez Almonacid <canrodriguez@gmail.com>
 *
 */

  "use strict";

  angular.module('starter')
    .service('ConstantsService',
    function(){

  var $ = this;

  $.API_PORT = 3000;
  $.SERVER   = 'http://localhost';
  //$.SERVER   = "http://34.211.93.96";

  $.DEVICES_ADMIN         = $.SERVER + ':'+ $.API_PORT + '/api/devices/administrators';
  $.CATEGORIES            = $.SERVER + ':'+ $.API_PORT +'/api/categories';
  $.LIST_PRODUCTS         = $.SERVER + ':'+ $.API_PORT +'/api/products/category/';
  $.LIST_ORDERS           = $.SERVER + ':'+ $.API_PORT +'/api/order';
  $.LIST_ORDERS_BY_STATE  = $.SERVER + ':'+ $.API_PORT +'/api/order/state/';
  $.PUT_ORDERS            = $.SERVER + ':'+ $.API_PORT +'/api/order';
  $.ORDER_DETAIL          = $.SERVER + ':'+ $.API_PORT +'/api/order/';
  $.ORDER_UPDATE          = $.SERVER + ':'+ $.API_PORT +'/api/order/';
  $.STOCK                 = $.SERVER + ':'+ $.API_PORT +'/api/products';
  $.STOCK_CHANGE          = $.SERVER + ':'+ $.API_PORT +'/api/product/change-stock';
  $.EDIT_PRODUCT          = $.SERVER + ':'+ $.API_PORT +'/api/products/';
  $.NEW_PRODUCT           = $.SERVER + ':'+ $.API_PORT +'/api/products/';

  /*
  urlApi.pedidoEstado         = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/pedido/estado';
  urlApi.dispositivoId        = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/dispositivo/';
  urlApi.registrarDispositivo = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/dispositivo/uuid';
  urlApi.abrirCerrar          = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/horario/abrir-cerrar';
  */

  $.URL_PRODUCTS = ' https://s3-us-west-2.amazonaws.com/cavaonline/products/';
});
