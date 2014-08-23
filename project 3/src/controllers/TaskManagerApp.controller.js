(function () {

    function TaskManagerAppController(scope) {

        scope.taskAppState = {
            taskList : (localStorage.getItem('taskList')!==null) ? JSON.parse(localStorage.getItem('taskList')) : [],
            activeTask: {},
            hideCompleted: false
        };
        localStorage.setItem('taskList', JSON.stringify(scope.taskAppState.taskList));


        scope.managerView = {hideBar: false};
        scope.toggleBar = function() {
              scope.managerView.hideBar = !scope.managerView.hideBar
        };

        scope.$on('TaskAppEvent', function (event, type, data) {
            scope.$broadcast(type, data);
        })
    }

    angular.module('TaskManager')
        .controller('TaskManagerAppController', ['$scope', TaskManagerAppController])

}());