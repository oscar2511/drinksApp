
angular.module('starter')
  .controller('admProductCtrl', function($scope, $http, $q, ProductService, ConstantsService,  $ionicLoading, $timeout, $state) {

    $scope.shouldShowCategories = true;
    $scope.showProducts = false;

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    var timer = $timeout(
      function() {
        $ionicLoading.hide();
        $state.go('app.error');
      },
      10000
    );

    function getCategories () {
      return $http.get(ConstantsService.CATEGORIES, { timeout: 100000 })
        .then(function (data) {
          $timeout.cancel(timer);
          console.log(data);
          var dataCruda = [];
          angular.forEach(data.data, function (value) {
            dataCruda.push(value);
          });

          $scope.categories = [];
          angular.forEach(dataCruda, function (valor) {
            $scope.categories.push({
              id    : valor._id,
              nombre: valor.name,
              urlImg: valor.urlImg
            });
          });
          $ionicLoading.hide();
          return $q.resolve();
        })
        .catch(function(err){
          $ionicLoading.hide();
          $state.go('app.error');
        });
    }

    $scope.showProductFromCategory = function (category) {
      $scope.shouldShowCategories = false;
      $scope.showProducts = true;
    };


    getCategories();




    $scope.product = {};



    $scope.uploadFile = function(file) {
      $scope.file = file[0];
    };

    $scope.save = function(product) {
      ProductService.Upload($scope.file)
        .then(function(response) {
          alert('carga exitosa');
        });
    }



});
