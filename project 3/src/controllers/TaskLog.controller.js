(function () {

    function TaskLogController(scope) {

        this.eventsLog = [];
        // after getting the LogEvent, adding it to the eventLog
        this.logTaskEvent = function (event, type) {
            this.eventsLog.push({
                timeStamp: new Date(),
                logMsg: type
            });
        }.bind(this);

        // after getting the clear event, clearing the eventLog list
        this.clearLog = function () {
            this.eventsLog = [];
        }.bind(this);

        //catching the events from the parent
        scope.$on('LogEvent:userAction', this.logTaskEvent);
        scope.$on('LogEvent:clearLog', this.clearLog);
    }

    angular.module('TaskManager')
        .controller('TaskLogController', ['$scope', TaskLogController]);

}());