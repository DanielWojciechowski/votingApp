app.filter('true_false', function() {
    return function(text, length, end) {
        if (!text) {
            return 'Nie';
        }
        return 'Tak';
    }
});

app.controller('browseProductsController', function ($scope, $http, modalService, $filter, i18nService, restResourceService, uiGridConstants) {
    $scope.modalService = modalService;

    i18nService.setCurrentLang('pl');

    $http.get('/products').
        success(function (data) {
            if (data._embedded != undefined) {
                $scope.products = data._embedded.products;
                /*prepareData($scope.products);
                $scope.gridOptions.data = $scope.products;*/
            }
        }).finally(function(){
            $http.get('/services').
                success(function (data) {
                    if (data._embedded != undefined) {
                        $scope.products = $scope.products.concat(data._embedded.services);
                        prepareData($scope.products);
                        $scope.gridOptions.data = $scope.products;
                    }
                })
    });

    $scope.gridOptions = {
        enableSorting: true,
        enableFiltering: true,
        columnDefs: [
            { name:  'Id', field: 'id', enableCellEdit: false, width: '5%'},
            { name: 'Nazwa', field: 'name'},
            { name: 'Opis', field: 'description'},
            { name: 'Czy dostępny', field: 'isAvailable',
                cellTemplate: '<div class="ngCellText">{{row.getProperty(col.field) | true_false}}</div>'},
            { name: 'Cena', field: 'price', enableCellEdit: false}

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


    $scope.gridOptions.onRegisterApi = function(gridApi) {
        $scope.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            $http.put('/orders/'+rowEntity.id,{
                name: rowEntity.name,
                description: rowEntity.description,
                type: rowEntity.type
            });
        });
    };

});