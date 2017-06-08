angular.module('starter', ['ionic','ionic.service.core','ngCordova', 'starter.controllers','ionic.service.push', 'chart.js', 'ionicImgCache', 'base64'])

.run(function($ionicPlatform, $http, $rootScope, $q, dispositivoService, ConstantsService, PedidoService, NotificacionService,  $ionicPush, $ionicUser) {


    $rootScope.server = 'http://localhost';
    $rootScope.port = 3000;
    $rootScope.urls = {};
    $rootScope.urls.estadoApertura       = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/horario';
    $rootScope.urls.detallePedido        = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/pedido/';
    $rootScope.urls.pedidoEstado         = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/pedido/estado';
    $rootScope.urls.dispositivoId        = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/dispositivo/';
    $rootScope.urls.registrarDispositivo = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/dispositivo/uuid';
    $rootScope.urls.stock                = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/productos';
    $rootScope.urls.cambiarStock         = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/producto/cambiar-stock';
    $rootScope.urls.abrirCerrar          = 'http://'+$rootScope.server+'/app-drink/web/'+ $rootScope.env +'/api/horario/abrir-cerrar';

    $rootScope.abierto = true;

    $rootScope.totalProductos = PedidoService.getTotalProductos();

    /**
     *  Obtengo los token de los dispositivos administradores
     *
     */
    var getTokenAdmins = function(){
      var tokenAdmins = [];
      dispositivoService.getAdministradores()
        .then(function(dispAdm){
          angular.forEach(dispAdm, function (device) {
            tokenAdmins.push(device.token) ;
          });
          $rootScope.tokenAdm = tokenAdmins;
        })
        .catch(function (){
          alert("No se pudo obtener los dispositivos administradores");
        });

    };

    getTokenAdmins();

    /*$ionicPlatform.ready(function() {
     try {
     var push = new Ionic.Push({
     'debug': true,
     'onNotification': function (notificacion) {
     NotificacionService.postNotificacion(notificacion);
     }
     });
     } catch (e) {
     alert(e);
     }

     push.register(function(token) {
     setDataDispositivo(token.token);
     console.log("Mi token:", token.token);
     push.saveToken(token);
     })
     });*/

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.categorias', {
      url: '/categorias',
      views: {
        'menuContent': {
          templateUrl: 'templates/categorias.html',
          controller: 'categoriasCtrl'
        }
      }
    })

    .state('app.h', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })

  .state('app.listado', {
    url: '/categorias/:categoria',
    views: {
      'menuContent': {
        templateUrl: 'templates/listadoProductos.html',
        controller: 'listadoProductosCtrl'
      }
    }
  })

  .state('app.admProduct', {
    url: '/admin/adm-product',
    views: {
      'menuContent': {
        templateUrl: 'templates/Admin/admProduct.html',
        controller: 'admProductCtrl'
      }
    }
  })

    .state('app.promociones', {
      url: '/promociones',
      views: {
        'menuContent': {
          templateUrl: 'templates/promociones.html',
          controller: 'promocionesCtrl'
        }
      }
    })

    .state('app.contacto', {
      url: '/contacto',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacto.html',
          controller: 'contactoCtrl'
        }
      }
    })

    .state('app.admin', {
      url: '/admin',
      views: {
        'menuContent': {
          templateUrl: 'templates/Admin/home.html',
          controller: 'adminCtrl'
        }
      }
    })

    .state('app.pedDet', {
      url: '/admin/pedido/:pedido',
      views: {
        'menuContent': {
          templateUrl: 'templates/Admin/pedido-detalle.html',
          controller: 'pedidoDetalleCtrl'
        }
      }
    })

    .state('app.estadistica', {
      url: '/estadistica',
      views: {
        'menuContent': {
          templateUrl: 'templates/Admin/estadistica.html',
          controller: 'estadisticaCtrl'
        }
      }
    })

    .state('app.stock', {
      url: '/stock',
      views: {
        'menuContent': {
          templateUrl: 'templates/Admin/stock.html',
          controller: 'stockCtrl'
        }
      }
    })

    .state('app.error', {
      url: '/error',
      views: {
        'menuContent': {
          templateUrl: 'templates/error.html'
        }
      }
    })

    .state('app.salir', {
      url: '/salir',
      views: {
        'menuContent': {
          templateUrl: 'templates/salir.html',
          controller: 'salirCtrl'
        }
      }
    })

    .state('app.pedido', {
      url: '/mi-pedido',
      views: {
        'menuContent': {
          templateUrl: 'templates/mi-pedido.html',
          controller: 'pedidoCtrl'
        }
      }
    })

    .state('app.pedido-pendiente', {
      url: '/pedido-pendiente',
      views: {
        'menuContent': {
          templateUrl: 'templates/pedido-pendiente.html',
          controller: 'pedidoPendienteCtrl'
        }
      }
    })

    .state('app.producto', {
      url: '/producto/producto-detalle/:producto',
      views: {
        'menuContent': {
          templateUrl: 'templates/producto/detalleProducto.html',
          controller: 'productoCtrl'
        }
      }
    })

    .state('app.configuracion', {
      url: '/configuracion',
      views: {
        'menuContent': {
          templateUrl: 'templates/Admin/configuracion.html',
          controller: 'configuracionCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/categorias');
});
