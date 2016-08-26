var element_directives = {
	smInputGroupButton : {
		scope:{
			placeholder: "@",
			width: "@",
			submit:"&"
		},
		link: function(scope, element, attrs) {
			var smInputGroupInput = $(element).children('.sm-text-input-container').children('input');
			var smInputGroupButton = $(element).children('.sm-text-input-button');
			var onFocus = function(e) {
			    if(!smInputGroupButton.hasClass('sm-text-input-button-active')) {
						smInputGroupButton.addClass('sm-text-input-button-active');
					}
			};
			var onBlur = function(e) {
			    if(smInputGroupInput.val()) {
						if(!smInputGroupButton.hasClass('sm-text-input-button-active')) {
							smInputGroupButton.addClass('sm-text-input-button-active');
						}
					}
			    else {
						smInputGroupButton.removeClass('sm-text-input-button-active');
					}
			};
			var onClick = function(e) {
			    smInputGroupInput.blur();
			    if(smInputGroupInput.val()) scope.submit();
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
			'        <i class="fa fa-arrow-right"></i>',
			'    </div>',
			'</div>',
		].join('\n')
	}
};


Object.keys(element_directives).forEach(function(e) {
	stuffMapp.directive(e, function() {
		element_directives[e].restrict = "E";
		element_directives[e].replace = true;
		element_directives[e].transclude = true;
		return element_directives[e];
	});
});
