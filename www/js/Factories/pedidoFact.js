angular.module('starter')
  .factory('PedidoFactory', function($q, $rootScope){

  /**
   *
   * @param id
   * @param fecha
   * @constructor
   */
    var pedido = {
      numero  : null,
      fecha   : null,
      detalle :[{}],
      total   : 0,
      subtotal: 0
  };

    $rootScope.totalProductos = 0;

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
      if(!pedido.checkExisteProducto(producto, cantidad)){
        var productoPedido = {
          producto: producto,
          cantidad: cantidad
        };
        pedido.detalle.push(productoPedido);
        $rootScope.totalProductos = parseInt($rootScope.totalProductos) + parseInt(cantidad);
        pedido.total = 1;
        pedido.subTotal = parseInt(cantidad) * parseInt(producto.precio);
        console.log(parseInt(pedido.subTotal));
        pedido.total = parseInt(pedido.total) + parseInt(pedido.subTotal);
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
            if( value.cantidad + cantidad > 0) {
              value.cantidad = value.cantidad + cantidad;
              if(cantidad < 0)
                $rootScope.totalProductos = parseInt($rootScope.totalProductos) - 1;
              else
                $rootScope.totalProductos = parseInt($rootScope.totalProductos) + parseInt(cantidad);
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
      pedido.calcularTotal();
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
    };

    /**
     * Eliminar un producto de un pedido
     *
     * @param producto
     */
    pedido.eliminarProductoPedido = function(producto){
      angular.forEach(pedido.detalle, function(value, key) {
        if(value.producto) {
          if (producto.id == value.producto.id){
            pedido.detalle.splice(key, 1);
            console.log($rootScope.totalProductos);
            console.log(value.cantidad);
            $rootScope.totalProductos = parseInt($rootScope.totalProductos) - parseInt(value.cantidad);
          }
        }
      });
    };

    /**
     * //todo verificar el proceso de calculo del total del pedido, cuando entro al carro de compras
     */
    pedido.calcularTotal = function(){
      angular.forEach(pedido.detalle, function(value, key) {
        if(value.producto) {
          pedido.total = 1;
          console.log(isNaN(pedido.total) + value.producto.precio * value.cantidad);
          pedido.total = isNaN(pedido.total) + isNaN(isNaN(value.producto.precio) * isNaN(value.cantidad));

        }
      });
       //console.log(pedido.total);
    };

    /**
     * Limpia el pedido
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
