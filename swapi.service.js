(function () {
    var module = angular.module("plunker");

    var swapiService = function ($http) {
        
        var getType = function (type) {
            if (type === "people") {
                return $http.get("http://swapi.co/api/" + type).
                    then(function (response) {
                        return response.data;
                    });
            } else {
                throw "type not implemented. Use 'people'.";
            }
        }

        var getPeople = function (type) {
            return $http.get("http://swapi.co/api/" + type + "/").
                then(function (response) {
                    return response.data.results.map(
                        function (row) {
                            row.mass = parseInt(row.mass);
                            row.height = parseInt(row.height);
                            return row;
                        }
                    );
                });
        }
        
        var getUserDetails = function (type, id) {
            return $http.get("http://swapi.co/api/" + type + "/"+id).
                then(function (response) {
                    response.data.films = response.data.films.map(
                        function (row) {
                            let url = row;
                            row = {};
                            row.url = url;
                            return row;
                        }
                    );
                    let films = response.data.films;
                    
                    if (films && Array.isArray(films)) {
                        angular.forEach(films,
                            function (val, key) {
                                let film = this;
                                $http.get(val.url)
                                    .then(function (filmDetail) {
                                        film[key] = filmDetail.data;
                                    });
                            }, films
                        );
                    }

                    return response.data;
                });
        }

        return {
            getType: getType,
            getPeople: getPeople,
            getUserDetails: getUserDetails
        }
    }
    module.factory("swapiService", swapiService);
})();