var app = angular.module('hotelApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);
app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "./views/home.html"
    });
    $routeProvider.when("/newReservation", {
        controller: "newReservationController",
        templateUrl: "./views/reservation/newReservation.html"

    });
    $routeProvider.when("/findReservation", {
        controller: "findReservationController",
        templateUrl: "./views/reservation/findReservation.html"
    });
    $routeProvider.when("/newRegistration", {
        controller: "newRegistrationController",
        templateUrl: "./views/registration/newRegistration.html"

    });
    $routeProvider.when("/endRegistration", {
        controller: "endRegistrationController",
        templateUrl: "./views/registration/endRegistration.html"
    });
    $routeProvider.when("/hotelOccupancy", {
        controller: "hotelOccupancyController",
        templateUrl: "./views/schedule/hotelOccupancy.html"
    });
    $routeProvider.when("/roomOccupancy", {
        controller: "roomOccupancyController",
        templateUrl: "./views/schedule/roomOccupancy.html"
    });
    $routeProvider.when("/findAvailableRoom", {
        controller: "findAvailableRoomController",
        templateUrl: "./views/schedule/findAvailableRoom.html"
    });
    $routeProvider.when("/", {
        redirectTo: "/home"
    });
    $routeProvider.otherwise({ redirectTo: "/else" });

});