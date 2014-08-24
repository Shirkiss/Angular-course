(function () {

    function TaskTableController(scope) {

        // remove task from taskList & LocalStorage
        this.removeTask = function (task) {
            scope.taskAppState.taskList.splice(scope.taskAppState.taskList.indexOf(task), 1);
            scope.$emit('TaskAppEvent','LogEvent:userAction','Task been removed');
            localStorage.setItem('taskList', JSON.stringify(scope.taskAppState.taskList));

        };

        // edit task and update in taskList & LocalStorage
        this.editTask = function (task) {
            scope.taskAppState.activeTask = scope.taskAppState.
            taskList[scope.taskAppState.taskList.indexOf(task)];
            localStorage.setItem('taskList', JSON.stringify(scope.taskAppState.taskList));

        };

        // sending LogEvent when task is complete/ re-opened
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