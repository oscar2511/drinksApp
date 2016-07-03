angular.module('starter')
  .service('PedidoService',
    function($q, $rootScope){

  /**
   * Seteo los valores del json de pedio en null | 0
   * @param id
   * @param fecha
   * @constructor
   */
    var pedido = {
      numero  : null,
      fecha   : null,
      detalle : [{}],
      total   : 0,
      subTotal: 0,
      dispositivo:{
        'token': '12345678',//null,
        'uuid' : 9876543
      },
      ubicacion:{
        coordenadas: {
          'lat' : null,
          'long': null
        },
        direccion  : {
          'calle' : null,
          'numero': null
        },
        referencia :{
          'tel'     : null,
          'dir_ref' : null
        }
      }
    };

    $rootScope.totalProductos  = 0;
    $rootScope.abierto         = true;
    $rootScope.estadoUltPedido = null;

    pedido.setTotalProductos = function (){
      $rootScope.totalProductos = 'pendiente';
      alert($rootScope.totalProductos);
    };

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
      }  // checkeo si existe el mismo producto en el pedido, si no existe lo pusheo

      if(!pedido.checkExisteProducto(producto, cantidad)){
        var subTotalprod = parseInt(cantidad) * parseFloat(producto.precio);
        subTotalprod     =  parseFloat(subTotalprod).toFixed(2);

        var productoPedido = {
          producto: producto,
          cantidad: cantidad,
          subTotal: subTotalprod
        };

        pedido.detalle.push(productoPedido);
        $rootScope.totalProductos = parseInt($rootScope.totalProductos) + parseInt(cantidad);
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
      angular.forEach(pedido.detalle, function(value) {
        if(value.producto) {
          if (producto.id == value.producto.id) {
            productoEnPedido = true;
            if( value.cantidad + cantidad > 0) {
              value.cantidad = value.cantidad + cantidad;
              value.subTotal = parseInt(value.cantidad) * parseFloat(producto.precio);
              value.subTotal = parseFloat(value.subTotal).toFixed(2);

              pedido.total    = parseFloat(pedido.total) + parseFloat(cantidad * producto.precio);
              pedido.total    = parseFloat(pedido.total).toFixed(2)
              pedido.subTotal = pedido.total ;

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
            $rootScope.totalProductos = parseInt($rootScope.totalProductos) - parseInt(value.cantidad);
            pedido.calcularTotal();
          }
        }
      });
    };

    /**
     * //todo verificar el proceso de calculo del total del pedido, cuando entro al carro de compras
     */
    pedido.calcularTotal = function(){
      pedido.total    = 0;
      pedido.subTotal = 0;
      angular.forEach(pedido.detalle, function(value, key) {
        if(value.producto) {
          pedido.subTotal = parseInt(value.cantidad) * parseFloat(value.producto.precio);
          pedido.subTotal = parseFloat(pedido.subTotal).toFixed(2);
          pedido.total    = parseFloat(pedido.total) + parseFloat(pedido.subTotal);
          pedido.total    = parseFloat(pedido.total).toFixed(2);
          pedido.subTotal = parseFloat(pedido.total).toFixed(2); //puesto porque no se usa por ahora el subtotal(pensado para recargos, etc)
        }
      });
       return true;
    };

    /**
     * Limpia el pedido
     */
    pedido.limpiarPedido = function(){
      pedido.detalle = [{}];
      pedido.numero  = null;
      pedido.fecha   = null;
      pedido.totalProductos     = 0;
      pedido.total              = 0;
      pedido.subTotal           = 0;
      $rootScope.totalProductos = 0;
    };

      /**
       * Limpia todo
       */
      pedido.limpiarTodo = function(){
        pedido.detalle = [{}];
        pedido.numero  = null;
        pedido.fecha   = null;
        pedido.totalProductos      = 0;
        pedido.total               = 0;
        pedido.subTotal            = 0;
        $rootScope.totalProductos  = 0;
        $rootScope.pedidoPendiente = false;
        $rootScope.estadoUltPedido = null;
        $rootScope.totalUltPedido  = null;
        $rootScope.fechaUltPedido  = null;
        $rootScope.idUltPedido     = null;
        $rootScope.tieneProductos  = false;
      };


      return pedido;

});
