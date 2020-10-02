(function () {
    'use strict';
    angular.module('example', []);
})();

(function () {
    'use strict';

    angular.module('example').controller('MainCtrl', function($http) {
        let vm = this,
            addressCollection = [],
            isEditing = false;

        // functions that are not attached to the view model
            let add = function () {
                let isValiForSaving = false;
                for (let propertyName in vm.person) {
                    if (vm.person[propertyName].length > 0) {
                        isValiForSaving = true;
                    }
                }

                if (isValiForSaving) {
                    let newPerson = {};

                    if (!angular.equals({}, vm.person)) {
                        if (isEditing !== false) {
                            addressCollection[isEditing] = vm.person;
                            isEditing = false;
                        } else {
                            newPerson = vm.person;

                            $http({
                                url: 'http://127.0.0.1:8081/api/v2/users',
                                method: "POST",
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Content-Type": "application/json"
                                },
                                data: newPerson
                            })
                                .then(function (response) {
                                        console.log(response);
                                        addressCollection.push(response.data);
                                    },
                                    function (response) { // optional
                                        console.log(response);
                                    });
                        }

                        vm.addresses = addressCollection;
                        vm.person = {};
                    }
                }
            },
            edit = function (editPerson) {
                isEditing = addressCollection.indexOf(editPerson);
                vm.person = angular.copy(editPerson);
            },
            remove = function (removePerson) {

                $http({
                    url: 'http://127.0.0.1:8081/api/v2/users/' + removePerson.id,
                    method: "DELETE",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                })
                    .then(function (response) {
                            console.log(response);
                            let index = addressCollection.indexOf(removePerson);
                            addressCollection.splice(index, 1);
                            if (addressCollection.length === 0) {
                                vm.person = {};
                                vm.addresses = undefined;
                            }
                        },
                        function (response) { // optional
                            console.log(response);
                        });
            },
            reset = function () {
                vm.person = {};
                vm.search = '';
                isEditing = false;
            };

        // view model attached click handlers
        vm.addClickHandler = function () {
            add();
        };

        vm.editClickHandler = function (editPerson) {
            edit(editPerson);
        };

        vm.removeClickHandler = function (removePerson) {
            remove(removePerson);
        };

        vm.resetClickHandler = function () {
            reset();
        };
    })
})();
