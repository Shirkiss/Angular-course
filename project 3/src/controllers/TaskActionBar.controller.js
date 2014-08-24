(function () {

    function TaskActionBarController(scope) {
        // when a user want to hide/show the completed task
        this.toggleCompletedTask = function () {
            scope.taskAppState.hideCompleted = !scope.taskAppState.hideCompleted;
        };
        // when a user want to clear the TaskLog
        this.clearLog = function () {
            scope.$emit('TaskAppEvent','LogEvent:clearLog');
        };
    }


    angular.module('TaskManager')
        .controller('TaskActionBarController',['$scope', TaskActionBarController])

}());