app.controller('roomOccupancyController', function ($scope, $http, $compile, uiCalendarConfig, restResourceService) {
    $scope.eventArray = [];
    $scope.download = function(id){
        $http.get('/roomsInReservations/search/findByRoomId?id='+id).
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.reservations = data._embedded.roomsInReservations;
                    prepareEvents();
                }
            });
    }

    var prepareEvents = function(){
        angular.forEach($scope.reservations, function (value, key) {
            $scope.eventArray.push({allDay:true, title: 'Rezerwacja', start: value.reservation.startDate, end: value.reservation.endDate})
        });
    }

    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: 'title',
                center: '',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender
        }
    };
    $scope.uiConfig.calendar.dayNames = ["Niedziela", "Poniedziałek", "Wtorek", "Sroda", "Czwartek", "Piątek", "Sobota"];
    $scope.uiConfig.calendar.dayNamesShort = ["Nd", "Po", "Wt", "Sr", "Cz", "Pt", "So"];

    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
        $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
            'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
        if(uiCalendarConfig.calendars[calendar]){
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
    };

    $scope.reservationEvents = [$scope.eventArray];

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

    $scope.changeView = function(calendarView, selectedRoom){
        $scope.calendarView = !calendarView;
        $scope.download(restResourceService.getObjectIdFromUrl(selectedRoom._links.self.href));
    }
});