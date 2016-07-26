
angular.module('starter')
  .controller('contactoCtrl', function($scope, $ionicSlideBoxDelegate) {

    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    }

    $scope.options = {
      loop: false,
      effect: 'fade',
      speed: 500
    };

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
      // data.slider is the instance of Swiper
      $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
      console.log('Slide change is beginning');
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
      // note: the indexes are 0-based
      $scope.activeIndex = data.slider.activeIndex;
      $scope.previousIndex = data.slider.previousIndex;
    });

  });
