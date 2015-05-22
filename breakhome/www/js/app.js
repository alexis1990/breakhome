// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngRoute'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        // Initialize a new promise
        var deferred = $q.defer();

        // Make an AJAX call to check if the user is logged in
        $http.get('http://localhost:8100/loggedin').success(function(user) {
            // Authenticated
            if (user !== '0')
                $timeout(deferred.resolve, 0);

            // Not Authenticated
            else {
                $rootScope.message = 'You need to log in.';
                $timeout(function() {
                    deferred.reject();
                }, 0);
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    //================================================

    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: "/search",
        views: {
            'menuContent': {
                templateUrl: "templates/search.html"
            }
        }
    })

    .state('app.browse', {
        url: "/browse",
        views: {
            'menuContent': {
                templateUrl: "templates/browse.html"
            }
        }
    })

    .state('app.playlists', {
        url: "/playlists",
        views: {
            'menuContent': {
                templateUrl: "templates/playlists.html",
                controller: 'PlaylistsCtrl'
            }
        },
        resolve: {
            loggedin: checkLoggedin
        }

    })

    .state('app.single', {
        url: "/playlists/:playlistId",
        views: {
            'menuContent': {
                templateUrl: "templates/playlist.html",
                controller: 'PlaylistCtrl'
            }
        }
    })

    .state('app.product', {
        url: "/product/:productName",
        views: {
            'menuContent': {
                templateUrl: "templates/product.html",
                controller: 'ProductCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/search');

});