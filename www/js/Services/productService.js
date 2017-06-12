angular.module('starter')
  .service('ProductService',
  function($q, $rootScope, $http, ConstantsService, Upload){

    var $ = this;

    AWS.config.region = 'us-west-2';
    AWS.config.update({ accessKeyId: 'my_access_Id', secretAccessKey: 'secret_id' });

    var bucket = new AWS.S3({ params: { Bucket: 'cavaonline', maxRetries: 10 }, httpOptions: { timeout: 360000 } });

    this.Upload = function (file) {
        var deferred = $q.defer();
        var params   = { Bucket: 'cavaonline', Key: 'products/'+file.name, ContentType: file.type, Body: file };
        var options  = {
            partSize: 10 * 1024 * 1024,
            queueSize: 1,
            ACL: 'public-read'
        };
      bucket.upload(params, options, function (err, data) {
            if (err) {
              console.error(err);
                deferred.reject(err);
            }
            console.log('exito');
            deferred.resolve();
        });

        return deferred.promise;
    };



    /**
     *
     * Checkear si el producto esta en el pedido. si es asi, sumarle la cantidad ingresada
     *
     * @param producto
     * @param cantidad
     */
    /*var checkExisteProducto = function(producto, cantidad){

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
    };*/


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
