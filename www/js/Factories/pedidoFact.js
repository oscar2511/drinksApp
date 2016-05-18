angular.module('starter')
  .factory('PedidoFactory', function($q){

  /**
   *
   * @param id
   * @param fecha
   * @constructor
   */
    var pedido = {
      numero  : null,
      fecha   : null,
      detalle :[{
        productoPedido : {}
      }]

  };

   // pedido.fecha = 123;
   // pedido.producto = [{}];

    pedido.addProducto = function(productoPedido){
      pedido.detalle.push(productoPedido);
    };

    pedido.getPedido = function(){
      return pedido;
    };

    return pedido;
 /* function PedidoFactory(id, fecha) {
    this.id       = id;
    this.fecha    = fecha;
    this.producto = [{}];
  }

  PedidoFactory.prototype.agregarProducto = function(param){
    this.producto = param;
    console.log(this.producto);

  };

  return( PedidoFactory );*/
});
