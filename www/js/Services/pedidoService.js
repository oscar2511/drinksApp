angular.module('starter')
  .service('PedidoService',
  function($q, $rootScope, $http, ConstantsService){

    var $ = this;

    $.pedido = {
      numero  : null,
      fecha   : null,
      detalle : [],
      total   : 0,
      subTotal: 0,
      dispositivo:{
        'token': null,
        'uuid' : null
      },
      ubicacion: {
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



    $.totalProductos  = 0;
    $.abierto         = true;
    $.estadoUltPedido = null;

    $.setTotalProductos = function (){
      $.totalProductos = 'pendiente';
    };

    /**
     *
     * @param producto
     * @param cantidad
     */
    $.addProducto = function(producto, cantidad) {

      if(!$.pedido.numero){
        $.pedido.numero = (Math.ceil(Math.random() * 999999999));
        $.pedido.fecha = new Date();
      }
      if(!checkExisteProducto(producto, cantidad)) {
        var subTotalprod = parseInt(cantidad) * parseFloat(producto.precio);
        subTotalprod     = parseFloat(subTotalprod).toFixed(2);

        var productoPedido = {
          producto: producto,
          cantidad: cantidad,
          subTotal: subTotalprod
        };

        $.pedido.detalle.push(productoPedido);

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
    var checkExisteProducto = function(producto, cantidad){

      var productoEnPedido = false;
      angular.forEach($.pedido.detalle, function(value) {
        if(value.producto) {
          if (producto.id == value.producto.id) {
            productoEnPedido = true;
            if( value.cantidad + cantidad > 0) {
              value.cantidad = value.cantidad + cantidad;
              value.subTotal = parseInt(value.cantidad) * parseFloat(producto.precio);
              value.subTotal = parseFloat(value.subTotal).toFixed(2);

              $.pedido.total    = parseFloat($.pedido.total) + parseFloat(cantidad * producto.precio);
              $.pedido.total    = parseFloat($.pedido.total).toFixed(2);
              $.pedido.subTotal = $.pedido.total ;
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
    $.getPedido = function(){
      if($.calcularTotal())
        return $.pedido;
    };

    /**
     * Agregar en 1 la cantidad de un producto de un pedido
     * @param producto
     * @param cantidad
     */
    $.addProductoCantidad = function(producto, cantidad){
      checkExisteProducto(producto, cantidad);
    };

    /**
     * Decrementar en 1 la cantidad de un producto de un pedido
     *
     * @param producto
     * @param cantidad
     */
    $.decrementarProductoCantidad = function (producto, cantidad){
      checkExisteProducto(producto, cantidad);
    };

    /**
     * Eliminar un producto de un pedido
     *
     * @param producto
     */
    $.eliminarProductoPedido = function(producto){
      angular.forEach($.pedido.detalle, function(value, key) {
        if(value.producto) {
          if (producto.id == value.producto.id){
            $.pedido.detalle.splice(key, 1);
            $rootScope.totalProductos = parseInt($rootScope.totalProductos) - parseInt(value.cantidad);
            $.calcularTotal();
          }
        }
      });
    };

    /**
     * //todo verificar el proceso de calculo del total del pedido, cuando entro al carro de compras
     */
    $.calcularTotal = function(){
      $.pedido.total    = 0;
      $.pedido.subTotal = 0;
      angular.forEach($.pedido.detalle, function(value, key) {
        if(value.producto) {
          $.pedido.subTotal = parseInt(value.cantidad) * parseFloat(value.producto.precio);
          $.pedido.subTotal = parseFloat($.pedido.subTotal).toFixed(2);
          $.pedido.total    = parseFloat($.pedido.total) + parseFloat($.pedido.subTotal);
          $.pedido.total    = parseFloat($.pedido.total).toFixed(2);
          $.pedido.subTotal = parseFloat($.pedido.total).toFixed(2); //puesto porque no se usa por ahora el subtotal(pensado para recargos, etc)
        }
      });
      return true;
    };

    $.getTotalProductos = function() {
      return $.totalProductos;
    };

    /**
     * Limpia el pedido
     */
    $.limpiarPedido = function(){
      $.pedido.detalle = [];
      $.pedido.numero  = null;
      $.pedido.fecha   = null;
      $rootScope.totalProductos   = 0;
      $.pedido.total              = 0;
      $.pedido.subTotal           = 0;
      $.pedido.totalProductos = 0;
      $rootScope.pedidoPendiente = false;
    };

    /**
     * Limpia todo
     */
    $.limpiarTodo = function(){
      $.pedido.detalle = [];
      $.pedido.numero  = null;
      $.pedido.fecha   = null;
      $.pedido.totalProductos    = 0;
      $.pedido.total             = 0;
      $.pedido.subTotal          = 0;
      $rootScope.totalProductos  = 0;
      $rootScope.pedidoPendiente = false;
      $rootScope.estadoUltPedido = null;
      $rootScope.totalUltPedido  = null;
      $rootScope.fechaUltPedido  = null;
      $rootScope.idUltPedido     = null;
      $rootScope.tieneProductos  = false;
    };

    /**
     * Save a order
     */
    $.registrarNuevoPedido = function(pedido){

      var url = ConstantsService.PUT_ORDERS;
      return $http.post(url, pedido)
        .then(function (data) {
          if(data.status != 200) return $q.reject();
          $rootScope.idUltPedido = data.data._id;
          return $q.resolve(data.status);
        })
        .catch(function() {
          $ionicLoading.hide();
          $state.go('app.error');
        });
    };


    /**
     * Cambiar estado de un pedido
     * @param idPedido
     * @param estado
     */
    $.cambiarEstado = function(idPedido, estado){
      var config = {
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      };
      var params = {
        idPedido: idPedido,
        estado:   estado
      };
      var urlCambiarEstado = $rootScope.urls.pedidoEstado;

      return $http.post(urlCambiarEstado, params, config)
        .then(function (data){
          if(data.data.estado != 200) return $q.reject();
          return $q.resolve(data.data.estado);
        });
    };


  });
