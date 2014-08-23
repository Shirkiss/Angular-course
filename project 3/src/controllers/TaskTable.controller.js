(function () {

    function TaskTableController(scope) {

        this.removeTask = function (task) {
            scope.taskAppState.taskList.splice(scope.taskAppState.taskList.indexOf(task), 1);
            scope.$emit('TaskAppEvent','LogEvent:userAction','Task been removed');
            localStorage.setItem('taskList', JSON.stringify(scope.taskAppState.taskList));

        };

        this.editTask = function (task) {
            scope.taskAppState.activeTask = scope.taskAppState.
            taskList[scope.taskAppState.taskList.indexOf(task)];
            localStorage.setItem('taskList', JSON.stringify(scope.taskAppState.taskList));

        };

        this.check = function(task){
            if (task.completed == false) {
                scope.$emit('TaskAppEvent','LogEvent:userAction', 'task completed');
            } else {
                scope.$emit('TaskAppEvent','LogEvent:userAction', 'task re-opened');

            }
        }
    }

    angular.module('TaskManager')
        .controller('TaskTableController', ['$scope',TaskTableController]);

}());