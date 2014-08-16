(function () {

    function RowController (scope) {
        // catch an event
        scope.$on('addTask', ProcessEvent);

        function ProcessEvent (event, data) {

            // broadcast the events to the children's
            console.log(data);
            console.log(event);
        }
    }

    angular.module('app', [])
        .controller('RowController',['$scope', RowController]);
}());