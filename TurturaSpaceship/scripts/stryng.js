function SummonStryng(content, position){
    const id = game_state.id_controller.stryng++;
    const stryng = {
        id,
        content,
        position,
        velocity: {q:0,r:0}, // 速度，q,r
    };
    game_state.stryngs[id] = stryng;
    game_state.map.stryngs[Hex.toString(position)] = id;
    return stryng;
}

function DrawStryng(stryng){
    Render.drawDotByHex(stryng.position, "#2868ff31", true, Config.hex_size * 0.4);
    const pixel = Hex.toPixel(stryng.position);
    ctx.fillStyle = "#000000";
    ctx.font = `${Config.hex_size * 0.4}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(stryng.content, pixel.x - Render.camera.x, pixel.y + Config.hex_size * 0.2 - Render.camera.y);
}