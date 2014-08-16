(function () {

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

        }.bind(this));
    }

    angular.module('app')
        .controller('TaskTableController',['$scope', TaskTableController]);
}());
