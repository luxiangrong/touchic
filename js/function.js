;(function($) {"use strict";
	$(document).ready(function() {

		var winHeight = $(window).height();
		var winWidth = $(window).width();

		$("body").height(winHeight);
		
		function createTextTween(textContainer) {
			var timeline = new TimelineMax();
			timeline.fromTo([textContainer.find('h1'), textContainer.find('p')], 1, {opacity: 0}, {opacity: 1});
			if(textContainer.find('h1').hasClass("right")) {
				timeline.from(textContainer.find('h1'), 5, {right: "-=150px"}, "-=1");
			} else {
				timeline.from(textContainer.find('h1'), 5, {left: "-=150px"}, "-=1");
			}
			if(textContainer.find('p').hasClass("right")) {
				timeline.from(textContainer.find('p'), 5, {right: "+=150px"}, "-=5");
			} else {
				timeline.from(textContainer.find('p'), 5, {left: "+=150px"}, "-=5");
			}
			return timeline;
		}
		
		function createWelcomeItemTween(welcomeItemContainer) {
			var timeline = new TimelineMax();
			timeline.to(welcomeItemContainer, 1, {opacity: 1});
			timeline.fromTo(welcomeItemContainer.find('.img'), 10, {scale: 1}, {scale: 1.2}, -1);
			timeline.add(createTextTween(welcomeItemContainer.find('.text')), "-=11");
			timeline.to(welcomeItemContainer, 1, {opacity: 0});
			return timeline;
		}
		

		var t1 = new TimelineMax();
		t1.timeScale(2);
		$('#welcome').show();
		$('#welcome article').each(function(i, item){
			t1.add(createWelcomeItemTween($(this)), "-=5");
		});
		
		var txt;
		
		function splitText(elem) {
	        var prevLetter, sentence,
	            sentence = elem.text().split("");
	        $(elem).text('');
	        $.each(sentence, function(index, val) {
	            if(val === " "){
	                val = "&nbsp;";
	            }
	            var letter = $("<div/>", {
	                        id : "txt" + index
	            }).addClass('txt').html(val).appendTo($(elem));
	     
	            if(prevLetter) {
	                $(letter).css("left", ($(prevLetter).position().left + $(letter).width()) + "px");
	            };
	            prevLetter = letter;
	        });
	        txt = $(".txt");
	    }
		
		t1.call(function(){
			$('.content').hide();
			$("#home").show();
			
			splitText($("#home h1.l1"));
			splitText($("#home h1.l2"));
			TweenMax.set($("#home h1"), {perspective:500});
			
			var tl = new TimelineMax({repeat:0});
			tl.staggerFrom(txt, 0.4, {alpha:0}, 0.06, "textEffect");
        	tl.staggerFrom(txt, 0.8, {rotationY:"-270deg", top:80, transformOrigin: "50% 50% -80"}, 0.06, "textEffect");
        	tl.staggerTo(txt, 0.6, {rotationX:"360deg", color:"#fff", transformOrigin:"50% 50% 10"}, 0.02); 
			tl.from($("#home .text"), 1, {left: "-1000px", alpha: 0}, "-=1");
			
			var last = {
				index: 0,
				subIndex: 0
			},curr = {
				index: 0,
				subIndex: 0
			};
			
			$(document).one('click', function(){
				$("#home").hide();
				var knav = $(".scroll-nav").knav({
					move: function(index, subIndex) {
						last.index = curr.index;
						last.subIndex = curr.subIndex;
						curr.index = index;
						curr.subIndex = subIndex;
						switch(index) {
							case 3:
								var timeline = new TimelineMax();
								var section = $("[data-index=3][data-sub-index=" + curr.subIndex + "]");
								var lastSection = $("[data-index=3][data-sub-index=" + last.subIndex + "]");
								if(last.index != 3) {
									lastSection = $("[data-index=" + last.index + "]");
									timeline.add(TweenMax.to(lastSection, 1, {left: "-2000px"}));
									timeline.add(TweenMax.to(lastSection.find('.content-fix'), 1 ,{bottom: "-200px"}), "-=1");
									timeline.add(TweenMax.to(lastSection.find('.content-fix-top'), 1 ,{top: "-200px"}), "-=1");
									timeline.call(function(){lastSection.hide();});
									timeline.call(function(){lastSection.find('.content-fix').css("bottom", "50px");});
									timeline.call(function(){lastSection.find('.content-fix-top').css("top", "0px");});
								} else {
									timeline.add(TweenMax.to(lastSection, 1, {left: "-2000px"}), "-=1");
									timeline.add(TweenMax.to(lastSection.find('.content-fix'), 1 ,{bottom: "-200px"}), "-=1");
									timeline.add(TweenMax.to(lastSection.find('.content-fix-top'), 1 ,{top: "-200px"}), "-=1");
									timeline.call(function(){lastSection.find('.content-fix').css("bottom", "50px");});
									timeline.call(function(){lastSection.find('.content-fix-top').css("top", "0px");});
									if(last.subIndex != curr.subIndex)
										timeline.call(function(){lastSection.hide();});
								}
								section.css('left', '0px');
								timeline.add(function(){section.show();},"-=1");
								timeline.add(TweenMax.fromTo(section.find('.col-avator'), 1 ,{left: "2000px"}, {left: '0px'}), '-=1');
								timeline.add(TweenMax.fromTo(section.find('.col-description'), 0.5 ,{left: "2000px"}, {left: '0px'}), '-=0.5');
								timeline.add(TweenMax.from(section.find('.content-fix'), 1 ,{bottom: "-200px"}), "-=1");
								timeline.add(TweenMax.from(section.find('.content-fix-top'), 1 ,{top: "-200px"}), "-=1");
								break;
							case 1:
								var timeline = new TimelineMax();
								var section = $("[data-index=1][data-sub-index=" + curr.subIndex + "]");
								var lastSection = $("[data-index=1][data-sub-index=" + last.subIndex + "]");
								if(last.index != 1) {
									lastSection = $("[data-index=" + last.index + "]");
									timeline.add(TweenMax.to(lastSection, 1, {left: "-2000px"}),"-=1");
									timeline.add(TweenMax.to(lastSection.find('.content-fix'), 1 ,{bottom: "-200px"}), "-=1");
									timeline.add(TweenMax.to(lastSection.find('.content-fix-top'), 1 ,{top: "-200px"}), "-=1");
									timeline.call(function(){lastSection.hide();});
									timeline.call(function(){lastSection.find('.content-fix').css("bottom", "50px");});
									timeline.call(function(){lastSection.find('.content-fix-top').css("top", "0px");});
								} else {
									timeline.add(TweenMax.to(lastSection, 1, {left: "-2000px"}), "-=1");
									timeline.add(TweenMax.to(lastSection.find('.content-fix'), 1 ,{bottom: "-200px"}), "-=1");
									timeline.add(TweenMax.to(lastSection.find('.content-fix-top'), 1 ,{top: "-200px"}), "-=1");
									timeline.call(function(){lastSection.find('.content-fix').css("bottom", "50px");});
									timeline.call(function(){lastSection.find('.content-fix-top').css("top", "0px");});
									if(last.subIndex != curr.subIndex)
										timeline.add(function(){lastSection.hide();});
								}
								section.css('left', '0px');
								// section.show();
								timeline.add(function(){section.show();},"-=1");
								timeline.add(TweenMax.fromTo(section, 1 ,{alpha: 0}, {alpha: 1}), '-=1');
								timeline.add(TweenMax.from(section.find('.content-fix'), 1 ,{bottom: "-200px"}), "-=1");
								timeline.add(TweenMax.from(section.find('.content-fix-top'), 1 ,{top: "-200px"}), "-=1");
								break;
							default:
								var timeline = new TimelineMax();
								var section = $("[data-index=" + index + "]");
								var lastSection = $("[data-index=" + last.index + "]");
								timeline.add(TweenMax.to(lastSection, 1, {left: "-2000px"}));
								timeline.add(TweenMax.to(lastSection.find('.content-fix'), 1 ,{bottom: "-200px"}), "-=1");
								timeline.add(TweenMax.to(lastSection.find('.content-fix-top'), 1 ,{top: "-200px"}), "-=1");
								if(last.index != curr.index) {
									timeline.call(function(){lastSection.hide();});
									timeline.call(function(){lastSection.find('.content-fix').css("bottom", "50px");});
									timeline.call(function(){lastSection.find('.content-fix-top').css("top", "0px");});
								}
								timeline.add(function(){section.show();}, "-=1");
								// timeline.add(TweenMax.fromTo(section, 1 ,{rotationY:0, transformOrigin:"50% 50%", left: "-4000px"}, {left: '0px',rotationY:360, transformOrigin:"50% 50%"}));
								timeline.add(TweenMax.fromTo(section, 1 ,{left: "2000px"}, {left: '0px'}), "-=1");
								timeline.add(TweenMax.from(section.find('.content-fix'), 1 ,{bottom: "-200px"}), "-=1");
								timeline.add(TweenMax.from(section.find('.content-fix-top'), 1 ,{top: "-200px"}), "-=1");
								break;
						}
					},
					initIndex: 0,
					initSubIndex: 0
				});
				knav.show();
			});
		});
		
		// t1.call(function(){
			// var knav = $(".scroll-nav").knav({
				// move: function(index, subIndex) {
					// $('.content').hide();
					// switch(index) {
						// case 3:
							// var section = $("[data-index=" + index + "]");
							// TweenMax.fromTo(section.find('.col-avator'), 1 ,{rotationY:0, transformOrigin:"50% 50%"}, {rotationY:360, transformOrigin:"50% 50%"});
							// TweenMax.fromTo(section.find('.col-description'), 1 ,{rotationY:0, transformOrigin:"50% 50%"}, {rotationY:360, transformOrigin:"50% 50%"});
							// $("[data-index=3][data-sub-index=" + subIndex + "]").show();
							// break;
						// default:
							// var section = $("[data-index=" + index + "]");
// 							
							// TweenMax.fromTo(section, 1 ,{rotationY:0, transformOrigin:"50% 50%"}, {rotationY:360, transformOrigin:"50% 50%"});
							// section.show();
// 							
							// break;
					// }
				// },
				// initIndex: 0,
				// initSubIndex: 0
			// });
			// knav.show();
		// });
		

	});
})(jQuery);

