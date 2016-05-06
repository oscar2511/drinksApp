angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


  // Form data for the login modal
  $scope.loginData = {};

   $scope.mostrarHome = function(){
     console.log("aca");
     alert("aca");
   };



  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

})

.controller('CategoriasCtrl', function($scope, $http, $sce){
    var url = 'http://oscarnr.16mb.com/appDrinks/appDrinks.php';
    var postUrl = $sce.trustAsResourceUrl(url);

    console.log(url);

   $http.get(url)
     .then(function(data){
       console.log(data);
     });

    $scope.categorias = [
      { nombre: 'Vinos', id: 1 },
      { nombre: 'Cervezas', id: 2 },
      { nombre: 'Licores', id: 3 },
      { nombre: 'Whiskeys', id: 4 }
  ];
	})

.controller('ListadoProductosCtrl', function($scope, $stateParams){
  console.log(angular.fromJson($stateParams.categoria));
    console.log($stateParams.categoria);
	$scope.cate = angular.fromJson($stateParams.categoria);
	})

.controller('HomeCtrl', function($scope) {
})

.controller('PromocionesCtrl', function($scope) {
})

.controller('ContactoCtrl', function($scope) {
})

.controller('SalirCtrl', function($scope) {
})

.controller('MiPedidoCtrl', function($scope) {
})

.controller('ProductoCtrl', function($scope, $stateParams) {
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
