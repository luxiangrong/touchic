;(function($) {
	"use strict";
	
	
	$(document).ready(function(){
		
		var knav = $(".scroll-nav").knav();
		
		var winHeight = $(window).height();
		var winWidth = $(window).width();
		
		$(".content").height(winHeight);
		
	});
})(jQuery);

