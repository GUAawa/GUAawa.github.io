const aquarium = document.getElementById('aquarium');
// 矩形范围
let width = aquarium.offsetWidth;
let height = aquarium.offsetHeight;

setInterval(()=>{
    width = aquarium.offsetWidth;
    height = aquarium.offsetHeight;
},5000); //防止变化大小

let last_refresh_time = Date.now();

class Shellfish{
    constructor(sf){
        //basic
        this.sf = sf;
        //element
        this.div = document.createElement('div')
        this.div.className = "shellfish";
        this.div.innerHTML = sf;
        aquarium.appendChild(this.div);
        //physics
        this.x = Math.random()*width;
        this.y = Math.random()*height;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.direction = -1 //-1左 1右
    }
    refreshPhysics(deltatime){
        this.x += this.velocity_x * deltatime;
        this.y += this.velocity_y * deltatime;
        if(this.x < 0) {this.x = 0; this.velocity_x = 0}
        if(this.x > width) {this.x = width; this.velocity_x = 0}
        if(this.y < 0) {this.y = 0; this.velocity_y = 0}
        if(this.y > height) {this.y = height; this.velocity_y = 0}
        
        this.velocity_x += (Math.random()*2-1) * deltatime *0.0001;
        this.velocity_y += (Math.random()*2-1) * deltatime *0.0001;
        //不更新direction，因为这个要配合css转向，具有last_flag意义的性质
    }
    refreshDisplay(){
        this.div.style.left = this.x + 'px';
        this.div.style.top = this.y + 'px';
    }
    refresh(deltatime){
        this.refreshPhysics(deltatime);
        this.refreshDisplay();
    }
}

let shellfishes = [];
shellfishes.push(new Shellfish(":D<"))
shellfishes.push(new Shellfish(":D<"))
shellfishes.push(new Shellfish(":D<"))
shellfishes.push(new Shellfish(":D<"))
shellfishes.push(new Shellfish(":D<"))

setInterval(()=>{
    const now = Date.now();
    const deltatime = now - last_refresh_time;
    last_refresh_time = now;
    for(let shellfish of shellfishes){
        shellfish.refresh(deltatime);
    }
},100)