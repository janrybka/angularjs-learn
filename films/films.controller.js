(function () {
    var app = angular.module('plunker');

    app.controller('FilmsCtrl', function ($scope, swapiService, $routeParams) {
        var onComplete = function (response) {
            $scope.userFilms = response;
        }

        var onError = function (reason) {
            $scope.error = "Nie udalo sie pobrac: " + JSON.stringify(reason);
        }
        
        $scope.type = $routeParams.type;
        $scope.id = $routeParams.id;

        swapiService.getUserDetails($scope.type, $scope.id)
            .then(onComplete, onError);
    });

})();