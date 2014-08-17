(function () {

    function TaskFormController (scope) {

        this.task = {done : false};


        this.addTask = function () {
            scope.$emit('addTask', this.task);
            var time = Date.now();
            scope.$emit('addLog', {msg: "new task added", time: time});

            this.task = {}
         };

        scope.$on('editTaskEvent', function (event, data) {
            scope.taskForm.task = {
                title: data[0][data[1]].title,
                description: data[0][data[1]].description
            };
        });
        }

        angular.module('app')
            .controller('TaskFormController', ['$scope', TaskFormController]);
}());