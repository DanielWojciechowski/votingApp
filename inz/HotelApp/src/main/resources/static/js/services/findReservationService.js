app.service('findReservationService', function () {
    var reservation;

    return {
        getReservation: function () {
            return reservation;
        },
        setReservation: function(value) {
            reservation = value;
        }
    };
});