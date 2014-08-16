(function () {

    function TaskTableController (scope) {
        this.tasks = [];

        scope.$on('addTask', function(event, data){
            this.tasks.push(data);
        });

    }

    angular.module('app', [])
        .controller('TaskTableController',['$scope', TaskTableController]);
}());
