(function () {

    function TaskFormController(scope) {

        this.addTask = function (task) {
            if (scope.taskAppState.taskList.indexOf(task) == -1) {
                scope.taskAppState.taskList.push({
                    title: task.title,
                    description: task.description,
                    completed: false
                });
                localStorage.setItem('taskList', JSON.stringify(scope.taskAppState.taskList));

                scope.$emit('TaskAppEvent', 'LogEvent:userAction', 'New Task Added!');
            } else {
                scope.$emit('TaskAppEvent', 'LogEvent:userAction', 'Task has been updated');
            }
            scope.taskAppState.activeTask = {};
        };
    }

    angular.module('TaskManager')
        .controller('TaskFormController', ['$scope', TaskFormController])

}());
