(function () {
    var app = angular.module('plunker', ["ngRoute"]);
    
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainCtrl"
            })
            .when("/user/:type", {
                templateUrl: "user.html",
                controller: "UserCtrl"
            })
            .when("/film/:type/:id", {
                templateUrl: "films/films.html",
                controller: "FilmsCtrl"
            })
            .when("/film/:type/:id/:asdf/:qwer", {
                templateUrl: "films/films.html",
                controller: "FilmsCtrl"
            })
            .otherwise({
                redirectTo: "/main"
            })
    });
})();