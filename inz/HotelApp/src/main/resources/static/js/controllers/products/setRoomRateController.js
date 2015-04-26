app.controller('setRoomRateController', function ($scope, $http, modalService, restResourceService, i18nService, uiGridConstants, $filter) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $scope.modalService=modalService;
    $scope.today = new Date();
    $scope.clearText = 'Wyczyść';
    $scope.closeText = 'Zamknij';
    $scope.currentText = 'Dziś';
    $scope.format = 'yyyy-MM-dd';
    $scope.tableView = false;
    $scope.openDatePickerStart = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedStart = !$scope.openedStart;
    };
    $scope.openDatePickerEnd = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedEnd = !$scope.openedEnd;
    };

    $scope.selectedType = {};
    $http.get('/dictRoomTypes').
        success(function (data) {
            if (data._embedded != undefined) {
                $scope.roomTypes = data._embedded.dictRoomTypes;
            }
        });

    $scope.getRooms = function(selectedType) {
        $http.get('/rooms/search/findRoomByRoomTypeId?roomTypeId=' + restResourceService.getObjectIdFromUrl(selectedType._links.self.href)).
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.rooms = data._embedded.rooms;
                }
            });
    }

    $scope.changeView = function(tableView, selectedRoom, startDate, endDate){
        $scope.tableView = !tableView;
        $scope.roomId = selectedRoom._links.self.href;
        $scope.roomNo = selectedRoom.roomNo;
        $scope.refreshTable(startDate, endDate);
    }

    $scope.refreshTable = function(startDate, endDate){
        $http.get('roomRates/search/findRoomRateByRoomIdAndDateBetween?roomId='+
        restResourceService.getObjectIdFromUrl($scope.roomId) + '&startDate='+$filter('date')(startDate.getTime()- 86400000,'yyyy-MM-dd')+
        '&endDate='+$filter('date')(endDate,'yyyy-MM-dd')).
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.roomRates = data._embedded.roomRates;
                    prepareData($scope.roomRates);
                    $scope.gridOptions.data = $scope.roomRates;
                }
            });
    }

    //------------table
    i18nService.setCurrentLang('pl');

    $scope.gridOptions = {
        enableSorting: true,
        enableFiltering: true,
        columnDefs: [
            { name:  'Id', field: 'id', enableCellEdit: false, width: '5%', sort: {
                direction: uiGridConstants.ASC,
                priority: 1
            }},
            { name: 'Data', field: 'date', enableCellEdit: false},
            { name: 'Cena', field: 'price'}

        ],
        onRegisterApi: function( gridApi ) {
            $scope.grid1Api = gridApi;
        }
    };


    var prepareData = function (array) {
        angular.forEach(array, function (value, key) {
            value.id = restResourceService.getObjectIdFromUrl(value._links.self.href);
            value.date = $filter('date')(value.date, $scope.format)
        });
    }


    $scope.gridOptions.onRegisterApi = function(gridApi) {
        $scope.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            $http.put('/roomRates/'+rowEntity.id,{
                date: rowEntity.date,
                price: rowEntity.price,
                room: $scope.roomId
            });
        });
    };

    $scope.openDatePickernewDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedNewDate = !$scope.openedNewDate;
    };

    $scope.addNew = function(newDate, newRoomRate, startDate, endDate){
        $http.post('/roomRates', {
            date: newDate,
            price: newRoomRate,
            room: $scope.roomId
        }).
            success(function (data) {
            }).
            finally(function() {
                $scope.refreshTable(startDate, endDate);
                $scope.newDate = null;
                $scope.newRoomRate = null;
            });

    }




    /*
     .finally = function(){
     $scope.refreshTable(startDate, endDate);
     $scope.newDate = null;
     $scope.newRoomRate = null;
     };
     */

});