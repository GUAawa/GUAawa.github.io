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
    Abed: (position) => {
        const building = {
            type: "Abed",
            position,
            id: game_state.id_controller.building++,
            class: "Bed"
        };
        game_state.buildings[building.id] = building;
        game_state.map.buildings[Hex.toString(position)] = building.id;
        SearchCatalyst(building);
        return building;
    },
    Ibed: (position) => {
        const building = {
            type: "Ibed",
            position,
            id: game_state.id_controller.building++,
            class: "Bed"
        };
        game_state.buildings[building.id] = building;
        game_state.map.buildings[Hex.toString(position)] = building.id;
        SearchCatalyst(building);
        return building;
    },
    Qbed: (position) => {
        const building = {
            type: "Qbed",
            position,
            id: game_state.id_controller.building++,
            class: "Bed"
        };
        game_state.buildings[building.id] = building;
        game_state.map.buildings[Hex.toString(position)] = building.id;
        SearchCatalyst(building);
        return building;
    },
}

function SearchCatalyst(building){
    // 检测有没有符合催化剂的基座阵列，允许旋转
    const catalyst_patterns = CatalystPatternRelative[building.type];
    if (!catalyst_patterns) return;
    for (const {name,pattern} of catalyst_patterns) {
        // 检查附近的基座是否满足该图案
        let success = true;
        for (const bed of pattern){
            const position = Hex.add(building.position, bed.position);
            // 尝试获取该基座
            const target_id = game_state.map.buildings[Hex.toString(position)];
            if (target_id === undefined) {
                success = false;
                break;
            }
            if (game_state.buildings[target_id].type !== bed.type) {
                success = false;
                break;
            }
        }
        if (!success) continue;
        // 录入催化剂
        const catalyst_id = game_state.id_controller.catalyst++;
        const catalyst = {
            id: catalyst_id, // 催化剂id
            name: name, // 类型
            beds: {}
        } // 催化剂的类型，所选的取向，相对位置
        for (const bed of pattern){
            const position = Hex.add(building.position, bed.position);
            const target_id = game_state.map.buildings[Hex.toString(position)];
            const target = game_state.buildings[target_id];
            // 把建筑压入催化剂
            catalyst.beds[bed.role] = target_id; // 基座的类型，相对位置
            // 让催化剂的组成部分滴血认主，方便拆除
            if (!target.catalysts) target.catalysts = [];
            target.catalysts.push(catalyst_id);
        }
        // 总游戏
        game_state.catalysts[catalyst_id] = catalyst;
        console.log("找到催化剂", catalyst);
    }
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
    },
    Abed: (building) => {
        Render.drawHexByHex(building.position, "#542828", true, true);
        const pixel = Hex.toPixel(building.position);
        ctx.fillStyle = "#0000007d";
        ctx.font = `${Config.hex_size * 1.4}px Arial Bold`;
        ctx.textAlign = "center";
        ctx.fillText("A", pixel.x - Render.camera.x, pixel.y + Config.hex_size * 0.5 - Render.camera.y);
    },
    Ibed: (building) => {
        Render.drawHexByHex(building.position, "#284f54", true, true);
        const pixel = Hex.toPixel(building.position);
        ctx.fillStyle = "#0000007d";
        ctx.font = `${Config.hex_size * 1.4}px Arial Bold`;
        ctx.textAlign = "center";
        ctx.fillText("I", pixel.x - Render.camera.x, pixel.y + Config.hex_size * 0.5 - Render.camera.y);
    },
    Qbed: (building) => {
        Render.drawHexByHex(building.position, "#425428", true, true);
        const pixel = Hex.toPixel(building.position);
        ctx.fillStyle = "#0000007d";
        ctx.font = `${Config.hex_size * 1.4}px Arial Bold`;
        ctx.textAlign = "center";
        ctx.fillText("Q", pixel.x - Render.camera.x, pixel.y + Config.hex_size * 0.5 - Render.camera.y);
    },
}

function GetBuildingType(position){
    const building_id = game_state.map.buildings[Hex.toString(position)];
    if(building_id === undefined) return null;
    return game_state.buildings[building_id].type;
}