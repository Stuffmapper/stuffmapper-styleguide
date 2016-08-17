var ssApp = angular.module('ssApp', ['ui.router', 'ngAnimate']);



ssApp.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);
	// $stateProvider
	// .state('introduction', {
	// 	url: '/introduction',
	// 	templateUrl: 'partials/introduction',
	// 	controller: function() {}
	// })
	// .state('buttons', {
	// 	url: '/buttons',
	// 	templateUrl: 'partials/buttons',
	// 	controller: function() {
	// 		highlightCode();
	// 	}
	// });
	var pages = [
		'introduction',
		'code-guidelines',
		'color-scheme',
		'typography',
		'animation',
		'border-radius',
		'box-shadow',
		'layout',
		'icon',
		'avatars',
		'buttons',
		'form-elements',
		'grid',
		'links',
		'lists',
		'modals',
		'popovers',
		'aspect-ratio',
		'center-elements',
		'hide-elements',
		'layouts',
		'text-manipulation'
	];
	angular.forEach(pages, function(e){
		console.log(e);
		$stateProvider
		.state(e, {
			url: '/'+e,
			templateUrl: 'partials/'+e,
			controller: function($scope) {
				highlightCode();
			}
		});
		console.log(e);
	});
	$urlRouterProvider.otherwise('/introduction');
});



ssApp.controller('MainController', function($scope) {

});



function highlightCode() {
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
}
