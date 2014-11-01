'use strict';
app.controller('appVersionController', function ($scope, $http) {
    $http.get('./data/version.json').success(function (data) {
        $scope.version = data.version;
    });
});