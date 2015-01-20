app.filter('true_false', function() {
    return function(text, length, end) {
        if (!text) {
            return 'Nie';
        }
        return 'Tak';
    }
});

app.controller('browseTasksController', function ($scope, $http, modalService, $filter, i18nService, restResourceService, uiGridConstants) {
    $scope.modalService = modalService;

    i18nService.setCurrentLang('pl');

    $http.get('/orders').
        success(function (data) {
            if (data._embedded != undefined) {
                $scope.orders = data._embedded.orders;
                prepareData($scope.orders);
                $scope.gridOptions.data = $scope.orders;
            }
        });

    $scope.gridOptions = {
        enableSorting: true,
        enableFiltering: true,
        columnDefs: [
            { name:  'Id', field: 'id', enableCellEdit: false, width: '5%'},
            { name: 'Temat', field: 'name'},
            { name: 'Opis', field: 'description'},
            { name: 'Czy wykonane', field: 'done',
                cellTemplate: '<div class="ngCellText">{{row.getProperty(col.field) | true_false}}</div>'},
            { name: 'Typ zadania', field: 'type', enableCellEdit: false}

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