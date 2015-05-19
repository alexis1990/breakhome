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

.controller('PlaylistsCtrl', function($scope, $http, localStorageService) {

  $scope.basket = [];
  $scope.choices = [];

  $http.get('js/products.json').success(function(data) {
    angular.forEach(data, function(value, key) {
      $scope.choices.push(value);
    });

    $scope.command = function(data) {
            // RECUPERER ICI LA DATA STOCKÉ DANS LE LOCAL STORAGE
            // if (localStorageService.isSupported) {
            //   console.log('ok');
            // }
            // if (typeof $scope.basket[0] !== 'undefined') {
            //   angular.forEach($scope.basket, function(value, key) {

            //     if($scope.basket[key] == data){
            //       console.log('exist');
            //       $scope.basket.push(data);
            
            //     }else{
            //       console.log($scope.basket);
            //       console.log('do not exist');

            //     }

            //   });
            // } else {
            //   $scope.basket.push(data);
            //   // console.log('first');
            //   // console.log($scope.basket);
            // }

          }

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