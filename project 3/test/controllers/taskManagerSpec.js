describe('unit: taskManagerApp controller', function(){

    var scope, ctrl;
    // get the module that contain the controller
    beforeEach(module('taskApp'));

    // inject the $controller and the rootScope
    beforeEach(inject(function ($rootScope, $controller) {
            // create a fresh new scope for the controller
            scope = $rootScope.$new();
            // create a controller with this scope
            ctrl = $controller('taskManagerAppController',{$scope: scope});
        }));

    it('init model names task', function(){
        expect(scope.task).toBeDefined()
    })

});