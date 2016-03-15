'use strict';
app.controller('resultsController', function ($scope, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/json";

    $http.get('/closedSurveys').
    success(function (data) {
        if (data != undefined) {
            $scope.surveys = data;
        }
    });

});