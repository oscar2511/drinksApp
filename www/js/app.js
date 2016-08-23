angular.module('starter', ['ionic','ionic.service.core','ngCordova', 'starter.controllers','ionic.service.push', 'chart.js', 'ionicImgCache'])

.run(function($ionicPlatform, $http, $rootScope, $q, dispositivoService) {

    /**
     * Chequeo si esta abierto (horario)
     **var url = 'http://23.94.249.163/appDrinks/general/abrir-cerrar.php';

    var getAbiertoCerrado = function(){
      $http.get(url)
        .then(function(data){
          console.log(data.data.data[0]);
          if(data.data.data[0] == 1)
            $rootScope.abierto = true;
          else $rootScope.abierto = false;
        })
    };*/



   /* var obtenerHorario = function(){
      var urlAbierto = 'http://23.94.249.163/appDrinks/general/horario.php';
      return $http.get(urlAbierto)
        .then(function(data){
          var array = data.data.data;
          if(array.length < 1)
            $rootScope.abierto = false; //cambiar a false
          return $q.resolve();
        })
    };*/


    /**
     *  Obtengo los token de los dispositivos administradores
     *
     */
    var getTokenAdmins = function(){
      var tokenAdmins = [];
      dispositivoService.getAdministradores()
        .then(function(dispAdm){
          angular.forEach(dispAdm, function (valor) {
            tokenAdmins.push(valor.token) ;
          });
          $rootScope.tokenAdm = tokenAdmins;
        });

    };

    getTokenAdmins();
    //obtenerHorario();
    //getAbiertoCerrado();

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
