var ctx = document.getElementById("gameCanvas").getContext('2d');

var Render = {
    camera: {
        x: 0,
        y: 0
    },
    drawHexByPixel : function (x, y, color="#000000",camera_fix = false, fill=true) {
        if(fill){
            ctx.fillStyle = color;
        }else{
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
        }
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * (i + 0.5); // 30 degrees offset for flat-topped hexagons
            const px = x + Config.hex_size * Math.cos(angle) - camera_fix * Render.camera.x;
            const py = y + Config.hex_size * Math.sin(angle) - camera_fix * Render.camera.y;
            if (i === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.closePath();
        if(fill){
            ctx.fill();
        }else{
            ctx.stroke();
        }
    },
    drawHexByHex : function (hex, color="#000000",camera_fix = false, fill=true) {
        const pixel = Hex.toPixel(hex);
        Render.drawHexByPixel(pixel.x, pixel.y, color, camera_fix, fill);
    },
    drawDotByPixel : function (x, y, color="#000000",camera_fix = false, radius=2) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x - camera_fix * Render.camera.x, y - camera_fix * Render.camera.y, radius, 0, 2 * Math.PI);
        ctx.fill();
    },
    drawDotByHex : function (hex, color="#000000",camera_fix = false, radius=2) {
        const pixel = Hex.toPixel(hex);
        Render.drawDotByPixel(pixel.x, pixel.y, color, camera_fix, radius);
    }
}