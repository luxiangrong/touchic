;(function($) {"use strict";

	/**
	 * 根据缩放系数，将w1和h1放大至充满屏幕
	 * 
	 * @param {Number} w1
	 * @param {Number} h1
	 * @param {Number} w2
	 * @param {Number} h2
	 * @param {Number} scale
	 */
	function getZoomDimension(w1, h1, w2, h2, scale) {
		var rateW = w1 / w2;
		var rateH = h1 / h2;

		var rate = rateW < rateH ? rateW : rateH;
		rate /= scale;

		return {
			w: w1 / rate,
			h: h2 / rate
		};
	}
	
	function getScale(w1, h1, w2, h2, scale) {
		var rateW = w1 / w2;
		var rateH = h1 / h2;

		var rate = rateW < rateH ? rateW : rateH;

		return 1/rate * scale;
	}


	$(document).ready(function() {

		var knav = $(".scroll-nav").knav();

		var winHeight = $(window).height();
		var winWidth = $(window).width();

		$(".content").height(winHeight);

		//PIXI舞台
		var stage = new PIXI.Stage(0xEEEEEE);

		// 创建一个PIXI WebGL渲染器
		var renderer = new PIXI.autoDetectRenderer(winWidth, winHeight - 40);

		// 将渲染器插入Dom中
		$("#welcome").append(renderer.view);

		

		var container = new PIXI.DisplayObjectContainer();

		// create a texture from an image path
		var welcomeWidth = 1000;
		var welcomeHeight = 616;
		var welcomes = [PIXI.Sprite.fromImage("images/welcome_01.jpg"), PIXI.Sprite.fromImage("images/welcome_02.jpg"), PIXI.Sprite.fromImage("images/welcome_03.jpg"), PIXI.Sprite.fromImage("images/welcome_04.jpg"), PIXI.Sprite.fromImage("images/welcome_05.jpg")];
		
		//记录帧数，用于控制图片切换
		var frameCount = 0;
		//图片切换时的帧数	
		var switchFrameCount = 200;
		var currentWelcomeSprite = 0;
		var prevWelcomeSprite = welcomes.length - 1;
		var currentTime = new Date().getTime();

		$.each(welcomes, function() {
			var dimension = getZoomDimension(1000, 616, winWidth, winHeight, 1);
			this.width = dimension.w;
			this.height = dimension.h;
			this.position.x = - (dimension.w - winWidth) / 2;
			this.position.y = - (dimension.h - winHeight) / 2;
			
			this.alpha = 1;
			container.addChild(this);
		});
		welcomes[0].alpha = 1;

		container.position.x = 0;
		container.position.y = 0;

		stage.addChild(container);

		function animate() {
			requestAnimFrame(animate);
			frameCount ++;
			if(frameCount == switchFrameCount) {
				currentTime = new Date().getTime();
				prevWelcomeSprite = currentWelcomeSprite;
				currentWelcomeSprite = (currentWelcomeSprite + 1) % welcomes.length;
				frameCount = 0;
				console.log('pre:' + prevWelcomeSprite + ' curr:' + currentWelcomeSprite);
			}
			var start = new Date().getTime() - currentTime;
			if(welcomes[prevWelcomeSprite].alpha >= 0) {
				var preAlpha = $.easing.easeInQuad(null, start, 1, -1, 3000);
				if(preAlpha < 0) {
					preAlpha = 0;
				}
				if(preAlpha > 1) {
					preAlpha = 1;
				}
				welcomes[prevWelcomeSprite].alpha = preAlpha;
			} 
			if(welcomes[currentWelcomeSprite].alpha <= 1) {
				var currAlpha = $.easing.easeInQuad(null, start, 0, 1, 3000);
				if(currAlpha < 0) {
					currAlpha = 0;
				}
				if(currAlpha > 1) {
					currAlpha = 1;
				}
				welcomes[currentWelcomeSprite].alpha = currAlpha;
				
				// welcomes[currentWelcomeSprite].scale.x = 2;
				// welcomes[currentWelcomeSprite].scale.y = 2;
			}
			
			renderer.render(stage);
		}
		requestAnimFrame(animate);
		
		$(window).on('mousemove', function(e){
			// console.log(e);
		}); 

	});
})(jQuery);

