angular.module('starter')
  .service('ProductService',
  function($q, $rootScope, $http, ConstantsService, Upload){

    var $ = this;

    AWS.config.region = 'us-west-2';
    AWS.config.update({ accessKeyId: 'my_access_Id', secretAccessKey: 'secret_id' });

    var bucket = new AWS.S3({ params: { Bucket: 'cavaonline', maxRetries: 10 }, httpOptions: { timeout: 360000 } });

    this.Upload = function (file) {
        var deferred = $q.defer();
        var params   = { Bucket: 'cavaonline', Key: 'products/' + file.name, ContentType: file.type, Body: file };
        var options  = {
            partSize: 10 * 1024 * 1024,
            queueSize: 1,
            ACL: 'public-read'
        };
      bucket.upload(params, options, function (err, data) {
            if (err) {
                deferred.reject(err);
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

    this.save = function(product) {
      console.log(product);
      alert(123);
      /*
      this.Upload(product.file)
        .then(function(response) {
          alert('exito');
        })
        .catch(function(err) {
          alert('error editando el producto')
        })*/
    }



  });
