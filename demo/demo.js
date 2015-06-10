var app = angular.module('demo', ['textualLoader']);

app.controller('MainController', function($scope, $timeout) {
  var vm = this;

  vm.loading = true;

  $timeout(function() {
    console.log('stop from controller');
    vm.loading = false;
  }, 5000);

    $timeout(function() {
    console.log('start from controller');
    vm.loading = true;
  }, 10000);

});
