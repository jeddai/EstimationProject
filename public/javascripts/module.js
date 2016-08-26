angular.module('estimation',[]);

angular.module('estimation').controller('mainCtrl', controller);

function controller($http) {
    var vm = this;

    vm.reload = reload;
    vm.addPerson = addPerson;
    vm.deletePerson = deletePerson;
    vm.getPublicationsForProfessor = getPublicationsForProfessor;
    vm.addPublication = addPublication;
    vm.clearPublications = clearPublications;
    vm.deletePublication = deletePublication;

    setupNewItems();

    function reload() {
        $http.get('/getPeople', { cache:false })
        .success(function(data) {
            vm.professors = data;
        });
        $http.get('/getPublications', { cache:false })
        .success(function(data) {
            vm.allPublications = data;
        });
        clearPublications();
    }

    reload();

    function setupNewItems() {
        vm.newPerson = {
            name : '',
            position : ''
        };

        vm.newPublication = {
            authors : '',
            title : '',
            conferenceName : '',
            conferenceLocation : '',
            year : ''
        };

        clearPublications();
    }

    function getPublicationsForProfessor(professor) {
        $http.post('/getPublicationsForProfessor', professor)
        .success(function(data) {
            vm.selectedProfessor = professor;
            vm.publications = data;
        });
    }

    function clearPublications() {
        vm.publications = null;
    }

    function deletePerson(user) {
        $http.post('/deletePerson', {
            "id" : user._id
        })
        .success(function(data) {
            reload();
        });
    }

    function addPerson() {
        if(!!vm.newPerson.name || !!vm.newPerson.position) {
            $http.post('/addperson', vm.newPerson)
            .success(function(data) {
                reload();
                setupNewItems();
            });
        }
    }

    function addPublication() {
        if(!!vm.newPublication.authors || !!vm.newPublication.title
        || !!vm.newPublication.year || !!vm.newPublication.conferenceLocation
        || !!vm.newPublication.conferenceName) {
            $http.post('/addpublication', vm.newPublication)
            .success(function(data) {
                reload();
                setupNewItems();
            });
        }
    }

    function deletePublication(pub) {
        $http.post('/deletePublication', {
            id : pub._id
        })
        .success(function(data){
            reload();
        });
    }
}