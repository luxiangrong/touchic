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
			h: h1 / rate
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
		var welcomesContainer = [
			new PIXI.DisplayObjectContainer(),
			new PIXI.DisplayObjectContainer(),
			new PIXI.DisplayObjectContainer(),
			new PIXI.DisplayObjectContainer(),
			new PIXI.DisplayObjectContainer()
		];
		var welcomes = [PIXI.Sprite.fromImage("images/welcome_01.jpg"), PIXI.Sprite.fromImage("images/welcome_02.jpg"), PIXI.Sprite.fromImage("images/welcome_03.jpg"), PIXI.Sprite.fromImage("images/welcome_04.jpg"), PIXI.Sprite.fromImage("images/welcome_05.jpg")];
		var welcomesText = [
			{
				title:new PIXI.Text('FIND YOUR PEERS',{font: "35px FZLTZHK", fill: "#5d5d5d", align: "left"}),
				desc:new  PIXI.Text('Join a global community of the most fascinating creators',{font: "35px FZLTXHK", fill: "#5d5d5d", align: "left"}),
				settings: {
					title: {
						x: renderer.width * 0.2,
						y: renderer.height * 0.2
					},
					desc: {
						x: renderer.width * 0.3,
						y: renderer.height * 0.3
					}
					
				}
			},
			{
				title:new PIXI.Text('FIND YOUR PEERS',{font: "35px FZLTZHK", fill: "#5d5d5d", align: "left"}),
				desc:new  PIXI.Text('Join a global community of the most fascinating creators',{font: "35px FZLTXHK", fill: "#5d5d5d", align: "left"}),
				settings: {
					title: {
						x: renderer.width * 0.5,
						y: renderer.height * 0.5
					},
					desc: {
						x: renderer.width * 0.4,
						y: renderer.height * 0.6
					}
				}
			},
			{
				title:new PIXI.Text('FIND YOUR PEERS',{font: "35px FZLTZHK", fill: "#5d5d5d", align: "left"}),
				desc:new  PIXI.Text('Join a global community of the most fascinating creators',{font: "35px FZLTXHK", fill: "#5d5d5d", align: "left"}),
				settings: {
					title: {
						x: renderer.width * 0.4,
						y: renderer.height * 0.6
					},
					desc: {
						x: renderer.width * 0.6,
						y: renderer.height * 0.7
					}
				}
			},
			{
				title:new PIXI.Text('FIND YOUR PEERS',{font: "35px FZLTZHK", fill: "#5d5d5d", align: "left"}),
				desc:new  PIXI.Text('Join a global community of the most fascinating creators',{font: "35px FZLTXHK", fill: "#5d5d5d", align: "left"}),
				settings: {
					title: {
						x: renderer.width * 0.7,
						y: renderer.height * 0.6
					},
					desc: {
						x: renderer.width * 0.5,
						y: renderer.height * 0.7
					}
				}
			},
			{
				title:new PIXI.Text('FIND YOUR PEERS',{font: "35px FZLTZHK", fill: "#5d5d5d", align: "left"}),
				desc:new  PIXI.Text('Join a global community of the most fascinating creators',{font: "35px FZLTXHK", fill: "#5d5d5d", align: "left"}),
				settings: {
					title: {
						x: renderer.width * 0.5,
						y: renderer.height * 0.4
					},
					desc: {
						x: renderer.width * 0.6,
						y: renderer.height * 0.5
					}
				}
			}
		];
		
		//记录帧数，用于控制图片切换
		var frameCount = 0;
		//图片切换时的帧数	
		var switchFrameCount = 1000;
		var currentWelcomeSprite = 0;
		var prevWelcomeSprite = 4;
		var nextWelcomeSprite = 1;

		$.each(welcomes, function(i) {
			var dimension = getZoomDimension(1000, 616, renderer.width, renderer.height , 1);
			this.width = dimension.w;
			this.height = dimension.h;
			this.position.x = renderer.width / 2;
			this.position.y = renderer.height / 2;
			this.anchor.x = 0.5;
			this.anchor.y = 0.5;
			
			welcomesContainer[i].addChild(this);
		});
		
		function initWelcomesText() {
			$.each(welcomesText, function(i,item) {
				this.title.position.x = this.settings.title.x;
				this.title.position.y = this.settings.title.y;
				this.desc.position.x = this.settings.desc.x;
				this.desc.position.y = this.settings.desc.y;
				
				welcomesContainer[i].addChild(this.title);
				welcomesContainer[i].addChild(this.desc);
			});
		}
		initWelcomesText();
		
		function initWelcomesContainer() {
			$.each(welcomesContainer, function(i,item) {
				this.position.x = 0;
				this.position.y = 0;
				this.alpha = 0;
				
				var graphics = new PIXI.Graphics();
	
				// set a fill and line style
				graphics.beginFill(0xFF3300);
				graphics.lineStyle(1, 0x9a8461, 1);
				graphics.moveTo(0, (welcomesText[i].settings.title.y + welcomesText[i].settings.desc.y) / 2 );
				graphics.lineTo(renderer.width, (welcomesText[i].settings.title.y + welcomesText[i].settings.desc.y) / 2 );
				
				this.addChild(graphics);
				
				container.addChild(this);
			});
		}
		initWelcomesContainer();
		
		welcomesContainer[0].alpha = 1;
		
		
		container.position.x = 0;
		container.position.y = 0;

		stage.addChild(container);
		
		var initScaleX = welcomes[0].width / 1000;
		var initScaleY = welcomes[0].height / 616;
		var current = 0;
		var currentPercent = 0;
		function animate() {
			requestAnimFrame(animate);
			
			current = Math.floor(frameCount / switchFrameCount * 5 );
			currentPercent = (frameCount / switchFrameCount) * 5 - current;
			
			if(currentPercent <= 0.2) {
				welcomesContainer[current].alpha = (frameCount - current * switchFrameCount / 5) / (switchFrameCount / 5 * 0.2);
			}
			if(currentPercent >= 0.8) {
				welcomesContainer[current].alpha = 1 - (frameCount - (current + 0.8) * switchFrameCount / 5) / (switchFrameCount / 5 * 0.2);
			}
			
			frameCount ++;
			
			welcomes[current].scale.x = initScaleX + frameCount / switchFrameCount * 0.3;
			welcomes[current].scale.y = initScaleY + frameCount / switchFrameCount * 0.3;
			
			welcomesText[current].title.position.x = welcomesText[currentWelcomeSprite].settings.title.x + frameCount / switchFrameCount * 500;
			welcomesText[current].desc.position.x = welcomesText[currentWelcomeSprite].settings.desc.x - frameCount / switchFrameCount * 500;
			
			if(frameCount == switchFrameCount) {
				frameCount = 0;
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

