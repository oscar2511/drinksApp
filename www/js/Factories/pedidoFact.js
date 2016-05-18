angular.module('starter')
  .factory('PedidoFactory', function($q){

  /**
   *
   * @param id
   * @param fecha
   * @constructor
   */
    var pedido = {
      fecha : 123,
      detalle:[{
        producto : {},
        cantidad : 0
      }]

  };

   // pedido.fecha = 123;
   // pedido.producto = [{}];

    pedido.addProducto = function(producto, cantidad){
      pedido.detalle.push(producto);
      pedido.detalle.push(cantidad);
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
