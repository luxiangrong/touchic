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
		var switchFrameCount = 300;
		var currentWelcomeSprite = 0;
		var prevWelcomeSprite = 4;
		var nextWelcomeSprite = 1;
		var currentTime = new Date().getTime();

		$.each(welcomes, function() {
			var dimension = getZoomDimension(1000, 616, winWidth, winHeight + 40, 1);
			this.width = dimension.w;
			this.height = dimension.h;
			this.position.x = renderer.width / 2;
			this.position.y = renderer.height / 2;
			this.anchor.x = 0.5;
			this.anchor.y = 0.5;
			
			this.alpha = 0;
			container.addChild(this);
		});
		welcomes[0].alpha = 1;
		
		console.log(container.height);

		container.position.x = 0;
		container.position.y = 0;

		stage.addChild(container);
		
		var initScale = welcomes[0].scale.x;
		function animate() {
			requestAnimFrame(animate);
			frameCount ++;
			
			if(frameCount >= switchFrameCount * 0.8) {
				welcomes[currentWelcomeSprite].alpha = 1 - (frameCount - switchFrameCount * 0.8)/ (switchFrameCount * 0.2);
				welcomes[nextWelcomeSprite].alpha = (frameCount - switchFrameCount * 0.8)/ (switchFrameCount * 0.2);
			}
			
			welcomes[currentWelcomeSprite].scale.x = initScale + frameCount / switchFrameCount * 0.5;
			welcomes[currentWelcomeSprite].scale.y = initScale + frameCount / switchFrameCount * 0.5;
			
			if(frameCount == switchFrameCount) {
				welcomes[currentWelcomeSprite].scale.x = initScale;
				welcomes[currentWelcomeSprite].scale.y = initScale;
				frameCount = 0;
				currentWelcomeSprite = (currentWelcomeSprite + 1) % welcomes.length;
				nextWelcomeSprite = (nextWelcomeSprite + 1)% welcomes.length;
			}
			renderer.render(stage);
		}
		requestAnimFrame(function(){
			renderer.render(stage);
		});
		requestAnimFrame(animate);
		
		$(window).on('mousemove', function(e){
			// console.log(e);
		}); 

	});
})(jQuery);

