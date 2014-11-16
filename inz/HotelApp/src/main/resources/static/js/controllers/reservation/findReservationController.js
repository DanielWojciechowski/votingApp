'use strict';
app.controller('findReservationController', function ($scope, $http) {
    var urlBase="";
    $scope.pesel = null;
    $scope.findReservation = function() {
        if($scope.pesel != null && $scope.pesel != ""){
            $http.get(urlBase + '/reservations/search/findByRoomNoStartingWith?pesel=' + $scope.pesel).
                success(function (data) {
                    if (data._embedded != undefined) {
                        $scope.reservations = data._embedded.reservations;
                    } else {
                        $scope.reservations = [];
                    }
                });
        }
        else{
            $scope.reservations = [];
        }
    }
    $scope.findRoom;
});