/**
 * Stage factory
 *
 * @author Oscar Rodriguez <oscar.rodriguez@leadsius.com>
 */

(function(){

  'use strict';

  angular.module('pedido.factory', [])
    .factory('pedidoDrinks', [
      '$q',
      '$scope',
      function($q,$scope) {


        function pedidoDrinks() {
         $scope.test2=123;
        }
        /*
        *//**
         * @param {number}  params.id
         * @param {string}  params.name
         * @param {number}  params.total
         *
         * @constructor
         *//*
        function pedidoDrinks(params) {
          this.id           = parseInt(params.id);
          this.name         = params.name;
          this.total        = parseInt(params.total);
        }

        *//**
         * Fetch all stages
         *
         * @returns {*}
         *//*
        LsStage.getAll = function() {
          return api
            .get('leadsius_stages_all')
            .then(function(response){
              if (response.status !== 200) return $q.reject();
              return $q.resolve(response);
            });
        };

        *//**
         * Fetch a stage of a given id
         *
         * @param id
         * @returns {*}
         *//*
        LsStage.withId = function(id) {
          return api
            .get('leadsius_stages_contacts', {stageId: id});
        };
         */

        return pedidoDrinks;

      }]);

})();
