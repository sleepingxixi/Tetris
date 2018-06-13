var Local = function(){
	//游戏对象
	var game;
	//时间间隔
	var INTERVAL=500;
	//定时器
	var timer=null;
	//设置计数器
	var timeCounter=0;
	//设置时间
	var time=0;
	//绑定键盘事件
	var bindKeyEvent = function(){
		document.onkeydown = function(e){
			if(e.keyCode == 32){ //space
				game.down();
			}else if(e.keyCode == 37){ //left
				game.left();
			}else if(e.keyCode == 38){//up
				game.rotate();
			}else if(e.keyCode == 39){//right
				game.right();
			}else if(e.keyCode == 40){//down	
			    game.fall();
			}
		}
	}
	//方块下落
	var move = function(){
		timeFunc();
		if(!game.down()){
			game.fixed();
			var line=game.checkClear();
			if(line){
				game.addScore(line);
			}
			var gameOver=game.checkGameOver();
			if(gameOver){
				game.gameOver();
				stop();
			}else{
				game.performNext(generateType(),generateDir());
			}
		}
	}
	//计时函数
	var timeFunc = function(){
		timeCounter=timeCounter+1;
		if(timeCounter==2){
			timeCounter=0;
			time=time+1;
			game.setTime(time);
		}
	}
	//随机生成一个种类
	var generateType = function(){
		return Math.ceil(Math.random()*7)-1;
	}
	//随机生成一个旋转次数
	var generateDir = function(){
		return Math.ceil(Math.random()*4)-1;
	}
	//开始方法
	var start = function(){
		var doms = {
			gameDiv : document.getElementById('game'),
			nextDiv : document.getElementById('next'),
			timeDiv : document.getElementById('time'),
			scoreDiv : document.getElementById('score'),
			resultDiv : document.getElementById('gameOver')
		}
		game = new Game();
		game.init(doms,generateType(),generateDir());
		bindKeyEvent();
		game.performNext(generateType(),generateDir());
		timer=setInterval(move,INTERVAL);
	}
	//结束
	var stop = function(){
		//清除定时
		if(timer){
			clearInterval(timer);
			timer=null;
		}
		//清除键盘事件
		document.onkeydown=null;
	}
	//导出API
	this.start=start;

}