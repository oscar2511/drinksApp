angular.module('starter')
  .service('ProductService',
  function($q, $http, ConstantsService, $base64){

    var $ = this;

    AWS.config.update({
      accessKeyId: 'acc_key',
      secretAccessKey: 'my_secret',
      correctClockSkew: true });

    var bucket = new AWS.S3({ params: { Bucket: 'cavaonline-app', maxRetries: 10 }, httpOptions: { timeout: 360000 } });

    this.Upload = function (file) {
        var deferred = $q.defer();
        var params   = { Bucket: 'cavaonline-app', Key: 'products/'+ $base64.encode(file.name), ContentType: file.type, Body: file };
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
            deferred.resolve(data);
        });

        return deferred.promise;
    };

    this.save = function(product, isNew) {
      if(!angular.isUndefined(product.file)) {
        return this.Upload(product.file)
          .then(function (response) {
            product.urlImg = response.Location;
            $.saveProductData(product, isNew)
              .then(function(response) {
                return $q.resolve(response)
              });
          })
          .catch(function (err) {
            console.log(err);
            alert('Error subiendo imagen');
            alert(err);
            return $q.reject(err);
          });
      } else {
        product.urlImg = $base64.decode(product.urlImg);
        return $.saveProductData(product, isNew)
          .then(function(response) {
            return $q.resolve(response)
          })
          .catch(function (err) {
            console.log(err);
            alert('error editando el producto')
          });
      }
    };

    this.saveProductData = function(dataProduct, isNew) {
      if(isNew) return this.saveNewProduct(dataProduct);
      else return this.saveEditProduct(dataProduct);
    };


    this.saveNewProduct = function(dataProduct) {
      var url = ConstantsService.NEW_PRODUCT;
      return $http.post(url, dataProduct)
        .then(function (data) {
          if(data.status != 200) return $q.reject();
          return $q.resolve(data.status);
        })
        .catch(function() {
          $ionicLoading.hide();
          $state.go('app.error');
        });
    };

    this.saveEditProduct = function(dataProduct) {
      var url = ConstantsService.EDIT_PRODUCT + dataProduct.id;
      return $http.put(url, dataProduct)
        .then(function (data) {
          if(data.status != 200) return $q.reject();
          return $q.resolve(data.status);
        })
        .catch(function() {
          $ionicLoading.hide();
          $state.go('app.error');
        });
    }



  });
