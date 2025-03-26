const CONFIGS = {
    CANVAS_WIDTH: 1200,
    CANVAS_HEIGHT: 560,
    tick_per_second: 60,
    background_color: "blueviolet",
}
//initialize
//#region 
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
canvas.width = CONFIGS.CANVAS_WIDTH;
canvas.height = CONFIGS.CANVAS_HEIGHT;
let events = [];
canvas.addEventListener('click', (e) => {
    events.push(e);
});

//#endregion

/**
 * 二维空间的点，会作为 点 / 向量 / 复数 混用
 */
class Point {
    /**
     * @param {num} x 横坐标 / 水平分量 / 实部
     * @param {num} y 纵坐标 / 垂直分量 / 虚部
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * 向量加
     * @param {} other 
     * @returns 
     */
    static Add(p, q) { return new Point(p.x + q.x, p.y + q.y); }
    /**
     * 向量加
     * @param {} other 
     * @returns 
     */
    add(other) { return Point.Add(this, other); }
    /**
     * 向量反向
     * @param {} other 
     * @returns 
     */
    static Neg(p) { return new Point(-p.x, -p.y); }
    /**
     * 向量反向
     * @param {} other 
     * @returns 
     */
    neg() { return Point.Neg(this); }
    /**
     * 向量减
     * @param {} other 
     * @returns 
     */
    static Sub(p, q) { return Point.Add(p, Point.neg(q)); }
    /**
     * 向量减
     * @param {} other 
     * @returns 
     */
    sub(other) { return Point.sub(this, other); }
    /**
     * 向量数乘
     * @param {} other 
     * @returns 
     */
    scale(factor) { return new Point(this.x * factor, this.y * factor) }
    /**
     * 
     * @param {*} color fillStyle
     * @param {*} radius px
     */
    draw(color, radius = 5) {
        context.beginPath();
        context.arc(this.x, this.y, radius, 0, 7);
        context.fillStyle = color;
        context.fill();
    }
    /**
     * 从点击事件生成对应canvas坐标系的点击点
     * @param {MouseEvent} event 
     * @returns 
     */
    static ClickPosition(event) {
        let rect = canvas.getBoundingClientRect()
        // return new Point(
        //     event.clientX*CONFIGS.CANVAS_WIDTH/document.width,event.clientY
        // )
        let p = new Point(
            (event.clientX - rect.x) * CONFIGS.CANVAS_WIDTH / rect.width,
            (event.clientY - rect.y) * CONFIGS.CANVAS_HEIGHT / rect.height,
        );
        console.log(p);
        return p;
    }
    /**
     * 将自身的坐标更改为目标点的
     * @param {Point} other 
     */
    copy(other) {
        this.x = other.x;
        this.y = other.y;
    }
}

/**
 * 顶点定义的三角形
 */
class Triangle {
    /**
     * @param {Point} p1 顶点
     * @param {Point} p2 顶点
     * @param {Point} p3 顶点
     */
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    draw(color) {
        context.beginPath();//开始路径
        context.moveTo(this.p1.x, this.p1.y); //三角形，左顶点
        context.lineTo(this.p2.x, this.p2.y);//右顶点
        context.lineTo(this.p3.x, this.p3.y);//底部的点
        context.closePath();  //结束路径
        context.fillStyle = color;
        context.fill();
    }
    /**
     * 
     * @returns {Point} 重心
     */
    get_mass_point(){
        return this.p1.add(this.p2).add(this.p3).scale(1 / 3);
    }
}

let points = [
    new Point(111, 222),
    new Point(333, 444),
    new Point(10, 333),
];
let tri = new Triangle(
    points[0],
    points[1],
    points[2],
)

let idx = 0;
function mainloop() {
    context.beginPath();//开始路径
    context.rect(0,0,CONFIGS.CANVAS_WIDTH,CONFIGS.CANVAS_HEIGHT)
    context.fillStyle = CONFIGS.background_color;
    context.fill();

    if (events.length) {
        points[idx].copy(
            Point.ClickPosition(events.shift())
        );
        idx = (idx + 1) % 3;
    }

    tri.draw("white");
    tri.get_mass_point().draw("black");
}

setInterval(mainloop, 1000 / CONFIGS.tick_per_second);