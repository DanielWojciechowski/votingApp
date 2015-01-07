'use strict';
app.controller('newClientController', function ($scope, $http, $filter, newReservationService) {

    $scope.clientInput=
    {
        firstName :null,
        lastName :null,
        email :null,
        idNumber :null,
        phoneNumber :null,
        sex :null,
        preferences :null,
        pesel :null,
        countries :null,
        selectedCountry :null,
        idTypes :null,
        selectedIdType :null
    }

    $scope.findCountriesAndIdTypes = function() {
        $http.get('/dictCountries').
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.clientInput.countries = data._embedded.dictCountries;
                }
            });
        $http.get('/dictIdTypes').
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.clientInput.idTypes = data._embedded.dictIdTypes;
                }
            });
    }
    $scope.findCountriesAndIdTypes();

    $scope.saveClient = function(clientInput){
        clientInput.country = clientInput.selectedCountry._links.self.href;
        clientInput.idType = clientInput.selectedIdType._links.self.href;

        $http.post('/clients', clientInput
        ).
            success(function (data, status, headers) {
                newReservationService.setClient(clientInput);
                newReservationService.setClientLink(headers('Location'));
            });
    }

});