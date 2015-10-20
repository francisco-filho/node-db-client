'use strict';

angular
    .module('pgUtil')
    .controller('MainCtrl', function(Schema){
        var vm = this;
        vm.schema = undefined;

        vm.title = 'PostGreSQL Administration Utility';

        Schema.get()
            .then(function(d){
                vm.schema = d;
                console.log(vm.schema)
            });
    })
    .factory('Schema', function($http){
        var get = function() {     
            return $http({
                method: 'GET',
                url: '/api/schema'
            }).then(function(result){
                var data = _.groupBy(result.data.rows, function(i){
                    return i[0];
                });

                for(var p in data){
                    if (data.hasOwnProperty(p)){
                        data[p] = data[p].reduce(function(old, nw){
                            old.push(nw[1]);
                            return old;
                        },[]);
                    }
                }
                return data;
            });
        };
        return {
            get: get
        };
    });
