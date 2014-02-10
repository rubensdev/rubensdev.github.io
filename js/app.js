angular.module('blogApp', ['ngSanitize'])

.controller('HomeController',['$scope','POSTS', function($scope,POSTS){
	$scope.currentPage = 0;
	$scope.pageSize = 4;	
	$scope.posts = POSTS;
	$scope.numberOfPages = function(){
		return Math.ceil($scope.posts.length/$scope.pageSize);
	};
}])

.filter('startFrom', function(){
	return function(input, start){
		start = +start;
		return input.slice(start);
	}
});
