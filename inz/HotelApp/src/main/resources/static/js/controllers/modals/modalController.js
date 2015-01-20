app.controller('modalController', function ($http, $scope, modalService, $modalInstance, modalHeader, modalType, hrefs, specificController) {
    $http.defaults.headers.post["Content-Type"] = "application/json";

    $scope.modalHeader=modalHeader;
    $scope.type=modalType;
    $scope.hrefs=hrefs;
    $scope.no = modalService.no($modalInstance);

    if(!!!specificController) {
        $scope.ok = modalService.ok($modalInstance);
    }
    else if(specificController == "reservationDetails"){
        $scope.ok = function(){
            $http.delete('/roomsInReservations/'+$scope.$parent.roomsInReservationId)
                .success(function (data){
                    $modalInstance.dismiss();
            });

        }

    }

});