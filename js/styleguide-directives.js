var codeCounter = 0;
var styleguide_directives = {
	ssDemoContainer : {
		scope:{
			id: "@",
			title: "@",
			description: "@"
		},
		init: function() {
		},
		link: function(scope, element, attrs) {
			element.on('$destroy', function() {
			});
		},
		template: [
			'<div id="{{id}}" class="row">',
			'    <h3 class="ss-demo-title">{{title}}</h3>',
			'    <p class="ss-demo-description">{{description}}</p>',
			'    <div class="ss-demo-container" ng-transclude>',
			'    </div>',
			'</div>'
		].join('\n')
	},
	ssDemoContainerUpper:{
		scope:{},
		init: function() {},
		link: function(scope, element, attrs) {
			element.on('$destroy', function() {
			});
		},
		template:[
			'<div clas="ss-demo-container-upper">',
			'    <div class="row" ng-transclude>',
			'    </div>',
			'</div>'
		].join('\n')
	},
	ssDemoContainerLower:{
		scope:{},
		init: function() {},
		link: function(scope, element, attrs) {
			scope.codeCounter = codeCounter++;
			setTimeout(function() {
				hljs.highlightBlock($('#code-counter-'+scope.codeCounter)[0]);
			},0);
			element.on('$destroy', function() {
			});
		},
		template:'<pre id="code-counter-{{codeCounter}}" class="ss-demo-container-lower sm-code row" ng-transclude></pre>'
	}
};


Object.keys(styleguide_directives).forEach(function(e) {
	if(styleguide_directives[e].init) styleguide_directives[e].init();
	styleguide_directives[e].init = undefined;
	stuffMapp.directive(e,['$timeout', function($timeout) {
		styleguide_directives[e].restrict = "E";
		styleguide_directives[e].replace = true;
		styleguide_directives[e].transclude = true;
		return styleguide_directives[e];
	}]);
});
