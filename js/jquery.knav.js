;(function($) {
	$.fn.knav = function(options) {

		var selector = this.selector;
		var opts = $.extend({}, $.fn.knav.defaults, options);
		
		return this.each(function() {
			var _this = $(this);
			var navWidth = _this.width();

			var bg = _this.find('> ul');
			bg.addClass('bg');
			var navItems = bg.find('> li');
			var navItemsCount = navItems.length;
			
			var index = opts.initIndex,subIndex = opts.initSubIndex,subNavItemsCount;
			var navItemWidth = navWidth / navItemsCount;

			navItems.width(navWidth / navItemsCount);
			navItems.each(function(i, item) {
				$(item).css('left', i * navWidth / navItemsCount + 'px');
				
				var subNav = $(item).find('> ul');
				var subNavWidth = subNav.width();
				var subNavItems = subNav.find('> li');
				subNavItemsCount = subNavItems.length;
				subNavItems.width(subNavWidth/subNavItemsCount);
				subNavItems.each(function(ii, iitem) {
					$(iitem).css('left', ii * subNavWidth / subNavItemsCount + 'px');
				});
				subNavItems.on('click', function(e){
					subIndex = $(this).index();
				});
			});
			
			navItems.on('click', function(e){
				index = $(this).index();
				subNavItemsCount  = $(this).find('> ul > li').length;
				var nextSubNavItemsCount = $(this).next().find('> ul > li').length;
				var prevSubNavItemsCount = $(this).prev().find('> ul > li').length;
				
				opts.move(index, subIndex);
				
				updateUI(navWidth, index, subIndex, fg);
				
			});
			
			var fg = bg.clone(true, true);
			fg.removeClass('bg');
			fg.addClass('fg');
			_this.append(fg);
			
			updateUI(navWidth, index, subIndex, fg);
			
			console.log('Init');
			console.log('主导航: ' + index);
			console.log('子导航: ' + subIndex);
			
			var isFF = 'MozAppearance' in document.documentElement.style;
			var moving = false;
			_scrollable($(window)).on(isFF?'DOMMouseScroll':'mousewheel', function(e){
				e.preventDefault();
				
				if(moving) {
					return;
				}
				
				var originalEvent = e.originalEvent;
				var delta = isFF ? originalEvent.detail : -(originalEvent.wheelDelta == undefined ? -originalEvent.deltaY: originalEvent.wheelDelta);
				delta  = delta / Math.abs(delta);
				
				var currentSubItemsCount, prevSubItemsCount, nextSubItemsCount;
				
				if(delta > 0) {
					currentSubItemsCount = bg.find('> li').eq(index).find('> ul > li').length;
					if(index >= navItemsCount - 1 && subIndex >= currentSubItemsCount - 1) {
						return;
					}
					
					if(currentSubItemsCount == 0) {
						index = index + 1;
						subIndex = 0;
					} else {
						if(subIndex >= currentSubItemsCount - 1) {
							index = index + 1;
							subIndex = 0;
						} else {
							subIndex = (subIndex + 1) % currentSubItemsCount;
						}
					}
				} else {
					if(index <= 0 && subIndex <= 0) {
						return;
					}
					currentSubItemsCount = bg.find('> li').eq(index).find('> ul > li').length;
					prevSubItemsCount = bg.find('> li').eq(index - 1).find('> ul > li').length;
					if(currentSubItemsCount == 0) {
						index = index - 1;
						if(prevSubItemsCount == 0) {
							subIndex = 0;
						} else {
							subIndex = prevSubItemsCount - 1;
						}
					} else {
						if(subIndex == 0) {
							index = index - 1;
							if(prevSubItemsCount == 0) {
								subIndex = 0;
							} else {
								subIndex = prevSubItemsCount - 1;
							}
						} else {
							subIndex = subIndex - 1;
						}
					}
				}
				
				moving = true;
				window.setTimeout(function(){moving = false;}, 1000);
				
				opts.move(index, subIndex);
				updateUI(navWidth, index, subIndex, fg);
			});
			
		});
		
		function updateUI(totalWidth, index, subIndex, ele){
			var itemCount = ele.find('> li').length;
			var subItemsCount = ele.find('> li').eq(index).find('> ul > li').length;
			var widthPercent;
			if(subItemsCount == 0) {
				widthPercent = (index + 1) / itemCount;
			} else {
				if(subIndex > subItemsCount -1 ) {
					subIndex = subItemsCount - 1;
				}
				widthPercent = (index + (subIndex + 1) / subItemsCount) / itemCount;
			}
			
			ele.width(totalWidth * widthPercent);
		}
		
		//获取真正的滚轮事件可以绑定的元素对象
		function _scrollable($obj) {
			return $obj.map(function(){
				var elem = this,
					isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;
					if( !isWin )
						return elem;
				var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
				
				return  doc.compatMode == 'BackCompat' ?
					doc.body : 
					doc.documentElement;
			});
		}

	};

	$.fn.knav.defaults = {
		move: function(index, subIndex){
			console.log('主导航: ' + index);
			console.log('子导航: ' + subIndex);
		},
		initIndex: 0,
		initSubIndex: 2
	};

})(jQuery);