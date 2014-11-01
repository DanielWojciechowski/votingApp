var app = angular.module('hotelApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);
app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "./views/home.html"
    });
    $routeProvider.when("/newRegistration", {
        controller: "newRegistrationController",
        templateUrl: "./views/registration/newRegistration.html"

    });
    $routeProvider.when("/findRegistration", {
        controller: "findRegistrationController",
        templateUrl: "./views/registration/findRegistration.html"
    });

    $routeProvider.when("/", {
        redirectTo: "/home"
    });
    $routeProvider.otherwise({ redirectTo: "/else" });

});