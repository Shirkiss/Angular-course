(function () {

    function ActionBarController (scope) {
        this.deleteItem = function () {
            scope.$emit('deleteLogs');
        };
        this.hide = function () {
            scope.$emit('hideComplete');
        }
    }

    angular.module('app')
        .controller('ActionBarController', ['$scope', ActionBarController]);
}());
