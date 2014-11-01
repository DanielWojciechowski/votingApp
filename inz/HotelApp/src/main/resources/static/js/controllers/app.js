var app = angular.module("hotelApp", ["ui.bootstrap"]);

app.controller("appCtrl", function ($scope) {
	$scope.hello="Hello World!";
});

app.controller('AlertDemoCtrl', function ($scope) {
	  $scope.alerts = [
	  ];

	  $scope.addAlert = function() {
	    $scope.alerts.push({msg: 'Dodałeś alert nr ' + $scope.alertNo});
	    $scope.alertNo = $scope.alertNo+1;
	  };
	  
	  $scope.alertNo = 1;

	  $scope.closeAlert = function(index) {
	    $scope.alerts.splice(index, 1);
	  };
	});

app.controller('CollapseDemoCtrl', function ($scope) {
	  $scope.isCollapsed = true;
	});

app.controller('dbTest', function ($scope, $http){
	var urlBase="";
	$scope.roomNumb;
	$scope.findRoom = function() {
		if($scope.roomNumb != null && $scope.roomNumb != ""){
	        $http.get(urlBase + '/rooms/search/findByRoomNoStartingWith?roomNo=' + $scope.roomNumb).
	            success(function (data) {
	                if (data._embedded != undefined) {
	                    $scope.rooms = data._embedded.rooms;
	                } else {
	                    $scope.rooms = [];
	                }
	            });
		}
		else{
			$scope.rooms = [];
		}
    }
	$scope.findRoom;
	
	
});