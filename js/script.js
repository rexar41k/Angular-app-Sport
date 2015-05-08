(function(angular) {
	var App = angular.module('app', ['ngRoute']);

	App.config(['$routeProvider', function ($routeProvider) {

		$routeProvider
			.when('/',{
				templateUrl:'template/home.html',
				controller:'MainCtrl'
			})
			.when('/:Group/:Name',{
				templateUrl:'template/detail.html',
				controller:'DetailCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);

	App.controller('MainCtrl',['$scope','$http','$location', function ($scope, $http, $location) {

	  	$http.get('../json/grud.json').success(function(data, status, headers, config) {
	  		$scope.grudi = data;
	  	});

	  	$http.get('../json/nogi.json').success(function(data, status, headers, config) {
	  		$scope.nogi = data;
	  	});

	  	$http.get('../json/protein.json').success(function(data, status, headers, config) {
	  		$scope.protein = data;
	  	});

	  	$http.get('../json/geyner.json').success(function(data, status, headers, config) {
	  		$scope.geyner = data;
	  	});

	  	$http.get('../json/biceps.json').success(function(data, status, headers, config) {
	  		$scope.biceps = data;
	  	});

	  	$http.get('../json/amino.json').success(function(data, status, headers, config) {
	  		$scope.amino = data;
	  	});

	}]);

	App.controller('TimeCtrl', function ($scope, $timeout) {
		$scope.today = new Date(); //today

	    $scope.clock = "Ждем часы..."; // initialise the time variable
	    $scope.tickInterval = 1000;//ms

	    var tick = function() {
	        $scope.clock = Date.now();// get the current time
	        $timeout(tick, $scope.tickInterval); // reset the timer
	    };

	    // Start the timer
	    $timeout(tick, $scope.tickInterval);
	});

	App.controller('DetailCtrl',['$scope','$location','$routeParams', '$filter',
		function ($scope, $location, $routeParams, $filter) {

			var uri;
			switch($routeParams.Group) {
				   case 'grudi':
				      uri = $scope.grudi;
				      break;

				   case 'nogi':
				      uri = $scope.nogi;
				      break;

				   case 'biceps':
				      uri = $scope.biceps;
				      break;

				   case 'protein':
				      uri = $scope.protein;
				      break;

				   case 'geyner':
				      uri = $scope.geyner;
				      break;

				   case 'amino':
				      uri = $scope.amino;
				      break;
			}

			$scope.result = $filter('filter')(uri, {url:$routeParams.Name})[0];
	}]);

	App.directive('youtube', function() {
	  return {
	    restrict: 'EA',
	    scope: { code:'@code' },
	    template: '<object id="object-post" width="600" height="400" data="http://www.youtube.com/v/{{code}}" type="application/x-shockwave-flash"></object>'
	  };
	});

	App.controller('SelectionCtrl', ['$scope', function($scope) {
	    $scope.items = ['Упражнения', 'Питания'];
	    $scope.selection = $scope.items[0];
  	}]);
  	
})(window.angular);