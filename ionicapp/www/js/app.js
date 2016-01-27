// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if (window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    cordova.plugins.Keyboard.disableScroll(true);

  }
  if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html',
        controller : 'ListController'
      }
    }
  })
  .state('app.sessions', {
    url: "/sessions",
    views: {
      'menuContent' :{
        templateUrl: "templates/sessions.html",
        controller: "SessionListCtrl"
      }
    }
  })

  .state('app.session', {
    url: "/sessions/:sessionId",
    views: {
      'menuContent' :{
        templateUrl: "templates/session.html",
        controller: "SessionCtrl"
      }
    }
  })
  .state('app.speakers', {
    url: "/speakers",
    views: {
      'menuContent' :{
        templateUrl: "templates/speakers.html",
        controller: "SpeakerListCtrl"
      }
    }
  })

  .state('app.speaker', {
    url: "/speakers/:speakerId",
    views: {
      'menuContent' :{
        templateUrl: "templates/speaker.html",
        controller: "SpeakerCtrl"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/browse');
})
.constant('SERVER_PATH','http://localhost:5000')
 // Services
 .factory('Speaker', function ($http, $rootScope, SERVER_PATH) {
  return {
    all: function() {
      return $http.get(SERVER_PATH + '/speakers');
    },
    get: function(speakerId) {
      return $http.get(SERVER_PATH + '/speakers/' + speakerId);
    }
  };
})
 .factory('Session', function ($resource) {
  return $resource('http://localhost:5000/sessions/:sessionId');
})
    //Controllers
    .controller('SpeakerListCtrl', function ($scope, Speaker, SERVER_PATH) {
      $scope.serverPath = SERVER_PATH;
      $scope.speakers = [];
      Speaker.all().success(function(speakers) {
        $scope.speakers = speakers;
      });
      $scope.doRefresh = function() {
        $scope.speakers = Speaker.all().success(function(speakers) {
          $scope.speakers = speakers;
          $scope.$broadcast('scroll.refreshComplete');
        });
      };
    })

    .controller('SpeakerCtrl', function ($scope, $stateParams, Speaker, SERVER_PATH) {
      $scope.serverPath = SERVER_PATH;
      Speaker.get($stateParams.speakerId).success(function(speaker) {
        $scope.speaker = speaker;
      });
    })

    .controller('SessionListCtrl', function ($scope, Session, SERVER_PATH) {
      $scope.serverPath = SERVER_PATH;
      $scope.sessions = Session.query();
    })

    .controller('SessionCtrl', function ($scope, $stateParams, Session, SERVER_PATH) {
      $scope.serverPath = SERVER_PATH;
      $scope.session = Session.get({sessionId: $stateParams.sessionId});
    });
