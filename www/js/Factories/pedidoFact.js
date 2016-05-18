angular.module('starter')
  .factory('PedidoFactory', function($q){

  /**
   *
   * @param id
   * @param fecha
   * @constructor
   */
  function PedidoFactory(id, fecha) {
    this.id       = id;
    this.fecha    = fecha;
    this.producto = [{}];
  }

  PedidoFactory.prototype.agregarProducto = function(param){
    this.producto = param;
    console.log(this.producto);

  };

  return( PedidoFactory );
});
