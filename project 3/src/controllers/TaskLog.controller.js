(function () {

    function TaskLogController(scope) {

        this.eventsLog = [];

        this.logTaskEvent = function (event, type) {
            this.eventsLog.push({
                timeStamp: new Date(),
                logMsg: type
            });
        }.bind(this);

        this.clearLog = function () {
            this.eventsLog = [];
        }.bind(this);

        scope.$on('LogEvent:userAction', this.logTaskEvent);
        scope.$on('LogEvent:clearLog', this.clearLog);
    }

    angular.module('TaskManager')
        .controller('TaskLogController', ['$scope', TaskLogController]);

}());