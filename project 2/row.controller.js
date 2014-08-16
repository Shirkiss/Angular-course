(function () {

    function RowController (scope) {
        // catch addTask event
        scope.$on('addTask', addTaskEvent);

        function addTaskEvent (event, data) {

            // broadcast the events to the children's
            scope.$broadcast('addTaskEvent', data);
        }

        // catch addLog event
        scope.$on('addLog', addLogEvent);

        function addLogEvent (event, data) {

            // broadcast the events to the children's
            scope.$broadcast('addLogEvent', data);
        }

        // catch deleteLogs event
        scope.$on('deleteLogs', deleteLogsEvent);

        function deleteLogsEvent () {

            // broadcast the events to the children's
            scope.$broadcast('deleteLogsEvent');
        }

        // catch hideComplete event
        scope.$on('hideComplete', hideCompleteEvent);

        function hideCompleteEvent() {

            // broadcast the events to the children's
            scope.$broadcast('hideCompleteEvent');
        }

        // catch editTask event

        scope.$on('editTask', editTaskEvent);
        function editTaskEvent (event, data) {
            // broadcast the events to the children's
            scope.$broadcast('editTaskEvent', data);
        }

    }

    angular.module('app', [])
        .controller('RowController',['$scope', RowController]);
}());