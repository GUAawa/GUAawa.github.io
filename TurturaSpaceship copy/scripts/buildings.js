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
        // 这个基座以后是要做催化剂控制器的！现在暂时不实现
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
        // 这个基座以后是要做催化剂控制器的！现在暂时不实现
        console.log("Ibed 实现未完全")
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
        // 这个基座不做任何催化剂的控制器
        return building;
    },
}

function SearchCatalyst(building){
    // 检测有没有符合催化剂的基座阵列，允许旋转
    const catalyst_patterns = CatalystPatterns[building.type]
    if(catalyst_patterns === undefined) return;
    // 遍历每种催化剂
    for (const catalyst_name in catalyst_patterns){
        const catalyst_pattern_origin = catalyst_patterns[catalyst_name]; // 正放的催化剂
        // 旋转催化剂
        for (let i = 0; i < 6; i++){ // 旋转次数
            const catalyst_pattern = {};
            for (const role in catalyst_pattern_origin) {
                const bed_origin = catalyst_pattern_origin[role];
                const bed_origin_rel_pos = bed_origin.rel_pos;
                const bed_rel_pos = Hex.rotate(bed_origin_rel_pos, i);
                const bed = {
                    type: bed_origin.type, // 基座类型
                    rel_pos: bed_rel_pos, // 旋转后的坐标
                }
                catalyst_pattern[role] = bed; // 旋转后的催化剂
            }
            // 开始检验临近环境是否符合pattern
            let matched = true;
            for (let role in catalyst_pattern){
                const bed_required = catalyst_pattern[role];
                const rel_pos = bed_required.rel_pos;
                const abs_pos = Hex.add(building.position, rel_pos);
                const bed_id = game_state.map.buildings[Hex.toString(abs_pos)];
                if (bed_id === undefined) {
                    matched = false;
                    break;
                }
                const bed = game_state.buildings[bed_id];
                if (bed.type != bed_required.type) {
                    matched = false;
                    console.log(catalyst_pattern, bed, bed_required)
                    break;
                }
            }
            if (!matched) continue;
            // 催化器匹配！开始编写控制器
            const catalyst = {
                type: catalyst_name,
                position: building.position,
                rotation: i,
                id: game_state.id_controller.catalyst++,
            }
            game_state.catalysts[catalyst.id] = catalyst;
            console.log(`找到催化剂 ${catalyst_name}，位置 ${Hex.toString(building.position)}，旋转 ${i}`);
        }
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