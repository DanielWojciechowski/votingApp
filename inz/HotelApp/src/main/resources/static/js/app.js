var app = angular.module('hotelApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'ui.grid', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.calendar']);
app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './views/home.html'
        })
        .state('new', {
            url: '/new',
            templateUrl: './views/new.html'
        })
        .state('results', {
            url: '/results',
            templateUrl: './views/results.html'
        });
    $urlRouterProvider.otherwise('/home');

});