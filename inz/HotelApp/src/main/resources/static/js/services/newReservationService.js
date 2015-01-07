app.service('newReservationService', function () {
    var startDate = new Date();
    var endDate = new Date();
    var roomNo;
    var stayPackage;
    var bed = false;
    var roomType;
    var cost = 0;
    var bedCost = 0;
    var days = 0;
    var client;
    var clientLink;
    var reservationId;

    return {
        getStartDate: function () {
            return startDate;
        },
        setStartDate: function(value) {
            startDate = value;
        },
        getEndDate: function () {
            return endDate;
        },
        setEndDate: function(value) {
            endDate = value;
        },
        getRoomNo: function () {
            return roomNo;
        },
        setRoomNo: function(value) {
            roomNo = value;
        },
        getStayPackage: function () {
            return stayPackage;
        },
        setStayPackage: function(value) {
            stayPackage = value;
        },
        getBed: function () {
            return bed;
        },
        setBed: function(value) {
            bed = value;
        },
        getRoomType: function () {
            return roomType;
        },
        setRoomType: function(value) {
            roomType = value;
        },
        getCost: function () {
            return cost;
        },
        setCost: function(value) {
            cost = value;
        },
        getBedCost: function () {
            return bedCost;
        },
        setBedCost: function(value) {
            bedCost = value;
        },
        getDays: function () {
            return days;
        },
        setDays: function(value) {
            days = value;
        },
        getClient: function () {
            return client;
        },
        setClient: function(value) {
            client = value;
        },
        getClientLink: function () {
            return clientLink;
        },
        setClientLink: function(value) {
            clientLink = value;
        },
        getReservationId: function () {
            return reservationId;
        },
        setReservationId: function(value) {
            reservationId = value;
        }
    };
});