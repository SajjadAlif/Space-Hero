// SOUND WHILE HITTING BALL
function GameSound(src, volume = 1) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
        this.sound.volume = volume;
    }
    this.stop = function(){
        this.sound.pause();
    }    
}