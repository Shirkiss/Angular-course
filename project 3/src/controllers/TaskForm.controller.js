(function () {

    function TaskFormController(scope) {

        // when a user click on addTask
        this.addTask = function (task) {
            // check if this task already exist
            if (scope.taskAppState.taskList.indexOf(task) == -1) {
                // add the task to the taskList
                scope.taskAppState.taskList.push({
                    title: task.title,
                    description: task.description,
                    completed: false
                });
                // add the task to the local storage also
                localStorage.setItem('taskList', JSON.stringify(scope.taskAppState.taskList));
                // raise a LogEvent:userAction to the parent
                scope.$emit('TaskAppEvent', 'LogEvent:userAction', 'New Task Added!');

            } else {
                // raise a LogEvent:userAction to the parent
                scope.$emit('TaskAppEvent', 'LogEvent:userAction', 'Task has been updated');
            }
            // clear the activeTask
            scope.taskAppState.activeTask = {};
        };
    }

    angular.module('TaskManager')
        .controller('TaskFormController', ['$scope', TaskFormController])

}());
