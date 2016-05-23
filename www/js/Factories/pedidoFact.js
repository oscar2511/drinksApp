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
      subTotal: 0
  };

    $rootScope.totalProductos = 0;
//    $rootScope.total = 0;

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
        //pedido.subTotal           = parseInt(cantidad) * parseFloat(producto.precio);
        //pedido.total              = parseFloat(pedido.total) + parseFloat(pedido.subTotal);
        //console.log(parseFloat($rootScope.total));
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
      if(pedido.calcularTotal())
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
        pedido.total = 0;
        pedido.subTotal = 0;
        if(value.producto) {
          pedido.subTotal = parseInt(value.cantidad) * parseFloat(value.producto.precio);
          pedido.total    = parseFloat(pedido.total) + parseFloat(pedido.subTotal);
        }
      });
       return true;//console.log(pedido.total);
    };

    /**
     * Limpia el pedido
     */
    pedido.limpiarPedido = function(){
      pedido.detalle = [{}];
      pedido.numero  = null;
      pedido.fecha   = null;
      pedido.totalProductos = 0;
      pedido.total = 0;
      pedido.subTotal = 0;
      console.log(pedido);
    };

    return pedido;

});
