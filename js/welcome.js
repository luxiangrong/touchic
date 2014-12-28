;( function($) {
		function getZoomDimension(w1, h1, w2, h2, scale) {
			var rateW = w1 / w2;
			var rateH = h1 / h2;

			var rate = rateW < rateH ? rateW : rateH;
			rate /= scale;

			return {
				w : w1 / rate,
				h : h1 / rate
			};
		}

		function getScale(w1, h1, w2, h2, scale) {
			var rateW = w1 / w2;
			var rateH = h1 / h2;

			var rate = rateW < rateH ? rateW : rateH;

			return 1 / rate * scale;
		}
		
		var winHeight = $(window).height();
		var winWidth = $(window).width();

		//PIXI舞台
		var stage = new PIXI.Stage(0xEEEEEE);
		// 创建一个渲染器
		var renderer = new PIXI.autoDetectRenderer(winWidth, winHeight - 40);
		// 将渲染器插入Dom中
		$("#welcome").append(renderer.view);

		var container = new PIXI.DisplayObjectContainer();

		var picWidth = 1000;
		var picHeight = 616;

		var settings = [
			{
				pic : {
					path : 'images/welcome_01.jpg',
					width : 1000,
					height : 616
				},
				text : {
					pos : {
						x : 0.2,
						y : 0.1
					},
					title : 'FIND YOUR PEERS',
					description : 'Join a global community of the \n most fascinating creators'
				}
			},
			{
				pic : {
					path : 'images/welcome_02.jpg',
					width : 1000,
					height : 616
				},
				text : {
					pos : {
						x : 0.1,
						y : 0.4
					},
					title : 'CREATE YOUR OWN GROUP',
					description : 'Create your own group \n of followers or join one \n according to your \n interest.'
				}
			},
		];

		for (var i = 0; i < settings.length; i ++) {
			var itemContainer = new PIXI.DisplayObjectContainer();
			container.addChild(itemContainer);

			var picSprite = PIXI.Sprite.fromImage(settings[i].pic.path);
			var dimension = getZoomDimension(settings[i].pic.width, settings[i].pic.height, renderer.width, renderer.height, 1);
			picSprite.width = dimension.w;
			picSprite.height = dimension.h;
			picSprite.position.x = renderer.width / 2;
			picSprite.position.y = renderer.height / 2;
			picSprite.anchor.x = 0.5;
			picSprite.anchor.y = 0.5;
			
			itemContainer.addChild(picSprite);
			
			var titleText = new PIXI.Text(settings[i].text.title, {font: '23px FZLTZH', fill: '#3a3a3a'});
			titleText.position.x = settings[i].text.pos.x * renderer.width;
			titleText.position.y = settings[i].text.pos.y * renderer.height;
			
			var descriptionText = new PIXI.Text(settings[i].text.description, {font: '23px FZLTXH', fill: '#5d5d5d' });
			descriptionText.position.x = settings[i].text.pos.x * renderer.width  + 100;
			descriptionText.position.y = settings[i].text.pos.y * renderer.height + 50;
			
			var lQuoteText = new PIXI.Text("“", {font: '48px FZLTTH', fill: '#3a3a3a'});
			lQuoteText.position.x = descriptionText.position.x - 60;
			lQuoteText.position.y = descriptionText.position.y;
			
			var rQuoteText = new PIXI.Text("”", {font: '48px FZLTTH', fill: '#3a3a3a'});
			rQuoteText.position.x = descriptionText.position.x + descriptionText.width - 20;
			rQuoteText.position.y = descriptionText.position.y + descriptionText.height - 30;
			
			var descriptionTextContainer = new PIXI.DisplayObjectContainer();
			descriptionTextContainer.addChild(descriptionText);
			descriptionTextContainer.addChild(lQuoteText);
			descriptionTextContainer.addChild(rQuoteText);
			
			var titleTextContainer = new PIXI.DisplayObjectContainer();
			titleTextContainer.addChild(titleText);
			itemContainer.addChild(titleTextContainer);
			itemContainer.addChild(descriptionTextContainer);
			
			var graphics = new PIXI.Graphics();
			graphics.beginFill(0x9d8764);
			graphics.lineStyle(1, 0x9d8764, 1);
			graphics.moveTo(0,settings[i].text.pos.y * renderer.height + 40);
			graphics.lineTo(renderer.width, settings[i].text.pos.y * renderer.height + 40);
			itemContainer.addChild(graphics);
			
			itemContainer.alpha = 0;
		}

		//记录帧数，用于控制图片切换
		var currentFrame = 0;
		// 一次循环的帧数
		var totalFrame = 200;
		var curr = 0;
		

		container.position.x = 0;
		container.position.y = 0;
		
		stage.addChild(container);

		var alphaPercent = 0.4;
		var initTitleX,initDescriptionX;
		function animate() {
			renderer.render(stage);
			var diviFrameCount = totalFrame / settings.length;
			curr = Math.floor(currentFrame / totalFrame * settings.length);
			var currItemContainer = container.getChildAt(curr);
			
			currPercent = (currentFrame - diviFrameCount * curr) / diviFrameCount;
			
			
			if(currPercent <= alphaPercent) {
				currItemContainer.alpha = (currentFrame - diviFrameCount * curr) / diviFrameCount / alphaPercent;
			}
			
			if(currPercent >= 0.6) {
				currItemContainer.alpha = 1 - (currentFrame - diviFrameCount * curr) / diviFrameCount / alphaPercent;
			}
			
			currItemContainer.getChildAt(1).position.x = -(currentFrame % diviFrameCount * 0.3);
			currItemContainer.getChildAt(2).position.x = (currentFrame % diviFrameCount * 0.3);
			
			currentFrame ++;
			if(currentFrame == totalFrame ) {
				currentFrame = 0;
				currItemContainer.alpha = 0;
			}
			
			requestAnimFrame(animate);
		}
		requestAnimFrame(animate);
	}(jQuery));

