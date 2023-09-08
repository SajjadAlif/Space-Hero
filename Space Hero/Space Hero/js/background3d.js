/**
 * drawing the 3d background
 */

 "use strict";

function Backgroun3d(props){

	// constructor(props){

		this.width = props.width;
		this.height = props.height;
		this.MAX_DEPTH = 32;
    	this.stars = new Array(512);
		let canvas = document.getElementById('background');
		let ctx = canvas.getContext('2d');
		let thisGame = this;
	// }

	// DRAWING THE BACKGROUND
	thisGame.drawBackground = function() {
	
		if (canvas.getContext) {

			thisGame.initStars();
			setInterval(thisGame.loop,33);
		    // ctx.fillRect(0, 0, 1200, 1200);
		    // ctx.clearRect(100, 45, 60, 60);
		    // ctx.strokeRect(50, 50, 50, 50);
		}
	}

	// RETURNS THE RANDOM NUMBER BETWEEN MIN AND MAX
	thisGame.randomRange = function(minVal,maxVal) {
     	return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
    }
 
	// CREATION OF thisGame.stars
	thisGame.initStars = function() {
		for( let i = 0; i < thisGame.stars.length; i++ ) {

			thisGame.stars[i] = {
				x: thisGame.randomRange(-25,25),
				y: thisGame.randomRange(-25,25),
				z: thisGame.randomRange(1,thisGame.MAX_DEPTH)
			}
		}
	}

	// LOOPING THE STARS
	thisGame.loop = function() {

		let halfWidth  = canvas.width / 2;
		let halfHeight = canvas.height / 2;

		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0,0, canvas.width, canvas.height);

	    for( let i = 0; i < thisGame.stars.length; i++ ) {
			
			thisGame.stars[i].z -= 0.2;

			if( thisGame.stars[i].z <= 0 ) {
				thisGame.stars[i].x = thisGame.randomRange(-25,25);
				thisGame.stars[i].y = thisGame.randomRange(-25,25);
				thisGame.stars[i].z = thisGame.MAX_DEPTH;
			}

			let k  = 128.0 / thisGame.stars[i].z;
			let px = thisGame.stars[i].x * k + halfWidth;
			let py = thisGame.stars[i].y * k + halfHeight;

			if( px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height ) {
				
				let size = (1 - thisGame.stars[i].z / 32.0) * 5;
				let shade = parseInt((1 - thisGame.stars[i].z / 32.0) * 255);
				ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
				ctx.fillRect(px,py,size,size);
			}
		}
    }
}