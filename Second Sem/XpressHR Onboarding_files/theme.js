$(document).ready(function(){
	theme.initialize();
});

/**
* Theme manipulation object
*/
var theme = {
	config : {

	},

	initialize : function(){
		theme.setButtonsBehaviour();
	    theme.assignClasses();
	},

	setButtonsBehaviour : function(){
		$('.buttonDefault:disabled, .buttonPrimary:disabled')
			.addClass('buttonDisabled');
	},
	
    assignClasses: function() {
        $('.globalTable .headerRow th.cell a').addClass('link');
    }
};

/**
* General site properties object
*/
var site = {
	isInsideIframe : function() {
		return window.self !== window.top;
	}
};