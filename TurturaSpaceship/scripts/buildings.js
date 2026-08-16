var ConstructBuilding = {
    Vortexer : (position) => {
        const building = {
            type: "Vortexer",
            position,
            id: game_state.id_controller.building++,
            class: "Transporter",
            is_obstacle: true,
        };
        game_state.buildings[building.id] = building;
        game_state.map.buildings[Hex.toString(position)] = building.id;
        return building;
    },
    Repulser : (position) => {
        const building = {
            type: "Repulser",
            position,
            id: game_state.id_controller.building++,
            class: "Transporter",
            is_obstacle: true,
        };
        game_state.buildings[building.id] = building;
        game_state.map.buildings[Hex.toString(position)] = building.id;
        return building;
    },
    Slide : (position) => {
        const building = {
            type: "Slide",
            position,
            id: game_state.id_controller.building++,
            class: "Slide"
        };
        game_state.buildings[building.id] = building;
        game_state.map.buildings[Hex.toString(position)] = building.id;
        return building;
    },
}

var Transport = {
    Vortexer : (building) => {
        // 检测周围一圈的链素，对其施加逆时针切向力
        const force_table = [
            {rel_pos:{q:1,r:0},force:{q:0,r:-1}},
            {rel_pos:{q:0,r:1},force:{q:1,r:-1}},
            {rel_pos:{q:1,r:-1},force:{q:-1,r:0}},
            {rel_pos:{q:0,r:-1},force:{q:-1,r:1}},
            {rel_pos:{q:-1,r:0},force:{q:0,r:1}},
            {rel_pos:{q:-1,r:1},force:{q:1,r:0}},
        ]
        for (const entry of force_table) {
            const target_pos = Hex.add(building.position, entry.rel_pos);
            const target_id = game_state.map.stryngs[Hex.toString(target_pos)];
            if (target_id === undefined) continue;
            game_state.stryngs[target_id].velocity.q += entry.force.q;
            game_state.stryngs[target_id].velocity.r += entry.force.r;
        }
    },
    Repulser : (building) => {
        // 检测周围一圈的链素，对其施加向外推力
        const force_table = [
            {rel_pos:{q:1,r:0},force:{q:1,r:0}},
            {rel_pos:{q:0,r:1},force:{q:0,r:1}},
            {rel_pos:{q:1,r:-1},force:{q:1,r:-1}},
            {rel_pos:{q:0,r:-1},force:{q:0,r:-1}},
            {rel_pos:{q:-1,r:0},force:{q:-1,r:0}},
            {rel_pos:{q:-1,r:1},force:{q:-1,r:1}},
        ]
        for (const entry of force_table) {
            const target_pos = Hex.add(building.position, entry.rel_pos);
            const target_id = game_state.map.stryngs[Hex.toString(target_pos)];
            if (target_id === undefined) continue;
            game_state.stryngs[target_id].velocity.q += entry.force.q;
            game_state.stryngs[target_id].velocity.r += entry.force.r;
        }
    },
}

var DrawBuilding = {
    Vortexer : (building) => {
        Render.drawHexByHex(building.position, "#ffd036", true, true);
        Render.drawHexByHex(building.position, "#000000", true, false);
        //写字
        const pixel = Hex.toPixel(building.position);
        ctx.fillStyle = "#000000";
        ctx.font = `${Config.hex_size * 0.8}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("🔄", pixel.x - Render.camera.x, pixel.y + Config.hex_size * 0.3 - Render.camera.y);
    },
    Repulser : (building) => {
        Render.drawHexByHex(building.position, "#36ffa1", true, true);
        Render.drawHexByHex(building.position, "#000000", true, false);
        //写字
        const pixel = Hex.toPixel(building.position);
        ctx.fillStyle = "#000000";
        ctx.font = `${Config.hex_size * 0.8}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("🗯️", pixel.x - Render.camera.x, pixel.y + Config.hex_size * 0.3 - Render.camera.y);
    },
    Slide : (building) => {
        Render.drawHexByHex(building.position, "#36f2ff", true, true);
    }
}

function GetBuildingType(position){
    const building_id = game_state.map.buildings[Hex.toString(position)];
    if(building_id === undefined) return null;
    return game_state.buildings[building_id].type;
}