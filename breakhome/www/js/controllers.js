angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function($scope, $http) {

    $http.get('js/products.json').success(function(data) {

        $scope.choices = [];
        angular.forEach(data, function(value, key) {

            $scope.choices.push(value);
            console.log(key);
            console.log(value);

        });

    });

})

.controller('RegisterCtrl', function($scope, $http) {
    $scope.register = function() {

        $http.post('http://localhost:8080/api/register', {
            username: $scope.username,
            password: $scope.password
        })
            .success(function(data) {
                $scope.myform = {};
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            }, {
                headers: {
                    'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
                }
            });
    };
})
    .controller('PlaylistCtrl', function($scope, $stateParams) {});