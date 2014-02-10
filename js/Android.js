var Android = function() {
	this.android = document.getElementById('android');
	this.clearAnimWalking = null; 
	this.posX = 0;
	this.posY = 0;
	this.counter = 0;
	this.direction = 'right';
};

Android.prototype = {
	'moveTo' : function(direction) {
		var dir = direction;
		var clearDirection = dir === 'left' ? 'right' : 'left';
		var that = this;
		this.android.classList.add('walking_' + direction);
		this.android.classList.remove('walking_' + clearDirection);
		this.android.classList.remove('waving');
		clearInterval(this.clearAnimWalking);	
		this.clearAnimWalking = setInterval(function(){
			var translate = 'translate( ' + that.posX + 'px, ' + that.posY + 'px)';
			var prefixes = 'transform webkitTransform MozTransform OTransform msTransform'.split(' ');
			for(var i = 0; i < prefixes.length; i++){
				if(that.android.style[prefixes[i]] !== undefined) {
					that.android.style[prefixes[i]] = translate;
				}
			}
			if(that.posX >= document.body.clientWidth) {
				dir = 'left';
				that.android.classList.add('walking_left');
				that.android.classList.remove('walking_right');
			} 
			if(that.posX <= 0) {
				dir = 'right';
				that.android.classList.add('walking_right');
				that.android.classList.remove('walking_left');
			} 
			that.posX = dir === 'left' ? that.posX - 1.618 : that.posX + 1.618;
			that.posY = Math.cos(that.counter);
			that.counter += 0.168;
		},30);
	},
	'wave' : function() {
		var that = this;
		clearInterval(this.clearAnimWalking);
		this.android.classList.add('waving');
		this.android.classList.remove('walking_left');
		this.android.classList.remove('walking_right');
	},
	'reset' : function(top){
		this.android.style.top = top + 'px';
		var translateCenter = document.body.clientWidth / 2;
		var prefixes = 'transform webkitTransform MozTransform OTransform msTransform'.split(' ');
		var animations = 'waving walking_left walking_right'.split(' ');
		for(var i = 0; i < animations.length; i++){
			this.android.classList.remove(animations[i]);
		}
		for(var i = 0; i < prefixes.length; i++){
			if(this.android.style[prefixes[i]] !== undefined) {
				this.android.style[prefixes[i]] = 'translateX(' + translateCenter + 'px)';
			}
		}
		this.android.style.opacity = 1;
		this.posX = translateCenter;
		this.posY = 0;
		clearInterval(this.clearAnimWalking);
	}
};

function init(){
	var android = new Android();
	var logo = document.getElementById('logo');
	android.reset(logo.clientHeight - 72);
	setInterval(function(){
		var action = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
		switch(action){
			case 1: android.wave(); break;
			case 2: android.moveTo('right'); break;
			case 3: android.moveTo('left'); break;
		}
	},3000);
	window.onresize = function(evt) {
		android.reset(logo.clientHeight - 72);
	}
}
