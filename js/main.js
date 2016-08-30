var ssApp = angular.module('ssApp', ['ui.router', 'ngAnimate']);

ssApp.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);
	var pages = [];
	menu.forEach(function(e) {
		e.children.forEach(function(child){
			pages.push(e.name + '/' + child);
		});
	});
	angular.forEach(pages, function(e){
		$stateProvider
		.state(e.split('/')[1].toLowerCase(), {
			url: '/' + e.toLowerCase(),
			templateUrl: 'partials/' + e.toLowerCase(),
			controller: function($scope) {
				highlightCode();
			}
		});
	});
	$urlRouterProvider.otherwise('/overview/introduction');
});



ssApp.controller('MainController', function($scope) {
	$scope.menu = menu;
	$scope.menuItems = menuItems;
	$scope.testFunction = function(){
		console.log('test');
	};
});



function highlightCode() {
	// $('pre.sm-code').each(function(i, block) {
	// 	hljs.highlightBlock(block);
	// });
}
