app.filter('true_false', function () {
    return function (boolValue) {
        if (boolValue === true)
            return "Tak";
        else
            return "Nie";
    }
});

app.controller('browseProductsController', function ($scope, $http, modalService, $filter, i18nService, restResourceService, uiGridConstants) {
    $scope.modalService = modalService;
    $scope.isProduct = true;
    i18nService.setCurrentLang('pl');

    $http.get('/products').
        success(function (data) {
            if (data._embedded != undefined) {
                $scope.products = data._embedded.products;
                prepareData($scope.products);
                $scope.gridOptions.data = $scope.products;
            }
        });

    $scope.gridOptions = {
        data: $scope.products,
        enableSorting: true,
        enableFiltering: true,
        columnDefs: [
            {name: 'Id', field: 'id', enableCellEdit: false, width: '5%', sort: {
                direction: uiGridConstants.ASC,
                priority: 1
            }},
            {name: 'Nazwa', field: 'name'},
            {name: 'Opis', field: 'description'},
            {name: 'Czy dostepny', field: 'available'/*, cellTemplate: '<div class="ngCellText">{{row.getProperty(col.field) | true_false}}</div>'*/},
            {name: 'Cena', field: 'price', filters: [{
                condition: uiGridConstants.filter.GREATER_THAN,
                placeholder: 'więcej niż'
            },
                {
                    condition: uiGridConstants.filter.LESS_THAN,
                    placeholder: 'mniej niż'
                }]}

        ],
        onRegisterApi: function (gridApi) {
            $scope.grid1Api = gridApi;
        }
    };
    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
            $http.put('/products/' + rowEntity.id, {
                name: rowEntity.name,
                description: rowEntity.description,
                available: rowEntity.available,
                price: rowEntity.price
            });
        });
    };



    $http.get('/services').
        success(function (data) {
            if (data._embedded != undefined) {
                $scope.services = data._embedded.services;
                prepareData($scope.services);
                $scope.gridOptions2.data = $scope.services;
            }
        });


    $scope.gridOptions2= {
        enableSorting: true,
        enableFiltering: true,
        columnDefs: [
            {name: 'Id', field: 'id', enableCellEdit: false, width: '5%', sort: {
                direction: uiGridConstants.ASC,
                priority: 1
            }},
            {name: 'Nazwa', field: 'name'},
            {name: 'Opis', field: 'description'},
            {
                name: 'Czy dostepny', field: 'available'
            },
            {name: 'Cena', field: 'price', filters: [{
                condition: uiGridConstants.filter.GREATER_THAN,
                placeholder: 'więcej niż'
            },
                {
                    condition: uiGridConstants.filter.LESS_THAN,
                    placeholder: 'mniej niż'
                }]}

        ],
        onRegisterApi: function (gridApi) {
            $scope.grid1Api = gridApi;
        }
    };


    $scope.gridOptions2.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
            $http.put('/services/' + rowEntity.id, {
                name: rowEntity.name,
                description: rowEntity.description,
                available: rowEntity.available,
                price: rowEntity.price
            });
        });
    };



    var prepareData = function (array) {
        angular.forEach(array, function (value, key) {
            value.id = restResourceService.getObjectIdFromUrl(value._links.self.href);
        });
    }

    $scope.updateProductFlag = function (flag) {
        $scope.isProduct = flag;
    }
});