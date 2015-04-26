app.controller('newEmployeeController', function ($scope, $http, modalService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $scope.modalService=modalService;

    $scope.clearText = 'Wyczyść';
    $scope.closeText = 'Zamknij';
    $scope.currentText = 'Dziś';
    $scope.format = 'dd.MM.yyyy';
    $scope.openDatePicker = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedEnd = !$scope.openedEnd;

    };

    $scope.selectedDepartment;
    $http.get('/dictDepartments/').
        success(function (data) {
            if (data._embedded != undefined) {
                $scope.departments = data._embedded.dictDepartments;
            }
        });

    $scope.save = function(employee){
        employee.department = employee.department._links.self.href;
        $http.post('/employees', employee);
    }
});