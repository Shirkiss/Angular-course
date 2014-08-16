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

    function TaskTableController (scope) {
        this.tasks = [];


        // catch event from parent
        scope.$on('addTaskEvent', function (event, data) {
            this.task = {
                done: data.done,
                title: data.title,
                description: data.description
            };
            //add event to tasks list
            this.tasks.push(this.task);

            //remove event
            this.task.remove = function(task, tasks){
                if(confirm("Are you sure to delete this line?")){
                    var index = tasks.indexOf(task);
                    tasks.splice(index,1);
                    var time = Date.now();
                    scope.$emit('addLog', {msg: "task removed", time: time});
                }
            };

            //edit event
            this.task.edit = function(task, tasks){

                var index = tasks.indexOf(task);
                scope.$emit('editTask', [tasks, index]);
                tasks.splice(index,1);
            };

            this.task.status = function(task){
                var time = Date.now();
                if (task.done == false) {
                    scope.$emit('addLog', {msg: "task completed", time: time});
                } else {
                    scope.$emit('addLog', {msg: "task re-opened", time: time});

                }
            }

        }.bind(this));

        this.hide = false;
        // catch hideComplete event
        scope.$on('hideCompleteEvent', function () {
            this.hide = !this.hide;
            console.log(this.hide);

        }.bind(this));
    }

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

    function ActionBarController (scope) {
        this.deleteItem = function () {
            scope.$emit('deleteLogs');
        };
        this.hide = function () {
            scope.$emit('hideComplete');
        }
    }

    angular.module('app', [])
        .controller({
            'TaskFormController': ['$scope', TaskFormController],
            'RowController': ['$scope', RowController],
            'TaskTableController': ['$scope', TaskTableController],
            'LogController': ['$scope', LogController],
            'ActionBarController': ['$scope', ActionBarController]
        });

}());