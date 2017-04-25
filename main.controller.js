(function () {
    var app = angular.module('plunker');

    app.controller('MainCtrl', function ($scope, $interval, $location) {
        
        var decrementCountdown = function () {
            $scope.countdown -= 1;   
            if ($scope.countdown < 1)
            {    
                $scope.search($scope.type);
            }
        }

        var cdInterval = null;
        var startCountdown = function () {
            cdInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        }

        $scope.search = function (type) {
            if (cdInterval) {
                $interval.cancel(cdInterval);
                cdInterval = null;
                $scope.countdown = null;
            }

            $location.path("/user/" + type);
        }

        $scope.type = "people";
        $scope.countdown = 5;

        startCountdown();
    });

})();