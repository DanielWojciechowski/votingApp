app.controller('findEmployeeController', function ($scope, $http, $modal, $filter, i18nService, restResourceService, uiGridConstants) {
    i18nService.setCurrentLang('pl');

    $http.get('/employees').
        success(function (data) {
            if (data._embedded != undefined) {
                $scope.employees = data._embedded.employees;
                prepareData($scope.employees);
                $scope.gridOptions.data = $scope.employees;
            }
        });

    $scope.gridOptions = {
        enableSorting: true,
        enableFiltering: true,
        columnDefs: [
            { name:  'Id', field: 'id', enableCellEdit: false, width: '5%'},
            { name: 'Imię', field: 'firstName', enableCellEdit: false},
            { name: 'Nazwisko', field: 'lastName', enableCellEdit: false},
            { name: 'Dział', field: 'department.name', enableCellEdit: false},
            { name: 'Pensja', field: 'salary', filters: [{
                    condition: uiGridConstants.filter.GREATER_THAN,
                    placeholder: 'więcej niż'
                },
                {
                    condition: uiGridConstants.filter.LESS_THAN,
                    placeholder: 'mniej niż'
                }]},
            { name: 'E-mail', field: 'email', enableFiltering: false},
            { name: 'Telefon', field: 'phone', enableFiltering: false, width: '11%'}

        ],
        onRegisterApi: function( gridApi ) {
            $scope.grid1Api = gridApi;
        }
    };


    var prepareData = function (array) {
        angular.forEach(array, function (value, key) {
            value.id = restResourceService.getObjectIdFromUrl(value._links.self.href);
        });
    }

    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: './views/modals/modal.html',
            controller: 'savePopupController',
            size: size
        });
    };
});