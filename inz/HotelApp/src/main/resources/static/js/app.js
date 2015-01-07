var app = angular.module('hotelApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'spring-data-rest']);
app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './views/home.html'
        })
        .state('newReservation', {
            url: '/newReservation',
            templateUrl: './views/reservation/newReservation.html'
        })
        .state('newReservation.selectClient', {
            url: '/selectClient',
            templateUrl: './views/reservation/selectClient.html'
        })
        .state('newReservation.selectRoom', {
            url: '/selectRoom',
            templateUrl: './views/reservation/selectRoom.html'
        })
        .state('newReservation.specifyReservation', {
            url: '/specifyReservation',
            templateUrl: './views/reservation/specifyReservation.html'
        })
        .state('newReservation.summary', {
            url: '/summary',
            templateUrl: './views/reservation/summary.html'
        })
        .state('findReservation', {
            url: '/findReservation',
            templateUrl: './views/reservation/findReservation.html'
        })
        .state('reservationDetails', {
            url: '/reservationDetails',
            templateUrl: './views/reservation/reservationDetails.html'
        })
        .state('newRegistration', {
            url: '/newRegistration',
            templateUrl: './views/registration/newRegistration.html'
        })
        .state('endRegistration', {
            url: '/endRegistration',
            templateUrl: './views/registration/endRegistration.html'
        })
        .state('hotelOccupancy', {
            url: '/hotelOccupancy',
            templateUrl: './views/schedule/hotelOccupancy.html'
        })
        .state('roomOccupancy', {
            url: '/roomOccupancy',
            templateUrl: './views/schedule/roomOccupancy.html'
        })
        .state('findAvailableRoom', {
            url: '/findAvailableRoom',
            templateUrl: './views/schedule/findAvailableRoom.html'
        })
        .state('newClient', {
            url: '/newClient',
            templateUrl: './views/clients/newClient.html'
        })
        .state('home2', {
            url: '/',
            redirectTo: "/home"
        });

    $urlRouterProvider.otherwise('/else');

});