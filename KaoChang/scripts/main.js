const canvas_width = 400
const canvas_height = 300

const images = load_img(init_game)
function init_game(){
    // alert("init_game函数执行了！")
    globalThis.graphics = new Graphics()

    globalThis.animation = new Anime(images.kaochang,0,0,64,32,4,1000,0)


    setInterval(loop,1000/60)
}

function loop(){
    // alert("loop函数执行了！")
    graphics.ctx.clearRect(0,0,canvas_width,canvas_height)
    animation.display(45,100,new Date().getTime())
}