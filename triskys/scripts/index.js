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
 * 
 * 顶点是可变的，导出量需动态生成，可信时可用动态生成缓存
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
        this.mass_point = this.get_mass_point(); //赋值是多余的，但是谁叫它好看呢
        this.area = this.get_area();
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
     * 获取并更新重心
     * @returns {Point} 重心
     */
    get_mass_point(){
        this.mass_point = this.p1.add(this.p2).add(this.p3).scale(1 / 3);
        return this.mass_point;
    }
    /**
     * 获取并更新面积
     * @returns {Point} 面积
     */
    get_area(){
        this.area = 0.5*Math.abs(
            +this.p1.x*(this.p2.y-this.p3.y)
            +this.p2.x*(this.p3.y-this.p1.y)
            +this.p3.x*(this.p1.y-this.p2.y)
        );
        return this.area;
    }
}

/**
 * 三角形物质
 * 
 * 不具备完整的物理属性，用于记录一块物质的一部分的材质，状态等
 * 
 * 执行化学职能
 */
class MatterTri {
    /**
     * 
     * @param {Triangle} tri 几何三角形
     * @param {number} density 密度 (暂定，之后可能降格为导出量，并上位替代为材质)
     */
    constructor(tri,density){
        this.tri=tri;
        this.density=density;
        
    }
    /**
     * 获取并更新质量
     * @returns {number} mass
     * 注意：使用了缓存this.tri.mass
     */
    get_mass(){
        this.mass = this.tri.area * this.density //一般来说，三角形的面积不会改变。这是因为三角形的形状一般不变，因为与其改变形状，我们更倾向于重做三角形
        return this.mass;
    }
}

/**
 * 一块物质刚体
 * 
 * 具有刚体应有的空间性质，与世界进行物理交互
 * 
 * 执行物理职能
 * 
 * 注意：直接修改三角形物质列表不会触发导出量的更新，建议使用<没做好的函数>
 */
class MatterMesh {
    /**
     * 
     * @param {MatterTri[]} mattertri_list 存储三角形物质的列表
     */
    constructor(mattertri_list){
        this.mattertri_list = mattertri_list
        this.mass = this.get_mass();
        this.mass_point = this.get_mass_point();
    }
    get_mass(){
        this.mass = 0;
        for(let mattertri of this.mattertri_list){
            this.mass += mattertri.mass;
        }
        return this.mass;
    }
    get_mass_point(){
        this.mass_point = new Point(0,0);
        for(let mattertri of this.mattertri_list){
            this.mass_point = this.mass_point.add(mattertri.tri.mass_point.scale(mattertri.mass));
        }
        this.mass_point = this.mass_point.scale(1/this.get_mass());
        return this.mass_point;
    }
}

let points = [
    new Point(1, 0),
    new Point(2, 1),
    new Point(0, 2),
];
let tri = new Triangle(
    points[0],
    points[1],
    points[2],
)

function draw_background(){
    context.beginPath();//开始路径
    context.rect(0,0,CONFIGS.CANVAS_WIDTH,CONFIGS.CANVAS_HEIGHT)
    context.fillStyle = CONFIGS.background_color;
    context.fill();
}

let idx = 0;
function mainloop() {
    draw_background();

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