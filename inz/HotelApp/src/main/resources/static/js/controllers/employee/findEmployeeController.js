app.controller('findEmployeeController', function ($scope, $http, $modal, $filter, i18nService, restResourceService, uiGridConstants, modalService) {
    i18nService.setCurrentLang('pl');
    $scope.modalService = modalService;
    $scope.format = 'yyyy-MM-dd';
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
            { name: 'Pensja', field: 'salary', width: '10%', filters: [{
                    condition: uiGridConstants.filter.GREATER_THAN,
                    placeholder: 'więcej niż'
                },
                {
                    condition: uiGridConstants.filter.LESS_THAN,
                    placeholder: 'mniej niż'
                }]},
            { name: 'E-mail', field: 'email', enableFiltering: false},
            { name: 'Telefon', field: 'phone', enableFiltering: false, width: '11%'},
            { name: 'Data zatrudnienia', field: 'employmentDate', enableFiltering: false, enableCellEdit: false}

        ],
        onRegisterApi: function( gridApi ) {
            $scope.grid1Api = gridApi;
        }
    };


    var prepareData = function (array) {
        angular.forEach(array, function (value, key) {
            value.id = restResourceService.getObjectIdFromUrl(value._links.self.href);
            $http.get('/dictDepartments/search/findEmployeeDepartment?id='+value.id).
                success(function (data) {
                    if (data._embedded != undefined) {
                        value.department = data._embedded.dictDepartments[0];
                    }
                });
            value.employmentDate = $filter('date')(value.employmentDate, $scope.format)
        });
    }

    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
            $http.put('/employees/' + rowEntity.id, {
                firstName: rowEntity.firstName,
                lastName: rowEntity.lastName,
                salary: rowEntity.salary,
                email: rowEntity.email,
                phone: rowEntity.phone,
                employmentDate: rowEntity.employmentDate,
                department: rowEntity.department._links.self.href
            });
        });
    };
});