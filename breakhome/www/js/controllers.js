var app = angular.module('starter.controllers', [])

app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

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

    // Logout function is available in any pages
    $scope.logout = function() {
        $http.get('http://localhost:8100/logout');
    };
});

app.controller('PlaylistsCtrl', function($scope, $http, productFactory) {

  // Get datas Json
  productFactory.getProducts().then(function(data){
    $scope.choices = data.data;

    $scope.displayProduct = function(v){
      productFactory.productDisplay = v;
    }

  });


})

app.controller('RegisterCtrl', function($scope, $http) {
    $scope.register = function() {
        var username = $scope.username;
        var password = $scope.password;

        $http.post('http://localhost:8100/signup', {
            username: username,
            password: password
        }).
        success(function(data, status, headers, config) {

        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    };
})


app.controller('ProductCtrl', function($scope, $http, productFactory, $localstorage) {
  var factoryCheck = productFactory.productDisplay;
    $scope.product = factoryCheck;
  
  // Set product show page into local storage
  // If local storage is supported
  if($localstorage) {
    $scope.$watch(function() {
        return productFactory.productDisplay;
    }, function(newValue, oldValue) {
      console.log(newValue);
      // If object change
        if (newValue) {
          // Set values
            $localstorage.setObject('productToDisplay', {
              name: newValue.name,
              price: newValue.price
            });

        }
    }, true);
  }

  var factoryCheck = productFactory.productDisplay;
  // If product to display array is empty
  if(Array.isArray(factoryCheck)){
    $scope.product = $localstorage.getObject('productToDisplay');
  } else{
    $scope.product = factoryCheck;
  }

});







