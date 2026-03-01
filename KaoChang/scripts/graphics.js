var load_img = function(callback){
    var images = {}
    images.kaochang = new Image()
    images.kaochang.src = "./images/kaochang.png"

    var check_load_img_ok = setInterval(()=>{
        if(images.kaochang.complete){
            clearInterval(check_load_img_ok)
            // alert("图片加载完毕！")
            callback()
        }
    },100)
    return images
}

// 动画管理器，仅处理画面
class Anime{
    constructor(image,x,y,width,height,frame_amount,interval,start_time){
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.frame_amount = frame_amount
        this.interval = interval
        this.start_time = start_time
    }
    display(x,y,time){
        const frame_index = Math.floor((time - this.start_time)/this.interval % this.frame_amount)
        console.log(frame_index)
        graphics.ctx.drawImage(this.image,this.x,this.y+frame_index*this.height,this.width,this.height,x,y,this.width,this.height)
    }
}

// 负责处理游戏数据和画面
class Graphics{
    constructor(){
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
    }
}
