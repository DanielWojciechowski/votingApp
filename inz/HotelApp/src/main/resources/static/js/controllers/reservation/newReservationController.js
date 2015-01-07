/**
 * Created by Daniel on 2014-11-02.
 */
app.controller('newReservationController', function ($scope, $http, $filter, newReservationService, restResourceService, findReservationService) {

    $http.defaults.headers.post["Content-Type"] = "application/json";
    $scope.minDateStart = new Date();
    $scope.minDateEnd = new Date();

    $scope.openedStart = false;
    $scope.openedEnd = false;

    $scope.openStart = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedStart = !$scope.openedStart;
    };

    $scope.openEnd = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedEnd = !$scope.openedEnd;

    };

    $scope.clearText = 'Wyczyść';
    $scope.closeText = 'Zamknij';
    $scope.currentText = 'Dziś';
    $scope.format = 'dd.MM.yyyy';

    $scope.status = {
        isRoomDropdownOpen: false
    };

    $scope.selectedRoomType = null;
    $scope.roomTypes = [];

    $scope.findRoomTypes = function() {
        $http.get('/dictRoomTypes').
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.roomTypes = data._embedded.dictRoomTypes;
                }
            });
    }
    $scope.findRoomTypes();

    $scope.selectedRoom = null;
    $scope.rooms = [];

    $scope.getAvailableRooms = function(startDate, endDate, selectedRoomType, bed) {
        newReservationService.setStartDate(startDate.getTime()- 86400000);
        newReservationService.setEndDate(endDate);
        newReservationService.setBed(bed);
        newReservationService.setRoomType(selectedRoomType);
        newReservationService.setDays(Math.round(Math.abs((newReservationService.getEndDate().getTime() - newReservationService.getStartDate())/(24*60*60*1000))));
        $http.get('/rooms/search/findAvailableByRoomType?roomType='+selectedRoomType.roomType +'&startDate=' +$filter('date')(startDate,'yyyy-MM-dd')+'&endDate='+$filter('date')(endDate,'yyyy-MM-dd')).
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.rooms = data._embedded.rooms;
                }
            });
    }

    $scope.bedCheckbox = false;

    $scope.selectedStayPackage = null;
    $scope.stayPackages = [];
    $scope.findStayPackages = function() {
        $http.get('/stayPackages').
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.stayPackages = data._embedded.stayPackages;
                }
            });
    }
    $scope.findStayPackages();

    $scope.reservationInfo;
    $scope.selectedPaymentType = null;
    $scope.paymentTypes = [];
    $scope.findPaymentTypes = function() {
        $http.get('/dictPaymentTypes').
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.paymentTypes = data._embedded.dictPaymentTypes;
                }
            });
    }
    $scope.findPaymentTypes();

    $scope.stayValue = 0;
    $scope.totalCost = 0;
    $scope.bedCost;

    $scope.getStayValue = function(selectedRoom, selectedStayPackage) {
        newReservationService.setRoomNo(selectedRoom);
        newReservationService.setStayPackage(selectedStayPackage);
        $scope.selectedRoomType=newReservationService.getRoomType();
        function prepareCost() {
            $scope.stayValue = $scope.stayValue - ($scope.stayValue * (selectedStayPackage.roomDiscountPercentage / 100)) + newReservationService.getDays()*selectedStayPackage.serviceCost * ($scope.selectedRoomType.space+newReservationService.getBedCost()/100);
            newReservationService.setCost($scope.stayValue);
            $scope.totalCost = $scope.stayValue;
        }

        $http.get('/roomRates/search/getReservationCost?roomNo='+selectedRoom.roomNo +'&startDate=' +$filter('date')(newReservationService.getStartDate(),'yyyy-MM-dd')+'&endDate='+$filter('date')(newReservationService.getEndDate(),'yyyy-MM-dd')).
            success(function (data) {
                if (data != undefined) {
                    $scope.stayValue = data;
                }
            })
            .finally(function() {
                 if(newReservationService.getBed()){
                     $http.get('configurations/search/findByName?name=dostawka').
                         success(function (data) {
                             if (data._embedded != undefined) {
                                 $scope.bedCost = parseFloat(data._embedded.configurations[0].confValue);
                                 $scope.stayValue = $scope.stayValue + (($scope.stayValue/$scope.selectedRoomType.space) * ($scope.bedCost/100));
                                 newReservationService.setBedCost($scope.bedCost);
                             }
                     })
                         .finally(function() {
                             prepareCost();
                         });
                 }
                else {
                     newReservationService.setBedCost(0);
                     prepareCost();
                 }
            });
    }

    $scope.doReservation = function(selectedPaymentType, reservationInfo) {
        var reservationStatus;
        $http.get('/dictReservationStatuses?status=nowa').
            success(function (data) {
                if (data != undefined) {
                    reservationStatus = data._embedded.dictReservationStatuses[0]._links.self.href;
                }
            })
            .finally(function() {
                $http.post('/roomsInReservations', {
                    bed: newReservationService.getBed(),
                    reservation: {
                        startDate: $filter('date')(newReservationService.getStartDate(), 'yyyy-MM-dd'),
                        endDate: $filter('date')(newReservationService.getEndDate(), 'yyyy-MM-dd'),
                        otherInfo: reservationInfo,
                        owner: newReservationService.getClientLink(),
                        stayPackage: newReservationService.getStayPackage()._links.self.href,
                        reservationStatus: reservationStatus,
                        paymentType: selectedPaymentType._links.self.href
                    },
                    room: newReservationService.getRoomNo()._links.self.href
                }).
                    success(function (data, status, headers) {
                        var rirNo = restResourceService.getObjectIdFromUrl(headers('Location'));
                        $http.get('/roomsInReservations/'+rirNo+'/reservation').
                            success(function (data) {
                                if (data != undefined) {
                                    $scope.reservationId = restResourceService.getObjectIdFromUrl(data._links.self.href);
                                }
                            });
                    });
            });
    }
    $scope.clients;
    $scope.findClients = function(pesel){
        $http.get('/clients/search/findByPeselStartingWith?pesel='+pesel).
            success(function (data) {
                if (data != undefined) {
                    $scope.clients = data._embedded.clients;
                }
            });
    }

    $scope.saveClient = function(client){
        newReservationService.setClient(client);
        newReservationService.setClientLink(client._links.self.href);
    }

    $scope.saveReservation = function(reservationId){
        var reservation ={
            reservationId: reservationId,
            startDate: newReservationService.getStartDate(),
            endDate: newReservationService.getEndDate()
        }
        findReservationService.setReservation(reservation);
    }
});