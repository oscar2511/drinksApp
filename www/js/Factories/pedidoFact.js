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
      detalle :[{}]
  };

    pedido.addProducto = function(producto, cantidad){
      if(!pedido.numero){
        pedido.numero = (Math.ceil(Math.random() * 999999999));
        pedido.fecha = new Date();
        console.log('nuevo pedido');
      }

      if(pedido.checkExisteProducto(producto, cantidad) == false){
        var productoPedido = {
          producto: producto,
          cantidad: cantidad
        };
        pedido.detalle.push(productoPedido);
      }
    };

    /**
     *
     * Checkear si el producto esta en el pedido. si es asi, sumarle la cantidad ingresada
     *
     * @param producto
     * @param cantidad
     */
    pedido.checkExisteProducto = function(producto, cantidad){
      var productoEnPedido = false;
      angular.forEach(pedido.detalle, function(value, key) {
        if(value.producto) {
          if (producto.id == value.producto.id) {
            productoEnPedido = true;
            value.cantidad = value.cantidad + cantidad;
            console.log(value.cantidad);
            pedido.addProductoCantidad(value);
          }
        }
      });
      return productoEnPedido;

    };

    pedido.getPedido = function(){
      return pedido;
    };

    pedido.addProductoCantidad = function(productoAsumarCantidad){

    };


    pedido.limpiarPedido = function(){
      pedido.detalle = [{}];
      pedido.numero  = null;
      pedido.fecha   = null;
      console.log(pedido);
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
