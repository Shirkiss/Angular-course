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