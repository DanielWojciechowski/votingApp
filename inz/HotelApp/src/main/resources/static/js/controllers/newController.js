'use strict';
app.controller('newController', function ($scope, $http, $filter) {
    $http.defaults.headers.post["Content-Type"] = "application/json";

    prepareModel();

    $scope.minDateStart = new Date();
    $scope.openDatePicker = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedEnd = !$scope.openedEnd;

    };

    $scope.addAnswer = function() {
        $scope.survey.answers.push($scope.newAnswer);
        $scope.newAnswer = null;
    };

    $scope.deleteAnswer = function (index) {
        $scope.survey.answers.splice(index, 1);
    };

    $scope.saveSurvey = function(){
        var survey = $scope.survey;
        survey.endDate.setHours($scope.endTime.getHours());
        survey.endDate.setMinutes($scope.endTime.getMinutes());

        var date = $scope.radio.model == $scope.radioModelButtons[0] ? '' : $filter('date')(survey.endDate, 'yyyy-MM-dd-HH-mm');
        $http.post('/surveys/add?question='+survey.question+ '&endDate='+date+ '&answers='+survey.answers);

        prepareModel();
    };

    function prepareModel() {
        $scope.endTime = new Date();

        $scope.radioModelButtons = ['Wszyscy zagłosowali', 'Upłynął czas'];
        $scope.radio = {model: $scope.radioModelButtons[0]};
        $scope.survey = {
            "question": null,
            "answers": [],
            "endDate": new Date()
        };
        $scope.newAnswer = null;
    }
});