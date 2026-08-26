const gameInput = document.getElementById("gameInputStryng");
var ConstructBuilding = {
    Vortexer : (position) => {
        if (HasStryng(position)) return;
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
        if (HasStryng(position)) return;
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
    Filter : (position) => {
        // 获取配置信息
        const filter_stryng = gameInput.value;
        if (filter_stryng.length != 2){
            return;
        }
        if (HasStryng(position)) return;
        const building = {
            type: "Filter",
            position,
            id: game_state.id_controller.building++,
            class: "Transporter",
            is_obstacle: true,
            filter_stryng: filter_stryng, // 过滤窗口
        };
        game_state.buildings[building.id] = building;
        game_state.map.buildings[Hex.toString(position)] = building.id;
        return building;
    }
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
    Filter : (building) => {
        Render.drawHexByHex(building.position, "#ff7a52", true, true);
        Render.drawHexByHex(building.position, "#000000", true, false);
        //写字
        const pixel = Hex.toPixel(building.position);
        ctx.fillStyle = "#ffea00";
        ctx.font = `${Config.hex_size * 0.8}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(building.filter_stryng, pixel.x - Render.camera.x, pixel.y + Config.hex_size * 0.3 - Render.camera.y);
    },
}

function AssignBed(charium, bg_color, text_color="#0000007d"){
    ConstructBuilding[`${charium}bed`] = (position) => {
        const building = {
            type: `${charium}bed`,
            position,
            id: game_state.id_controller.building++,
            class: "Bed"
        };
        game_state.buildings[building.id] = building;
        game_state.map.buildings[Hex.toString(position)] = building.id;
        SearchCatalyst(building);
        return building;
    }
    DrawBuilding[`${charium}bed`] = (building) => {
        Render.drawHexByHex(building.position, bg_color, true, true);
        const pixel = Hex.toPixel(building.position);
        ctx.fillStyle = text_color;
        ctx.font = `${Config.hex_size * 1.4}px Arial Bold`;
        ctx.textAlign = "center";
        ctx.fillText(charium, pixel.x - Render.camera.x, pixel.y + Config.hex_size * 0.5 - Render.camera.y);
    }
    const submenu = {
        name: `${charium}bed`,
        function: () => setInteractStateBuilding(`${charium}bed`),
    }
    const BedsMenu = MainMenu.children.find(child => child.name === "Buildings").children.find(child => child.name === "Beds")
    BedsMenu.children.push(submenu);
}
AssignBed("A","#542828");
AssignBed("G","#185525");
AssignBed("I","#284f54");
AssignBed("Q","#425428");

function HasStryng(position){
    const stryng_id = game_state.map.stryngs[Hex.toString(position)];
    if (stryng_id !== undefined) return true;
    return false;
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
            const building_that_id = game_state.map.buildings[Hex.toString(target_pos)];
            const building_that = game_state.buildings[building_that_id];
            if (building_that && building_that.type === "Slide") continue; //滑道豁免
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
            const building_that_id = game_state.map.buildings[Hex.toString(target_pos)];
            const building_that = game_state.buildings[building_that_id];
            if (building_that && building_that.type === "Slide") continue; //滑道豁免
            game_state.stryngs[target_id].velocity.q += entry.force.q;
            game_state.stryngs[target_id].velocity.r += entry.force.r;
        }
    },
    Filter : (building) => {
        const unmatched_table = [
            {rel_pos:{q:1,r:0},force:{q:0,r:-1}},
            {rel_pos:{q:0,r:1},force:{q:1,r:-1}},
            {rel_pos:{q:1,r:-1},force:{q:-1,r:0}},
            {rel_pos:{q:0,r:-1},force:{q:-1,r:1}},
            {rel_pos:{q:-1,r:0},force:{q:0,r:1}},
            {rel_pos:{q:-1,r:1},force:{q:1,r:0}},
        ]
        const matched_table = [
            {rel_pos:{q:1,r:0},force:{q:1,r:-1}},
            {rel_pos:{q:0,r:1},force:{q:1,r:0}},
            {rel_pos:{q:1,r:-1},force:{q:0,r:-1}},
            {rel_pos:{q:0,r:-1},force:{q:-1,r:0}},
            {rel_pos:{q:-1,r:0},force:{q:-1,r:1}},
            {rel_pos:{q:-1,r:1},force:{q:0,r:1}},
        ]
        for (let i = 0; i < 6; i++) {
            const rel_pos = unmatched_table[i].rel_pos;
            const target_pos = Hex.add(building.position, rel_pos);
            const target_id = game_state.map.stryngs[Hex.toString(target_pos)];
            if (target_id === undefined) continue;
            const building_that_id = game_state.map.buildings[Hex.toString(target_pos)];
            const building_that = game_state.buildings[building_that_id];
            if (building_that && building_that.type === "Slide") continue; //滑道豁免
            const stryng = game_state.stryngs[target_id];
            const is_matched = stryng.content.includes(building.filter_stryng);
            const force = is_matched ? matched_table[i].force : unmatched_table[i].force;
            game_state.stryngs[target_id].velocity.q += force.q;
            game_state.stryngs[target_id].velocity.r += force.r;

            if (!IsAdvancementCompleted("差速离心法")) CompleteAdvancement("差速离心法");
        }
    }
}

function GetBuildingType(position){
    const building_id = game_state.map.buildings[Hex.toString(position)];
    if(building_id === undefined) return null;
    return game_state.buildings[building_id].type;
}

function setInteractStateBuilding(building){
    interact_state = {mode: "build", building}
    const dashboard = document.getElementById("gameDashboard");
    dashboard.innerHTML = `Building: ${building}`;
}