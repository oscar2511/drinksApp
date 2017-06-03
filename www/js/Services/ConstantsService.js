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
  //chrome$.SERVER   = 'http://localhost';
  $.SERVER   = "http://ec2-34-209-45-170.us-west-2.compute.amazonaws.com";
  $.URL_API   = {};

  $.DEVICES_ADMIN         = $.SERVER + ':'+ $.API_PORT + '/api/devices/administrators';
  $.CATEGORIES            = $.SERVER + ':'+ $.API_PORT +'/api/categories';
  $.LIST_PRODUCTS         = $.SERVER + ':'+ $.API_PORT +'/api/products/category/';
  $.LIST_ORDERS           = $.SERVER + ':'+ $.API_PORT +'/api/order';
  $.PUT_ORDERS            = $.SERVER + ':'+ $.API_PORT +'/api/order';
  $.ORDER_DETAIL          = $.SERVER + ':'+ $.API_PORT +'/api/order/';
  $.STOCK                 = $.SERVER + ':'+ $.API_PORT +'/api/products';
  $.STOCK_CHANGE          = $.SERVER + ':'+ $.API_PORT +'/api/products/change-stock';
     // urlApi.cambiarStock         = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/producto/cambiar-stock';
  /*urlApi.estadoApertura       = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/horario';
  urlApi.listarPedidos        = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/pedidos';
  urlApi.detallePedido        = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/pedido/';
  urlApi.pedidoEstado         = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/pedido/estado';
  urlApi.dispositivoId        = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/dispositivo/';
  urlApi.registrarDispositivo = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/dispositivo/uuid';
  urlApi.pedidoNuevo          = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/pedido/nuevo';
  urlApi.stock                = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/productos';
  urlApi.cambiarStock         = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/producto/cambiar-stock';
  urlApi.abrirCerrar          = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/horario/abrir-cerrar';
  */

  $.URL_PRODUCTS = ' https://s3-us-west-2.amazonaws.com/cavaonline/products/';
});
