var postsApp = angular.module('blogApp', ['ngSanitize']);

postsApp.controller('PostsListCtrl', function($scope){
	/*$scope.posts = [{% for post in site.posts %} { 'title' : '{{ post.title }}', 'url' : '{{ post.url }}',
	'day_month' : '{{ post.date | date: "%d %b" }}', 'year' : '{{ post.date | date: "%Y" }}',
	'content' : '{{ post.content | strip_html | strip_newlines | truncate : 120 }} <a href="{{post.url}}">Read More</a>'}, {% endfor %}];*/
	$scope.posts = postsApp.posts;
	$scope.hello = "Hello world!";
});
