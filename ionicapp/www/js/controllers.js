angular.module('starter')

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
.controller('ListController',['$scope','$http','Speaker','SERVER_PATH',function($scope,$http,Speaker,SERVER_PATH){
  $scope.serverPath = SERVER_PATH;
      Speaker.all().success(function(speakers) {
        $scope.speakers = speakers;
      });

  $scope.moveItem = function(speaker,fromIndex,toIndex){
    $scope.speakers.splice(fromIndex, 1);
    $scope.speakers.splice(toIndex,0,speaker);
  };
  $scope.onItemDelete = function(speaker){
    $scope.speakers.splice($scope.speakers.indexOf(speaker),1);
  };
}]);
