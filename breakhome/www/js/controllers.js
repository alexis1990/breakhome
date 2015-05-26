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

app.controller('PlaylistsCtrl', function($scope, $http, productFactory, $ionicModal) {

    var paris = new google.maps.LatLng(48.8534100, 2.3488000);

    var mapOptions = {
        zoom: 12,
        center: paris,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            var infowindow = new google.maps.Marker({
                setMap: $scope.map,
                position: pos,
                content: 'Location found using HTML5.'
            });

            $scope.map.setCenter(pos);


        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }


    var createMarker = function(info) {
        console.log(info);
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.location.lat, info.location.lng),
            title: info.name,
            adress: info.location.address
        });
        marker.content = '<div class="infoWindowContent">' + info.name + '</div>';

        google.maps.event.addListener(marker, 'click', function() {
            // infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.adress);
            // infoWindow.open($scope.map, marker);
            console.log(this.title);
            $scope.syna.show();
        });
        $scope.markers.push(marker);

    }

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/paymentmodal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.syna = modal;
    });

    $scope.closeModalSyna = function() {
        $scope.syna.hide();
    };


    // $scope.openInfoWindow = function(e, selectedMarker) {
    //     e.preventDefault();
    //     google.maps.event.trigger(selectedMarker, 'click');
    // }
    // Get Synagogues Foursquare
    productFactory.getSyna().then(function(data) {
        for (var i = 0; i < data.data.response.venues.length; i++) {
            createMarker(data.data.response.venues[i]);
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
    if ($localstorage) {
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
    if (Array.isArray(factoryCheck)) {
        $scope.product = $localstorage.getObject('productToDisplay');
    } else {
        $scope.product = factoryCheck;
    }

});