'use strict';
app.controller('homeController', function ($scope, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/json";

    $http.get('/currentSurveys').
    success(function (data) {
        if (data != undefined) {
            $scope.surveys = data;
        }
    });

});