(function () {

    function TaskActionBarController(scope) {

        this.toggleCompletedTask = function () {
            scope.taskAppState.hideCompleted = !scope.taskAppState.hideCompleted;
        };

        this.clearLog = function () {
            scope.$emit('TaskAppEvent','LogEvent:clearLog');
        };
    }


    angular.module('TaskManager')
        .controller('TaskActionBarController',['$scope', TaskActionBarController])

}());