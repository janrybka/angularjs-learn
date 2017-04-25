(function () {
    var app = angular.module('plunker');

    app.controller('UserCtrl', function ($scope, swapiService, $routeParams) {
        var onUserComplete = function (response) {
            $scope.typeListInfo = response;
            swapiService.getPeople($scope.type)
                .then(
                    function (instances) {
                        $scope.instances = instances.map(function (val, idx) {
                            val.id = val.url.match(/[0-9]*(?=[^[0-9]*]*$)/).pop();
                            return val;
                        });
                    },
                    onError
                );
        }

        var onError = function (reason) {
            $scope.error = "Nie udalo sie pobrac: " + JSON.stringify(reason);
        }
        
        $scope.type = $routeParams.type;
        $scope.repoSortOrder = "mass";
        $scope.repoSortOrderType = "1";

        swapiService.getType($scope.type)
            .then(onUserComplete, onError);
    });

})();