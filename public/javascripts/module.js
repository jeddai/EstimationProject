angular.module('estimation',[]);

angular.module('estimation').controller('mainCtrl', controller);

function controller($http) {
    var vm = this;

    vm.reloadUsers = reloadUsers;
    vm.addUser = addUser;
    vm.addPub = addPub;

    setupNewPerson();

    function reloadUsers() {
        $http.get('/getUsers', { cache:false })
        .success(function(data) {
            vm.users = data;
        });
    }

    reloadUsers();

    function setupNewPerson() {
        vm.newPerson = {
            name : '',
            position : '',
            publications : [{
                authors : '',
                title : '',
                conferenceName : '',
                conferenceLocation : '',
                year : ''
            }]
        };
    }

    function addPub() {
        vm.newPerson.publications.push({
            authors : '',
            title : '',
            conferenceName : '',
            conferenceLocation : '',
            year : ''
        });
    }

    function addUser() {
        $http.post('/addperson', {
            "name": vm.newPerson.name,
            "position": vm.newPerson.position
        }).success(function(data) {
            reloadUsers();
            setupNewPerson();
        });
    }
}