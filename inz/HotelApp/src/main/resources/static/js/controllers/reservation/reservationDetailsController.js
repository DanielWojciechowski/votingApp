/**
 * Created by Daniel on 2014-11-02.
 */
app.controller('reservationDetailsController', function ($scope, $http, $filter, $modal, findReservationService, restResourceService, modalService) {
    $scope.modalService = modalService;
    $scope.reservationData = findReservationService.getReservation();
    $http.get('/clients/search/findClientByReservationId?id=' + $scope.reservationData.reservationId).
        success(function (data) {
            if (data != undefined) {
                $scope.client = data._embedded.clients[0];
            }
        });
    $http.get('/roomsInReservations/search/findRoomsInReservationByReservationId?id=' + $scope.reservationData.reservationId).
        success(function (data) {
            if (data != undefined) {
                $scope.roomsInReservation = data._embedded.roomsInReservations[0];//1 pokój - 1 rezerwacja!
            }
        })
        .finally(function () {
            $scope.roomsInReservationId = restResourceService.getObjectIdFromUrl($scope.roomsInReservation._links.self.href);
            $http.get('/rooms/search/findRoomByRoomsInReservationId?id=' + $scope.roomsInReservationId).
                success(function (data) {
                    if (data != undefined) {
                        $scope.room = data._embedded.rooms[0];
                    }
                })
                .finally(function () {
                    $http.get('/dictRoomTypes/search/findRoomTypeByRoomId?id=' + restResourceService.getObjectIdFromUrl($scope.room._links.self.href)).
                        success(function (data) {
                            if (data != undefined) {
                                $scope.roomType = data._embedded.dictRoomTypes[0];
                            }
                        });
                });
        });
    $scope.open = function (size, modalHeader, modalType, hrefs, specificController) {
        return modalInstance = $modal.open({
            templateUrl: './views/modals/modal.html',
            controller: 'modalController',
            size: size,
            scope: $scope,
            resolve: {
                modalHeader: function () {
                    return modalHeader;
                },
                modalType: function(){
                    return modalType;
                },
                hrefs: function(){
                    return hrefs;
                },
                specificController: function(){
                    return specificController;
                }
            }
        });
    }
});