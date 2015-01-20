module.exports.reservationCost = function ($httpBackend) {
    var selectedRoom = {
        "roomNo" : "3",
        "_links" : {
            "self" : {
                "href" : "http://localhost:8080/rooms/237"
            },
            "roomType" : {
                "href" : "http://localhost:8080/rooms/237/roomType"
            }
        }
    }
    $httpBackend.whenGET('/roomRates/search/getReservationCost?roomNo=3').respond(selectedRoom);
};
