/**
 * drawing the 3d background
 */

 "use strict";

class Backgroun3d{

	constructor(props){

		this.MAX_SPEED = 32;
		this.ctx	= props.ctx;
		this.width = props.width;
		this.height = props.height;
		this.stars = new Array(512);

		// BINDING THIS FOR ACCESSING THIS IN THOSE FUNCTION
		this.initStars = this.initStars.bind(this);
		this.animateStars = this.animateStars.bind(this);
	};

	// DRAWING THE BACKGROUND
	drawBackground(shooter) {
	
		if (this.ctx) {
			
			this.animateStars(shooter);
		}
	};

	// RETURNS THE RANDOM NUMBER BETWEEN MIN AND MAX
	randomRange(minVal,maxVal) {
     	return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
    };
 
	// CREATION OF this.stars
	initStars() {
		for( let i = 0; i < this.stars.length; i++ ) {
			this.stars[i] = {
				x: this.randomRange(-25,25),
				y: this.randomRange(-25,25),
				z: this.randomRange(1,this.MAX_SPEED)
			}
			// console.log(this.stars[i])
		}
	};

	// LOOPING THE STARS
	animateStars(shooter) {

		let halfWidth  = this.width / 2;
		let halfHeight = this.height / 2;
		
		this.ctx.fillStyle = "rgb(0,0,0)";
		this.ctx.fillRect(0, 0, this.width, this.height);

	    for( let i = 0; i < this.stars.length; i++ ) {
			
			this.stars[i].z -= 0.2;
			// shooter.drawShooter();
			if( this.stars[i].z <= 0 ) {

				this.stars[i].x = this.randomRange(-25,25);
				this.stars[i].y = this.randomRange(-25,25);
				this.stars[i].z = this.MAX_SPEED;
			}

			let k  = 128 / this.stars[i].z;
			let px = this.stars[i].x * k + halfWidth;
			let py = this.stars[i].y * k + halfHeight - 50;

			if( px >= 0 && px <= this.width && py >= 0 && py <= this.height ) {

				let size = (1 - this.stars[i].z / 32.0) * 2;
				let shade1 = parseInt((1 - this.stars[i].z / 32) * 300);
				let shade2 = parseInt((1 - this.stars[i].z / 10) * 300);
				let shade3 = parseInt((1 - this.stars[i].z / 100) * 300);

				this.ctx.beginPath();

				// this.ctx.fillStyle = "rgb(255, 255, 255)";
				// this.ctx.arc(px+2, py+2, Math.abs(size), 0, 2*Math.PI);
				// this.ctx.fill();

				this.ctx.fillStyle = "rgb(" + shade1 + "," + shade2 + "," + shade3 + ")";
				this.ctx.arc(px, py, Math.abs(size), 0, 2*Math.PI);
				this.ctx.fill();

			}
			// this.ctx.clearRect(px, py, size, size);
		}

    };
}