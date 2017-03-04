var element_directives = {
	smInputGroupButton : {
		scope:{
			placeholder: "@",
			width: "@",
			faicon: "@",
			submit: "&"
		},
		init: function() {
			(function ($) {
				var originalVal = $.fn.val;
				$.fn.val = function(value) {
					if (arguments.length >= 1) {
						if(this[0].className.indexOf('sm-text-input-group') > -1) {
							return $(this[0]).children('.sm-text-input-container').children('input, textarea').val(value);
						}
					}
					else {
						if(this[0].className.indexOf('sm-text-input-group') > -1) {
							return $(this[0]).children('.sm-text-input-container').children('input, textarea').val();
						}
					}
					return originalVal.apply(this, arguments);
				};
			})(jQuery);
			(function($){
				var originalFocus = $.fn.focus;
				$.fn.focus = function(callback){
					if(typeof callback != 'undefined'){
						if(this[0].className.indexOf('sm-text-input-group') > -1) {
							return $(this[0]).children('.sm-text-input-container').children('input').focus(callback);
						}
					}
					originalFocus.apply( this, arguments );
				};
			})(jQuery);
		},
		link: function(scope, element, attrs) {
			scope.faicon = scope.faicon || 'arrow-right';
			var smInputGroupInput = $(element).children('.sm-text-input-container').children('input');
			var smInputGroupButton = $(element).children('.sm-text-input-button');
			var onFocus = function(e) {
				if(!smInputGroupButton.hasClass('sm-text-input-button-active')) {
					smInputGroupButton.addClass('sm-text-input-button-active');
					$(element).addClass('sm-text-input-group-active');
				}
			};
			var onBlur = function(e) {
				if(smInputGroupInput.val()) {
					if(!smInputGroupButton.hasClass('sm-text-input-button-active')) {
						smInputGroupButton.addClass('sm-text-input-button-active');
						$(element).addClass('sm-text-input-group-active');
					}
				}
				else {
					smInputGroupButton.removeClass('sm-text-input-button-active');
					$(element).removeClass('sm-text-input-group-active');
				}
			};
			var onClick = function(e) {
				smInputGroupInput.blur();
				//if(smInputGroupInput.val()) {
					scope.submit();
				//}
			};
			var onKeydown = function(e) {
				if(e.which === 27) smInputGroupInput.blur();
				else if(e.which === 13) onClick();
			};
			smInputGroupInput.on('focus',onFocus);
			smInputGroupInput.on('blur',onBlur);
			smInputGroupButton.on('click',onClick);
			smInputGroupInput.on('keydown',onKeydown);
			element.on('$destroy', function() {
				smInputGroupInput.off('focus',onFocus);
				smInputGroupInput.off('blur',onBlur);
				smInputGroupButton.off('click',onClick);
				smInputGroupInput.off('keydown',onKeydown);
			});
		},
		template: [
			'<div style="width:{{width}};" class="sm-text-input-group sm-text-input-group-m">',
			'    <div class="sm-text-input-container">',
			'        <input placeholder="{{placeholder}}" class="sm-text-input">',
			'    </div>',
			'    <div class="sm-text-input-button">',
			'        <div class="sm-text-input-button-border"></div>',
			'        <i class="sm-text-input-button-icon fa fa-{{faicon}}"></i>',
			'    </div>',
			'</div>',
		].join('\n')
	},
	smTextareaGroupButton : {
		scope:{
			placeholder: "@",
			width: "@",
			faicon: "@",
			submit: "&"
		},
		link: function(scope, element, attrs) {
			scope.faicon = scope.faicon || 'arrow-right';
			var smInputGroupInput = $(element).children('.sm-text-input-container').children('textarea');
			var smInputGroupButton = $(element).children('.sm-text-input-button');
			var onFocus = function(e) {
				if(!smInputGroupButton.hasClass('sm-text-input-button-active')) {
					smInputGroupButton.addClass('sm-text-input-button-active');
					$(element).addClass('sm-text-input-group-active');
				}
			};
			var onBlur = function(e) {
				if(smInputGroupInput.val()) {
					if(!smInputGroupButton.hasClass('sm-text-input-button-active')) {
						smInputGroupButton.addClass('sm-text-input-button-active');
						$(element).addClass('sm-text-input-group-active');
					}
				}
				else {
					smInputGroupButton.removeClass('sm-text-input-button-active');
					$(element).removeClass('sm-text-input-group-active');
				}
			};
			var onClick = function(e) {
				//smInputGroupInput.blur();
				if(smInputGroupInput.val()) {
					scope.submit();
				}
			};
			var onKeydown = function(e) {
				if(e.which === 27) smInputGroupInput.blur();
				else if(e.which === 13) onClick();
			};
			smInputGroupInput.on('focus',onFocus);
			smInputGroupInput.on('blur',onBlur);
			smInputGroupButton.on('click',onClick);
			smInputGroupInput.on('keydown',onKeydown);
			element.on('$destroy', function() {
				smInputGroupInput.off('focus',onFocus);
				smInputGroupInput.off('blur',onBlur);
				smInputGroupButton.off('click',onClick);
				smInputGroupInput.off('keydown',onKeydown);
			});
		},
		template: [
			'<div style="width:{{width}};" class="sm-text-input-group sm-text-input-group-m">',
			'    <div class="sm-text-input-container">',
			'        <textarea rows="1" placeholder="{{placeholder}}" class="sm-text-input"></textarea>',
			'    </div>',
			'    <div class="sm-text-input-button">',
			'        <div class="sm-text-input-button-border"></div>',
			'        <i class="sm-text-input-button-icon fa fa-{{faicon}}"></i>',
			'    </div>',
			'</div>',
		].join('\n')
	},
	smSelect : {
		scope:{
			'selectModel':"=ngModel",
			'options':"=",
			'fullWidth':"@",
			'placeholder':'@',
		},
		require: 'ngModel',
		link: function(scope, element, attrs) {
			// $(element).children(select).change(function(e) {
			// });
			element.on('$destroy', function() {
			});
		},
		template: [
			'<div class="sm-select fa fa-chevron-down {{fullWidth===\'true\'?\'sm-select-full-width\':\'\'}}">',
			'    <select ng-model="selectModel" ng-options="v.value as v.name for v in options track by v.value">',
			'        <option value="" selected="selected">{{placeholder}}</option>',
			'    </select>',
			'</div>',
		].join('\n')
	},
	smCheckbox :{
		scope:{
			'checkboxModel':"=ngModel",
			'name':"@",
			'fullWidth':"@"
		},
		require: 'ngModel',
		link: function(scope, element, attrs) {
			element.on('$destroy', function() {
			});
		},
		template: [
			'<div class="sm-checkbox {{fullWidth===\'true\'?\'sm-checkbox-full-width\':\'\'}}">',
			'    <input id="{{name}}" type="checkbox" name="{{name}}" ng-model="checkboxModel" />',
			'    <label for="{{name}}" ng-transclude></label>',
			'</div>',
		].join('\n')
	}
};


Object.keys(element_directives).forEach(function(e) {
	if(element_directives[e].init) element_directives[e].init();
	stuffMapp.directive(e, function() {
		element_directives[e].restrict = "E";
		element_directives[e].replace = true;
		element_directives[e].transclude = true;
		return element_directives[e];
	});
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImRpcmVjdGl2ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZWxlbWVudF9kaXJlY3RpdmVzID0ge1xuXHRzbUlucHV0R3JvdXBCdXR0b24gOiB7XG5cdFx0c2NvcGU6e1xuXHRcdFx0cGxhY2Vob2xkZXI6IFwiQFwiLFxuXHRcdFx0d2lkdGg6IFwiQFwiLFxuXHRcdFx0ZmFpY29uOiBcIkBcIixcblx0XHRcdHN1Ym1pdDogXCImXCJcblx0XHR9LFxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0KGZ1bmN0aW9uICgkKSB7XG5cdFx0XHRcdHZhciBvcmlnaW5hbFZhbCA9ICQuZm4udmFsO1xuXHRcdFx0XHQkLmZuLnZhbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMSkge1xuXHRcdFx0XHRcdFx0aWYodGhpc1swXS5jbGFzc05hbWUuaW5kZXhPZignc20tdGV4dC1pbnB1dC1ncm91cCcpID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICQodGhpc1swXSkuY2hpbGRyZW4oJy5zbS10ZXh0LWlucHV0LWNvbnRhaW5lcicpLmNoaWxkcmVuKCdpbnB1dCwgdGV4dGFyZWEnKS52YWwodmFsdWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGlmKHRoaXNbMF0uY2xhc3NOYW1lLmluZGV4T2YoJ3NtLXRleHQtaW5wdXQtZ3JvdXAnKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAkKHRoaXNbMF0pLmNoaWxkcmVuKCcuc20tdGV4dC1pbnB1dC1jb250YWluZXInKS5jaGlsZHJlbignaW5wdXQsIHRleHRhcmVhJykudmFsKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBvcmlnaW5hbFZhbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoalF1ZXJ5KTtcblx0XHRcdChmdW5jdGlvbigkKXtcblx0XHRcdFx0dmFyIG9yaWdpbmFsRm9jdXMgPSAkLmZuLmZvY3VzO1xuXHRcdFx0XHQkLmZuLmZvY3VzID0gZnVuY3Rpb24oY2FsbGJhY2spe1xuXHRcdFx0XHRcdGlmKHR5cGVvZiBjYWxsYmFjayAhPSAndW5kZWZpbmVkJyl7XG5cdFx0XHRcdFx0XHRpZih0aGlzWzBdLmNsYXNzTmFtZS5pbmRleE9mKCdzbS10ZXh0LWlucHV0LWdyb3VwJykgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJCh0aGlzWzBdKS5jaGlsZHJlbignLnNtLXRleHQtaW5wdXQtY29udGFpbmVyJykuY2hpbGRyZW4oJ2lucHV0JykuZm9jdXMoY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRvcmlnaW5hbEZvY3VzLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0fTtcblx0XHRcdH0pKGpRdWVyeSk7XG5cdFx0fSxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblx0XHRcdHNjb3BlLmZhaWNvbiA9IHNjb3BlLmZhaWNvbiB8fCAnYXJyb3ctcmlnaHQnO1xuXHRcdFx0dmFyIHNtSW5wdXRHcm91cElucHV0ID0gJChlbGVtZW50KS5jaGlsZHJlbignLnNtLXRleHQtaW5wdXQtY29udGFpbmVyJykuY2hpbGRyZW4oJ2lucHV0Jyk7XG5cdFx0XHR2YXIgc21JbnB1dEdyb3VwQnV0dG9uID0gJChlbGVtZW50KS5jaGlsZHJlbignLnNtLXRleHQtaW5wdXQtYnV0dG9uJyk7XG5cdFx0XHR2YXIgb25Gb2N1cyA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0aWYoIXNtSW5wdXRHcm91cEJ1dHRvbi5oYXNDbGFzcygnc20tdGV4dC1pbnB1dC1idXR0b24tYWN0aXZlJykpIHtcblx0XHRcdFx0XHRzbUlucHV0R3JvdXBCdXR0b24uYWRkQ2xhc3MoJ3NtLXRleHQtaW5wdXQtYnV0dG9uLWFjdGl2ZScpO1xuXHRcdFx0XHRcdCQoZWxlbWVudCkuYWRkQ2xhc3MoJ3NtLXRleHQtaW5wdXQtZ3JvdXAtYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR2YXIgb25CbHVyID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZihzbUlucHV0R3JvdXBJbnB1dC52YWwoKSkge1xuXHRcdFx0XHRcdGlmKCFzbUlucHV0R3JvdXBCdXR0b24uaGFzQ2xhc3MoJ3NtLXRleHQtaW5wdXQtYnV0dG9uLWFjdGl2ZScpKSB7XG5cdFx0XHRcdFx0XHRzbUlucHV0R3JvdXBCdXR0b24uYWRkQ2xhc3MoJ3NtLXRleHQtaW5wdXQtYnV0dG9uLWFjdGl2ZScpO1xuXHRcdFx0XHRcdFx0JChlbGVtZW50KS5hZGRDbGFzcygnc20tdGV4dC1pbnB1dC1ncm91cC1hY3RpdmUnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0c21JbnB1dEdyb3VwQnV0dG9uLnJlbW92ZUNsYXNzKCdzbS10ZXh0LWlucHV0LWJ1dHRvbi1hY3RpdmUnKTtcblx0XHRcdFx0XHQkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdzbS10ZXh0LWlucHV0LWdyb3VwLWFjdGl2ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dmFyIG9uQ2xpY2sgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdHNtSW5wdXRHcm91cElucHV0LmJsdXIoKTtcblx0XHRcdFx0Ly9pZihzbUlucHV0R3JvdXBJbnB1dC52YWwoKSkge1xuXHRcdFx0XHRcdHNjb3BlLnN1Ym1pdCgpO1xuXHRcdFx0XHQvL31cblx0XHRcdH07XG5cdFx0XHR2YXIgb25LZXlkb3duID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZihlLndoaWNoID09PSAyNykgc21JbnB1dEdyb3VwSW5wdXQuYmx1cigpO1xuXHRcdFx0XHRlbHNlIGlmKGUud2hpY2ggPT09IDEzKSBvbkNsaWNrKCk7XG5cdFx0XHR9O1xuXHRcdFx0c21JbnB1dEdyb3VwSW5wdXQub24oJ2ZvY3VzJyxvbkZvY3VzKTtcblx0XHRcdHNtSW5wdXRHcm91cElucHV0Lm9uKCdibHVyJyxvbkJsdXIpO1xuXHRcdFx0c21JbnB1dEdyb3VwQnV0dG9uLm9uKCdjbGljaycsb25DbGljayk7XG5cdFx0XHRzbUlucHV0R3JvdXBJbnB1dC5vbigna2V5ZG93bicsb25LZXlkb3duKTtcblx0XHRcdGVsZW1lbnQub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNtSW5wdXRHcm91cElucHV0Lm9mZignZm9jdXMnLG9uRm9jdXMpO1xuXHRcdFx0XHRzbUlucHV0R3JvdXBJbnB1dC5vZmYoJ2JsdXInLG9uQmx1cik7XG5cdFx0XHRcdHNtSW5wdXRHcm91cEJ1dHRvbi5vZmYoJ2NsaWNrJyxvbkNsaWNrKTtcblx0XHRcdFx0c21JbnB1dEdyb3VwSW5wdXQub2ZmKCdrZXlkb3duJyxvbktleWRvd24pO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0ZW1wbGF0ZTogW1xuXHRcdFx0JzxkaXYgc3R5bGU9XCJ3aWR0aDp7e3dpZHRofX07XCIgY2xhc3M9XCJzbS10ZXh0LWlucHV0LWdyb3VwIHNtLXRleHQtaW5wdXQtZ3JvdXAtbVwiPicsXG5cdFx0XHQnICAgIDxkaXYgY2xhc3M9XCJzbS10ZXh0LWlucHV0LWNvbnRhaW5lclwiPicsXG5cdFx0XHQnICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3BsYWNlaG9sZGVyfX1cIiBjbGFzcz1cInNtLXRleHQtaW5wdXRcIj4nLFxuXHRcdFx0JyAgICA8L2Rpdj4nLFxuXHRcdFx0JyAgICA8ZGl2IGNsYXNzPVwic20tdGV4dC1pbnB1dC1idXR0b25cIj4nLFxuXHRcdFx0JyAgICAgICAgPGRpdiBjbGFzcz1cInNtLXRleHQtaW5wdXQtYnV0dG9uLWJvcmRlclwiPjwvZGl2PicsXG5cdFx0XHQnICAgICAgICA8aSBjbGFzcz1cInNtLXRleHQtaW5wdXQtYnV0dG9uLWljb24gZmEgZmEte3tmYWljb259fVwiPjwvaT4nLFxuXHRcdFx0JyAgICA8L2Rpdj4nLFxuXHRcdFx0JzwvZGl2PicsXG5cdFx0XS5qb2luKCdcXG4nKVxuXHR9LFxuXHRzbVRleHRhcmVhR3JvdXBCdXR0b24gOiB7XG5cdFx0c2NvcGU6e1xuXHRcdFx0cGxhY2Vob2xkZXI6IFwiQFwiLFxuXHRcdFx0d2lkdGg6IFwiQFwiLFxuXHRcdFx0ZmFpY29uOiBcIkBcIixcblx0XHRcdHN1Ym1pdDogXCImXCJcblx0XHR9LFxuXHRcdGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXHRcdFx0c2NvcGUuZmFpY29uID0gc2NvcGUuZmFpY29uIHx8ICdhcnJvdy1yaWdodCc7XG5cdFx0XHR2YXIgc21JbnB1dEdyb3VwSW5wdXQgPSAkKGVsZW1lbnQpLmNoaWxkcmVuKCcuc20tdGV4dC1pbnB1dC1jb250YWluZXInKS5jaGlsZHJlbigndGV4dGFyZWEnKTtcblx0XHRcdHZhciBzbUlucHV0R3JvdXBCdXR0b24gPSAkKGVsZW1lbnQpLmNoaWxkcmVuKCcuc20tdGV4dC1pbnB1dC1idXR0b24nKTtcblx0XHRcdHZhciBvbkZvY3VzID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZighc21JbnB1dEdyb3VwQnV0dG9uLmhhc0NsYXNzKCdzbS10ZXh0LWlucHV0LWJ1dHRvbi1hY3RpdmUnKSkge1xuXHRcdFx0XHRcdHNtSW5wdXRHcm91cEJ1dHRvbi5hZGRDbGFzcygnc20tdGV4dC1pbnB1dC1idXR0b24tYWN0aXZlJyk7XG5cdFx0XHRcdFx0JChlbGVtZW50KS5hZGRDbGFzcygnc20tdGV4dC1pbnB1dC1ncm91cC1hY3RpdmUnKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHZhciBvbkJsdXIgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmKHNtSW5wdXRHcm91cElucHV0LnZhbCgpKSB7XG5cdFx0XHRcdFx0aWYoIXNtSW5wdXRHcm91cEJ1dHRvbi5oYXNDbGFzcygnc20tdGV4dC1pbnB1dC1idXR0b24tYWN0aXZlJykpIHtcblx0XHRcdFx0XHRcdHNtSW5wdXRHcm91cEJ1dHRvbi5hZGRDbGFzcygnc20tdGV4dC1pbnB1dC1idXR0b24tYWN0aXZlJyk7XG5cdFx0XHRcdFx0XHQkKGVsZW1lbnQpLmFkZENsYXNzKCdzbS10ZXh0LWlucHV0LWdyb3VwLWFjdGl2ZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzbUlucHV0R3JvdXBCdXR0b24ucmVtb3ZlQ2xhc3MoJ3NtLXRleHQtaW5wdXQtYnV0dG9uLWFjdGl2ZScpO1xuXHRcdFx0XHRcdCQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ3NtLXRleHQtaW5wdXQtZ3JvdXAtYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR2YXIgb25DbGljayA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0Ly9zbUlucHV0R3JvdXBJbnB1dC5ibHVyKCk7XG5cdFx0XHRcdGlmKHNtSW5wdXRHcm91cElucHV0LnZhbCgpKSB7XG5cdFx0XHRcdFx0c2NvcGUuc3VibWl0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR2YXIgb25LZXlkb3duID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZihlLndoaWNoID09PSAyNykgc21JbnB1dEdyb3VwSW5wdXQuYmx1cigpO1xuXHRcdFx0XHRlbHNlIGlmKGUud2hpY2ggPT09IDEzKSBvbkNsaWNrKCk7XG5cdFx0XHR9O1xuXHRcdFx0c21JbnB1dEdyb3VwSW5wdXQub24oJ2ZvY3VzJyxvbkZvY3VzKTtcblx0XHRcdHNtSW5wdXRHcm91cElucHV0Lm9uKCdibHVyJyxvbkJsdXIpO1xuXHRcdFx0c21JbnB1dEdyb3VwQnV0dG9uLm9uKCdjbGljaycsb25DbGljayk7XG5cdFx0XHRzbUlucHV0R3JvdXBJbnB1dC5vbigna2V5ZG93bicsb25LZXlkb3duKTtcblx0XHRcdGVsZW1lbnQub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNtSW5wdXRHcm91cElucHV0Lm9mZignZm9jdXMnLG9uRm9jdXMpO1xuXHRcdFx0XHRzbUlucHV0R3JvdXBJbnB1dC5vZmYoJ2JsdXInLG9uQmx1cik7XG5cdFx0XHRcdHNtSW5wdXRHcm91cEJ1dHRvbi5vZmYoJ2NsaWNrJyxvbkNsaWNrKTtcblx0XHRcdFx0c21JbnB1dEdyb3VwSW5wdXQub2ZmKCdrZXlkb3duJyxvbktleWRvd24pO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0ZW1wbGF0ZTogW1xuXHRcdFx0JzxkaXYgc3R5bGU9XCJ3aWR0aDp7e3dpZHRofX07XCIgY2xhc3M9XCJzbS10ZXh0LWlucHV0LWdyb3VwIHNtLXRleHQtaW5wdXQtZ3JvdXAtbVwiPicsXG5cdFx0XHQnICAgIDxkaXYgY2xhc3M9XCJzbS10ZXh0LWlucHV0LWNvbnRhaW5lclwiPicsXG5cdFx0XHQnICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjFcIiBwbGFjZWhvbGRlcj1cInt7cGxhY2Vob2xkZXJ9fVwiIGNsYXNzPVwic20tdGV4dC1pbnB1dFwiPjwvdGV4dGFyZWE+Jyxcblx0XHRcdCcgICAgPC9kaXY+Jyxcblx0XHRcdCcgICAgPGRpdiBjbGFzcz1cInNtLXRleHQtaW5wdXQtYnV0dG9uXCI+Jyxcblx0XHRcdCcgICAgICAgIDxkaXYgY2xhc3M9XCJzbS10ZXh0LWlucHV0LWJ1dHRvbi1ib3JkZXJcIj48L2Rpdj4nLFxuXHRcdFx0JyAgICAgICAgPGkgY2xhc3M9XCJzbS10ZXh0LWlucHV0LWJ1dHRvbi1pY29uIGZhIGZhLXt7ZmFpY29ufX1cIj48L2k+Jyxcblx0XHRcdCcgICAgPC9kaXY+Jyxcblx0XHRcdCc8L2Rpdj4nLFxuXHRcdF0uam9pbignXFxuJylcblx0fSxcblx0c21TZWxlY3QgOiB7XG5cdFx0c2NvcGU6e1xuXHRcdFx0J3NlbGVjdE1vZGVsJzpcIj1uZ01vZGVsXCIsXG5cdFx0XHQnb3B0aW9ucyc6XCI9XCIsXG5cdFx0XHQnZnVsbFdpZHRoJzpcIkBcIixcblx0XHRcdCdwbGFjZWhvbGRlcic6J0AnLFxuXHRcdH0sXG5cdFx0cmVxdWlyZTogJ25nTW9kZWwnLFxuXHRcdGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXHRcdFx0Ly8gJChlbGVtZW50KS5jaGlsZHJlbihzZWxlY3QpLmNoYW5nZShmdW5jdGlvbihlKSB7XG5cdFx0XHQvLyB9KTtcblx0XHRcdGVsZW1lbnQub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRlbXBsYXRlOiBbXG5cdFx0XHQnPGRpdiBjbGFzcz1cInNtLXNlbGVjdCBmYSBmYS1jaGV2cm9uLWRvd24ge3tmdWxsV2lkdGg9PT1cXCd0cnVlXFwnP1xcJ3NtLXNlbGVjdC1mdWxsLXdpZHRoXFwnOlxcJ1xcJ319XCI+Jyxcblx0XHRcdCcgICAgPHNlbGVjdCBuZy1tb2RlbD1cInNlbGVjdE1vZGVsXCIgbmctb3B0aW9ucz1cInYudmFsdWUgYXMgdi5uYW1lIGZvciB2IGluIG9wdGlvbnMgdHJhY2sgYnkgdi52YWx1ZVwiPicsXG5cdFx0XHQnICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPnt7cGxhY2Vob2xkZXJ9fTwvb3B0aW9uPicsXG5cdFx0XHQnICAgIDwvc2VsZWN0PicsXG5cdFx0XHQnPC9kaXY+Jyxcblx0XHRdLmpvaW4oJ1xcbicpXG5cdH0sXG5cdHNtQ2hlY2tib3ggOntcblx0XHRzY29wZTp7XG5cdFx0XHQnY2hlY2tib3hNb2RlbCc6XCI9bmdNb2RlbFwiLFxuXHRcdFx0J25hbWUnOlwiQFwiLFxuXHRcdFx0J2Z1bGxXaWR0aCc6XCJAXCJcblx0XHR9LFxuXHRcdHJlcXVpcmU6ICduZ01vZGVsJyxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblx0XHRcdGVsZW1lbnQub24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRlbXBsYXRlOiBbXG5cdFx0XHQnPGRpdiBjbGFzcz1cInNtLWNoZWNrYm94IHt7ZnVsbFdpZHRoPT09XFwndHJ1ZVxcJz9cXCdzbS1jaGVja2JveC1mdWxsLXdpZHRoXFwnOlxcJ1xcJ319XCI+Jyxcblx0XHRcdCcgICAgPGlucHV0IGlkPVwie3tuYW1lfX1cIiB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwie3tuYW1lfX1cIiBuZy1tb2RlbD1cImNoZWNrYm94TW9kZWxcIiAvPicsXG5cdFx0XHQnICAgIDxsYWJlbCBmb3I9XCJ7e25hbWV9fVwiIG5nLXRyYW5zY2x1ZGU+PC9sYWJlbD4nLFxuXHRcdFx0JzwvZGl2PicsXG5cdFx0XS5qb2luKCdcXG4nKVxuXHR9XG59O1xuXG5cbk9iamVjdC5rZXlzKGVsZW1lbnRfZGlyZWN0aXZlcykuZm9yRWFjaChmdW5jdGlvbihlKSB7XG5cdGlmKGVsZW1lbnRfZGlyZWN0aXZlc1tlXS5pbml0KSBlbGVtZW50X2RpcmVjdGl2ZXNbZV0uaW5pdCgpO1xuXHRzdHVmZk1hcHAuZGlyZWN0aXZlKGUsIGZ1bmN0aW9uKCkge1xuXHRcdGVsZW1lbnRfZGlyZWN0aXZlc1tlXS5yZXN0cmljdCA9IFwiRVwiO1xuXHRcdGVsZW1lbnRfZGlyZWN0aXZlc1tlXS5yZXBsYWNlID0gdHJ1ZTtcblx0XHRlbGVtZW50X2RpcmVjdGl2ZXNbZV0udHJhbnNjbHVkZSA9IHRydWU7XG5cdFx0cmV0dXJuIGVsZW1lbnRfZGlyZWN0aXZlc1tlXTtcblx0fSk7XG59KTtcbiJdfQ==
