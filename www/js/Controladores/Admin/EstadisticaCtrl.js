angular.module('starter')
  .controller('estadisticaCtrl', function(
    $scope,
    $state) {

    $scope.atrasEst = function (){
      $state.go('app.categorias');
    };


    $scope.labels = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

    $scope.labelProductos = ["Cerveza", "Promo Fernet", "Vinos"];
    $scope.dataProductos = [300, 500, 100];

    $scope.labelsEstado = ["Nuevo", "En Camino", "Cancelado", "Recibido"];
    //$scope.seriesEstado = ['Series A', 'Series B','Series c'];
    $scope.dataEstado = [18,35 ,9 , 67];
   /* $scope.colorEstado =  [{
      fillColor: 'rgba(120, 132, 71, 0.8)',
      strokeColor: 'rgba(47, 132, 71, 0.8)',
      highlightFill: 'rgba(47, 132, 71, 0.8)',
      highlightStroke: 'rgba(47, 132, 71, 0.8)'
    }]*/



    $scope.labelsVentas = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    $scope.seriesVentas = ['Semana Actual', 'Semana Anterior'];
    $scope.dataVentas = [
      [65, 59, 80, 81, 56, 55, 40],
      [43, 87, 56, 28, 49, 76, 96]
    ];


  });
