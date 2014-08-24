(function () {
    angular.module('TaskManager', [])
}());
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

(function () {

    function TaskLogController(scope) {

        this.eventsLog = [];
        // after getting the LogEvent, adding it to the eventLog
        this.logTaskEvent = function (event, type) {
            this.eventsLog.push({
                timeStamp: new Date(),
                logMsg: type
            });
        }.bind(this);

        // after getting the clear event, clearing the eventLog list
        this.clearLog = function () {
            this.eventsLog = [];
        }.bind(this);

        //catching the events from the parent
        scope.$on('LogEvent:userAction', this.logTaskEvent);
        scope.$on('LogEvent:clearLog', this.clearLog);
    }

    angular.module('TaskManager')
        .controller('TaskLogController', ['$scope', TaskLogController]);

}());
(function () {

    function TaskManagerAppController(scope) {
        // checking if there is a taskList in the LocalStorage and bring it if there is one
        scope.taskAppState = {
            taskList : (localStorage.getItem('taskList')!==null) ? JSON.parse(localStorage.getItem('taskList')) : [],
            activeTask: {},
            hideCompleted: false
        };
        // update the LocalStorage (create taskList if there isn't yet).
        localStorage.setItem('taskList', JSON.stringify(scope.taskAppState.taskList));

        // hide/show the main bar
        scope.managerView = {hideBar: false};
        scope.toggleBar = function() {
              scope.managerView.hideBar = !scope.managerView.hideBar
        };
        // catch from children and move to the TaskLog child
        scope.$on('TaskAppEvent', function (event, type, data) {
            scope.$broadcast(type, data);
        })
    }

    angular.module('TaskManager')
        .controller('TaskManagerAppController', ['$scope', TaskManagerAppController])

}());
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