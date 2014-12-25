;(function($) {
	"use strict";
	$(document).ready(function(){
		var scrollNav = {};
		scrollNav.width = $(".scroll-nav").width();
		scrollNav.count = $(".scroll-nav").find('.bg li').length;
		$(".scroll-nav").find('li').width(scrollNav.width/scrollNav.count );
		$(".scroll-nav ul.bg li").each(function(i, item){
			$(item).css('left',  i * scrollNav.width/scrollNav.count + 'px');
		});
		$(".scroll-nav ul.fg li").each(function(i, item){
			$(item).css('left',  i * scrollNav.width/scrollNav.count + 'px');
		});
	});
})(jQuery);

