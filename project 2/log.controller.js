(function () {

    function LogController (scope) {

        this.logs = [];

        // catch addLog event
        scope.$on('addLogEvent', function (event, data) {
            this.log = {
                time: data.time,
                msg: data.msg
            };
            //add event to tasks list
            this.logs.push(this.log);

        }.bind(this));

        // catch deleteLogs event
        scope.$on('deleteLogsEvent', function () {
            this.logs = [];

        }.bind(this));
    }

    angular.module('app')
        .controller('LogController', ['$scope', LogController]);
}());
