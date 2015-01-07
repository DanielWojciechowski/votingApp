'use strict';
app.controller('findReservationController', function ($scope, $http, findReservationService, restResourceService) {
    $scope.selectedCriterion;
    $scope.criteria = [
        'PESEL Klienta',
        'identyfikator rezerwacji'
    ];
    $scope.reservations;
    $scope.selectedReservation;

    $scope.findReservation = function(selectedCriterion, inputText){
        if(selectedCriterion == 'PESEL Klienta'){
            findByPesel(inputText);
        }
        else if(selectedCriterion == 'identyfikator rezerwacji'){
            findByReservationId(inputText);
        }
    }

    var findByReservationId = function(inputText){
        $http.get('/reservations/search/findById?id='+inputText).
            success(function (data) {
                if (data != undefined) {
                    $scope.reservations = data._embedded.reservations;
                    prepareObjectIds($scope.reservations);
                }
            });
    }

    var findByPesel = function(inputText){
        $http.get('/reservations/search/findClientReservationsByPesel?pesel='+inputText).
            success(function (data) {
                if (data != undefined) {
                    $scope.reservations = data._embedded.reservations;
                    prepareObjectIds($scope.reservations);
                }
            });
    }

    var prepareObjectIds = function(array){
        angular.forEach(array, function(value, key) {
            value.reservationId = restResourceService.getObjectIdFromUrl(value._links.self.href);
        });
    }

    $scope.saveReservation = function(reservation){
        findReservationService.setReservation(reservation);
    }
});