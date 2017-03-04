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
			templateUrl: '/styleguide/partials/' + e.toLowerCase(),
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHNzQXBwID0gYW5ndWxhci5tb2R1bGUoJ3NzQXBwJywgWyd1aS5yb3V0ZXInLCAnbmdBbmltYXRlJ10pO1xuXG5zc0FwcC5jb25maWcoZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIsICRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblx0JGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuXHR2YXIgcGFnZXMgPSBbXTtcblx0bWVudS5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcblx0XHRlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpe1xuXHRcdFx0cGFnZXMucHVzaChlLm5hbWUgKyAnLycgKyBjaGlsZCk7XG5cdFx0fSk7XG5cdH0pO1xuXHRhbmd1bGFyLmZvckVhY2gocGFnZXMsIGZ1bmN0aW9uKGUpe1xuXHRcdCRzdGF0ZVByb3ZpZGVyXG5cdFx0LnN0YXRlKGUuc3BsaXQoJy8nKVsxXS50b0xvd2VyQ2FzZSgpLCB7XG5cdFx0XHR1cmw6ICcvJyArIGUudG9Mb3dlckNhc2UoKSxcblx0XHRcdHRlbXBsYXRlVXJsOiAnL3N0eWxlZ3VpZGUvcGFydGlhbHMvJyArIGUudG9Mb3dlckNhc2UoKSxcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuXHRcdFx0XHRoaWdobGlnaHRDb2RlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvb3ZlcnZpZXcvaW50cm9kdWN0aW9uJyk7XG59KTtcblxuXG5cbnNzQXBwLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cdCRzY29wZS5tZW51ID0gbWVudTtcblx0JHNjb3BlLm1lbnVJdGVtcyA9IG1lbnVJdGVtcztcblx0JHNjb3BlLnRlc3RGdW5jdGlvbiA9IGZ1bmN0aW9uKCl7XG5cdFx0Y29uc29sZS5sb2coJ3Rlc3QnKTtcblx0fTtcbn0pO1xuXG5cblxuZnVuY3Rpb24gaGlnaGxpZ2h0Q29kZSgpIHtcblx0Ly8gJCgncHJlLnNtLWNvZGUnKS5lYWNoKGZ1bmN0aW9uKGksIGJsb2NrKSB7XG5cdC8vIFx0aGxqcy5oaWdobGlnaHRCbG9jayhibG9jayk7XG5cdC8vIH0pO1xufVxuIl19
