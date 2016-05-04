// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.categorias', {
      url: '/categorias',
      views: {
        'menuContent': {
          templateUrl: 'templates/categorias.html',
          controller: 'CategoriasCtrl'
        }
      }
    })

    .state('app.h', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

  .state('app.listado', {
    url: '/categorias/:categoria',
    views: {
      'menuContent': {
        templateUrl: 'templates/listadoProductos.html',
        controller: 'ListadoProductosCtrl'
      }
    }
  })

    .state('app.promociones', {
      url: '/promociones',
      views: {
        'menuContent': {
          templateUrl: 'templates/promociones.html',
          controller: 'PromocionesCtrl'
        }
      }
    })

    .state('app.contacto', {
      url: '/contacto',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacto.html',
          controller: 'ContactoCtrl'
        }
      }
    })

    .state('app.salir', {
      url: '/salir',
      views: {
        'menuContent': {
          templateUrl: 'templates/salir.html',
          controller: 'SalirCtrl'
        }
      }
    })

    .state('app.miPedido', {
      url: '/mi-pedido',
      views: {
        'menuContent': {
          templateUrl: 'templates/mi-pedido.html',
          controller: 'MiPedidoCtrl'
        }
      }
    })

    .state('app.producto', {
      url: '/producto/:productoId',
      views: {
        'menuContent': {
          templateUrl: 'templates/producto.html',
          controller: 'ProductoCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/playlists');
  $urlRouterProvider.otherwise('/app/categorias');
});












