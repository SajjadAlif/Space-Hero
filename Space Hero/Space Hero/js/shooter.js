/**
 * Shooter 
 **/

  "use strict";

  class Shooter{

 	constructor(props){

 		this.counter= 0;
 		this.fireRate= 5;
 		this.bullets = [];
 		this.reScaledY = 0;
 		this.bulletCount = 0;
 		this.bulletAngle = 90;
 		this.bendingAngle = 0;
 		this.ctx	= props.ctx;
 		this.$parent= props.$parent;
 		this.x 	 	= props.x || 100;
 		this.y 		= props.y || 100;
 		this.dx 	= props.dx || 0;
 		this.dy 	= props.dy || -1;
 		this.life 	= props.life || 2;
 		this.speed 	= props.speed || 15;
 		this.width 	= props.width || 100;
 		this.height = props.height || 100;
 		this.canvasWidth	= props.canvasWidth;
 		this.canvasHeight	= props.canvasHeight;

 		this.shooterLoaded = false;
 		this.shooterImage = null;
 		
 		// SPRITE ANIMATION OF SHOOTER
 		this.totalframes = 5;
 		// this.totalframes = 79;
 		this.currentframe =  1;
 		this.marioTimer = null;


 	};

 	// DRAW UFOS
 	drawShooter(){
 	
 		if(this.shooterLoaded){
			
			this.currentframe++; 		  
 		   	
 		   	// this.ctx.drawImage(this.$shooterImage, this.x, this.y, this.width, this.height);
 		   	let cache = this;

 		   	this.ctx.save(); 
  			this.ctx.translate(cache.x, cache.y); //let's translate
            this.ctx.rotate(Math.PI / 180 * (this.bendingAngle));
  			this.ctx.drawImage(
  				this.$shooterImage, 
  				this.currentframe*this.width, 
  				0, this.width, 
  				this.height, 
  				-cache.x/8+100, 
  				-cache.y/4+100, 
  				this.width, 
  				this.height
  			);
  			this.ctx.restore();
  
			if(this.currentframe >= this.totalframes){
				
				this.currentframe = 0;
			}
		
 		}else{
 		
 			console.log("Shooter image not loaded");
 		}
		
 	};

 	// LOAD UFOS
 	loadShooter(){

 		this.$shooterImage = new Image();
	 	this.$shooterImage.src = "images/shooteronfire.png";

 		if(!this.shooterLoaded){
 						
			this.$shooterImage.onload = function(){
	
				this.shooterLoaded = true;
		      
	    	}.bind(this);
 				
 		}
 	};

 	// DRAW SHOOTER USING DIV
 	drawShooterDiv(){

 		let $shooter = document.createElement("div");
 		$shooter.style.width = this.width + "px";
 		$shooter.style.height = this.height + "px";
 		$shooter.style.backgroundColor = "red";
 		$shooter.style.className = "shooter";

 		this.$parent.appendChild($shooter);
 	};

 	// MOVE THE SHOOTER
 	flyShooter(){

 		this.counter ++;

 		if (KEY_STATUS.left || KEY_STATUS.right ||
			KEY_STATUS.down || KEY_STATUS.up) {
			// The ship moved, so erase it's current image so it can
			// be redrawn in it's new location
			this.ctx.clearRect(this.x, this.y, this.width, this.height);
			
			// Update x and y according to the direction to move and
			// redraw the ship. Change the else if's to if statements
			// to have diagonal movement.
			if (KEY_STATUS.left) {
				this.x -= this.speed
				if (this.x <= 0) // Keep player within the screen
					this.x = 0;

				if (this.bendingAngle <= 42) this.bendingAngle += 1;

				if(this.x < this.canvasWidth/2 - 60 && this.bendingAngle <= 42 ){
					this.y-=4;
					this.reScaledY++;
				} 

			} else if (KEY_STATUS.right) {
				this.x += this.speed
				if (this.x >= this.canvasWidth - this.width)
					this.x = this.canvasWidth - this.width;

					if(this.bendingAngle >=-39) this.bendingAngle -=1;

					if(this.x < this.canvasWidth/2 - 60 ) {
						this.y+=4;
						this.reScaledY--;
					}
			} else if (KEY_STATUS.up) {
				this.y -= this.speed
				if (this.y <= this.canvasHeight/4*2.3)
					this.y = this.canvasHeight/4*2.3;

				this.$shooterImage.height -=2;

			} else if (KEY_STATUS.down) {
				this.y += this.speed
				if (this.y >= this.canvasHeight - this.height)
					this.y = this.canvasHeight - this.height;

			}
		}
		if (KEY_STATUS.space && this.counter >= this.fireRate) {
				
			this.counter = 0;
			// alert(this.counter);
			let bullet = this.fireBullet();

			return true;
		}
 	};

 	// CREATE BULLET AND FIRE
 	fireBullet(){

 		this.bullets[this.bulletCount] = new Bullet({

 			width 	: 20,
 			height 	: 20,
 			ctx		: this.ctx,
 			y		: this.y - 50,
 			canvasWidth : this.canvasWidth,
 			canvasHeight : this.canvasHeight,
 			x		: this.x + (this.width/8) + (this.bendingAngle * 2),
 		});

 		this.bullets[this.bulletCount].loadImages();
 		this.bullets[this.bulletCount].fire(this.bendingAngle);

 		this.bulletCount ++;
		destroyedSound.play();

 		return true;
 	};

 	// CHECK BULLET AND CALL MOVEBULLET
 	moveBullet(ufos){
		let newArr = [];
		// let score =0;

 		this.bullets.forEach(function(bullet){
 			
 			if (bullet.width <= 0 || bullet.bulletHitUfo(ufos)) {

 				this.bullets.splice(bullet, 1);
 				// score = bullet.getScore();

 			} else {

   		    	bullet.moveBullet(this.bendingAngle);	
   		    	newArr.push(bullet);
			}

 		}.bind(this));

 		this.bullets = newArr;
 		// return score;
 		// console.log(this.bullets.length);
 	};

 	
 	
}