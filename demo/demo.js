var app = angular.module('demo', ['textualLoader']);

app.controller('MainController', function($scope, $timeout) {
  var vm = this;

  vm.exmple1 = {
    loading: false
  };
 
  $timeout(function() {
    console.log('stop from controller');
    vm.example1.loading = false;
  }, 5000);

    $timeout(function() {
    console.log('start from controller');
    vm.example1.loading = true;
  }, 10000);

});
