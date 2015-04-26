app.controller('newProductController', function ($scope, $http, modalService) {
    $scope.modalService=modalService;
    $scope.selectedType;
    $scope.types = [
        'Produkt',
        'Usługa'
    ];
    $scope.isAvailable = false;

    $scope.save = function(type, name, description, price, isAvailable){
        $http.post(type == 'Produkt' ? '/products' : '/services', {
            name: name,
            description: description,
            price: price,
            available: isAvailable,
            type: type.name = "Dział Techniczny" ? "Zlecenie prac technicznych" : "Zlecenie na pokój"
        });
    }
});