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

    pedido.totalProductos = 0;

    /**
     *
     * @param producto
     * @param cantidad
     */
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
        pedido.totalProductos = pedido.totalProductos + cantidad;
        console.log(pedido.totalProductos + cantidad);
      }
      console.log(pedido.detalle);
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
            if( value.cantidad + cantidad > 0) {
              value.cantidad = value.cantidad + cantidad;
              pedido.totalProductos = pedido.totalProductos + cantidad;
              console.log(pedido.totalProductos + cantidad);
            }
          }
        }
      });
      return productoEnPedido;

    };

    /**
     *
     * @returns {{numero: null, fecha: null, detalle: {}[]}}
     */
    pedido.getPedido = function(){
      return pedido;
    };

    /**
     * Agregar en 1 la cantidad de un producto de un pedido
     * @param producto
     * @param cantidad
     */
    pedido.addProductoCantidad = function(producto, cantidad){
      pedido.checkExisteProducto(producto, cantidad);
    };

    /**
     * Decrementar en 1 la cantidad de un producto de un pedido
     *
     * @param producto
     * @param cantidad
     */
    pedido.decrementarProductoCantidad = function (producto, cantidad){
      pedido.checkExisteProducto(producto, cantidad);
      pedido.totalProductos = pedido.totalProductos - cantidad;
    };

    /**
     * Eliminar un producto de un pedido
     *
     * @param producto
     */
    pedido.eliminarProductoPedido = function(producto){
      angular.forEach(pedido.detalle, function(value, key) {
        if(value.producto) {
          if (producto.id == value.producto.id)
            pedido.detalle.splice(key, 1);
          pedido.totalProductos = pedido.totalProductos - value.cantidad;
        }
      });
    };


    /**
     *
     */
    pedido.limpiarPedido = function(){
      pedido.detalle = [{}];
      pedido.numero  = null;
      pedido.fecha   = null;
      pedido.totalProductos = 0;
      console.log(pedido);
    };

    return pedido;

});
