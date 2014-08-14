(function () {

    function TaskFormController (scope) {
        this.task = {
            title: '',
            description: ''
        };

        this.addTask = function() {
            scope.$emit('addTask', this.task);
        };
    }

    angular.module('app', [])
        .controller('TaskFormController', ['$scope', TaskFormController]);
}());