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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlZ3VpZGUtZGlyZWN0aXZlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzdHlsZWd1aWRlLWRpcmVjdGl2ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29kZUNvdW50ZXIgPSAwO1xudmFyIHN0eWxlZ3VpZGVfZGlyZWN0aXZlcyA9IHtcblx0c3NEZW1vQ29udGFpbmVyIDoge1xuXHRcdHNjb3BlOntcblx0XHRcdGlkOiBcIkBcIixcblx0XHRcdHRpdGxlOiBcIkBcIixcblx0XHRcdGRlc2NyaXB0aW9uOiBcIkBcIlxuXHRcdH0sXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0fSxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblx0XHRcdGVsZW1lbnQub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRlbXBsYXRlOiBbXG5cdFx0XHQnPGRpdiBpZD1cInt7aWR9fVwiIGNsYXNzPVwicm93XCI+Jyxcblx0XHRcdCcgICAgPGgzIGNsYXNzPVwic3MtZGVtby10aXRsZVwiPnt7dGl0bGV9fTwvaDM+Jyxcblx0XHRcdCcgICAgPHAgY2xhc3M9XCJzcy1kZW1vLWRlc2NyaXB0aW9uXCI+e3tkZXNjcmlwdGlvbn19PC9wPicsXG5cdFx0XHQnICAgIDxkaXYgY2xhc3M9XCJzcy1kZW1vLWNvbnRhaW5lclwiIG5nLXRyYW5zY2x1ZGU+Jyxcblx0XHRcdCcgICAgPC9kaXY+Jyxcblx0XHRcdCc8L2Rpdj4nXG5cdFx0XS5qb2luKCdcXG4nKVxuXHR9LFxuXHRzc0RlbW9Db250YWluZXJVcHBlcjp7XG5cdFx0c2NvcGU6e30sXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7fSxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblx0XHRcdGVsZW1lbnQub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRlbXBsYXRlOltcblx0XHRcdCc8ZGl2IGNsYXM9XCJzcy1kZW1vLWNvbnRhaW5lci11cHBlclwiPicsXG5cdFx0XHQnICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBuZy10cmFuc2NsdWRlPicsXG5cdFx0XHQnICAgIDwvZGl2PicsXG5cdFx0XHQnPC9kaXY+J1xuXHRcdF0uam9pbignXFxuJylcblx0fSxcblx0c3NEZW1vQ29udGFpbmVyTG93ZXI6e1xuXHRcdHNjb3BlOnt9LFxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge30sXG5cdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cdFx0XHRzY29wZS5jb2RlQ291bnRlciA9IGNvZGVDb3VudGVyKys7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRobGpzLmhpZ2hsaWdodEJsb2NrKCQoJyNjb2RlLWNvdW50ZXItJytzY29wZS5jb2RlQ291bnRlcilbMF0pO1xuXHRcdFx0fSwwKTtcblx0XHRcdGVsZW1lbnQub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRlbXBsYXRlOic8cHJlIGlkPVwiY29kZS1jb3VudGVyLXt7Y29kZUNvdW50ZXJ9fVwiIGNsYXNzPVwic3MtZGVtby1jb250YWluZXItbG93ZXIgc20tY29kZSByb3dcIiBuZy10cmFuc2NsdWRlPjwvcHJlPidcblx0fVxufTtcblxuXG5PYmplY3Qua2V5cyhzdHlsZWd1aWRlX2RpcmVjdGl2ZXMpLmZvckVhY2goZnVuY3Rpb24oZSkge1xuXHRpZihzdHlsZWd1aWRlX2RpcmVjdGl2ZXNbZV0uaW5pdCkgc3R5bGVndWlkZV9kaXJlY3RpdmVzW2VdLmluaXQoKTtcblx0c3R5bGVndWlkZV9kaXJlY3RpdmVzW2VdLmluaXQgPSB1bmRlZmluZWQ7XG5cdHN0dWZmTWFwcC5kaXJlY3RpdmUoZSxbJyR0aW1lb3V0JywgZnVuY3Rpb24oJHRpbWVvdXQpIHtcblx0XHRzdHlsZWd1aWRlX2RpcmVjdGl2ZXNbZV0ucmVzdHJpY3QgPSBcIkVcIjtcblx0XHRzdHlsZWd1aWRlX2RpcmVjdGl2ZXNbZV0ucmVwbGFjZSA9IHRydWU7XG5cdFx0c3R5bGVndWlkZV9kaXJlY3RpdmVzW2VdLnRyYW5zY2x1ZGUgPSB0cnVlO1xuXHRcdHJldHVybiBzdHlsZWd1aWRlX2RpcmVjdGl2ZXNbZV07XG5cdH1dKTtcbn0pO1xuIl19
