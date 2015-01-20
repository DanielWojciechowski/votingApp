app.controller('newTaskController', function ($scope, $http, modalService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";

    $scope.modalService=modalService;
    $scope.selectedDepartment;
    $http.get('/dictDepartments/search/findDepartmentsForOrder').
        success(function (data) {
            if (data._embedded != undefined) {
                $scope.departments = data._embedded.dictDepartments;
            }
        });
    $scope.save = function(name, description, type){
        $http.post('/orders', {
            name: name,
            description: description,
            type: type.name = "Dział Techniczny" ? "Zlecenie prac technicznych" : "Zlecenie na pokój"
        });
    }
});