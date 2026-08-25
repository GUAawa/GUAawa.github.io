const canvas = document.getElementById('gameCanvas');
const dashboard = document.getElementById('gameDashboard');
const input_stryng = document.getElementById('gameInputStryng');

var game_state;
NewGame();

var interact_state = {
    mode: "disabled",
}

function handleInput() {
    // move camera with wasd
    if (!KeyboardInput['shift']){
        if (KeyboardInput['w']) Render.camera.y -= Config.camera_speed;
        if (KeyboardInput['s']) Render.camera.y += Config.camera_speed;
        if (KeyboardInput['a']) Render.camera.x -= Config.camera_speed;
        if (KeyboardInput['d']) Render.camera.x += Config.camera_speed;
    }
    // mode
    if (KeyboardInput['1']) setInteractStateBuilding("Vortexer");
    if (KeyboardInput['2']) setInteractStateBuilding("Repulser");
    if (KeyboardInput['3']) setInteractStateBuilding("Slide");
    
    if (KeyboardInput['shift']){
        if (KeyboardInput['a']) setInteractStateBuilding("Abed");
        if (KeyboardInput['i']) setInteractStateBuilding("Ibed");
        if (KeyboardInput['q']) setInteractStateBuilding("Qbed");
    }

    if (KeyboardInput['`']) {
        interact_state = {mode:"create_stryng"}
        dashboard.innerHTML = "Creating Stryng";
    };

    if (KeyboardInput['backspace']) {
        setInteractStateDeleteStryng();
    }
    // build
    if (MouseInput['left']) {
        if (interact_state.mode === "build") {
            const position = Hex.hex_round(Hex.toHex(MouseInput['x'] + Render.camera.x, MouseInput['y'] + Render.camera.y));
            if (game_state.map.buildings[Hex.toString(position)] === undefined){
                ConstructBuilding[interact_state.building](position);
            }
        }else if (interact_state.mode === "create_stryng") {
            const position = Hex.hex_round(Hex.toHex(MouseInput['x'] + Render.camera.x, MouseInput['y'] + Render.camera.y));

            if (!game_state.map.stryngs[Hex.toString(position)]){
                const stryng_content = input_stryng.value;
                SummonStryng(stryng_content, position);
            }

        }else if (interact_state.mode === "delete_stryng") {
            const position = Hex.hex_round(Hex.toHex(MouseInput['x'] + Render.camera.x, MouseInput['y'] + Render.camera.y));
            const id = game_state.map.stryngs[Hex.toString(position)]
            if (id && game_state.burn_stryng_tick_pool >= Config.burn_stryng_tick_cost){
                // 扣款
                game_state.burn_stryng_tick_pool -= Config.burn_stryng_tick_cost
                // 删除链素
                delete game_state.map.stryngs[Hex.toString(position)];
                delete game_state.stryngs[id]; // 删除链素
            }
        }
    }
    if (MouseInput['right']) {
        if (interact_state.mode === "build") {
            const position = Hex.hex_round(Hex.toHex(MouseInput['x'] + Render.camera.x, MouseInput['y'] + Render.camera.y));
            const building_id = game_state.map.buildings[Hex.toString(position)];
            if (building_id !== undefined){
                const building = game_state.buildings[building_id];
                DeleteBuilding(building); // 删除建筑
            }
        }
    }
}

function setInteractStateDeleteStryng(){
    interact_state = {mode:"delete_stryng"}
    dashboard.innerHTML = `Burning Stryng - Tick Pool: ${game_state.burn_stryng_tick_pool}/${Config.burn_stryng_tick_pool_max}`;
}

function DeleteBuilding(building){
    if (building.catalysts) {
        // 这个建筑属于某些催化剂，要取消这些催化剂
        for (const catalyst_id of building.catalysts) {
            const catalyst = game_state.catalysts[catalyst_id];
            for (const role in catalyst.beds){
                const building_id = catalyst.beds[role];
                if (building_id == building.id) continue; // 不修改自己的列表，因为它正用于for循环
                const building_deleting = game_state.buildings[building_id];
                const list = building_deleting.catalysts;
                list.splice(list.indexOf(catalyst_id), 1); // 删除
            }
            delete game_state.catalysts[catalyst_id];
        }
    }

    delete game_state.map.buildings[Hex.toString(building.position)];
    delete game_state.buildings[building.id];
}

function tickGame(){
    // Update game state here
    console.log(`Tick: ${game_state.tick}`)
    game_state.tick++;
    
    if(game_state.tick %2 == 0){
        moveStryngs();
    }else if (game_state.tick %2 == 1){
        reactCatalysts();
    }
    CheckCompletementGuard();

    if (game_state.burn_stryng_tick_pool < Config.burn_stryng_tick_pool_max) {
        game_state.burn_stryng_tick_pool++;
        if (interact_state.mode === "delete_stryng") setInteractStateDeleteStryng();
    }

    if (game_state.tick % Config.autosave_interval == 0) {
        SaveGame();
        console.log(`autosave at tick ${game_state.tick}`);
    }
}

function reactCatalysts(){
    for (const catalyst_id in game_state.catalysts){
        const catalyst = game_state.catalysts[catalyst_id];
        Reaction[catalyst.name](catalyst);
    }
}

function moveStryngs(){
    clearStryngsVelocity();
    applyTransportersForces();
    moveStryngsByVelocity();
}

function clearStryngsVelocity(){
    for (const id in game_state.stryngs) {
        if (GetBuildingType(game_state.stryngs[id].position) === "Slide") continue; // 滑道豁免
        game_state.stryngs[id].velocity.q = 0;
        game_state.stryngs[id].velocity.r = 0;
    }
}
function applyTransportersForces(){
    for (const id in game_state.buildings) {
        const building = game_state.buildings[id];
        if (building.class != "Transporter") continue;
        Transport[building.type](building);
    }
}
function moveStryngsByVelocity(){
    // 申请一个规划链素地图
    const map_planned = {}; // 位置: [想来此的链素id]
    
    function hasObstacle(position){
        const position_key = Hex.toString(position);
        if (game_state.map.buildings[position_key] !== undefined) {
            const building = game_state.buildings[game_state.map.buildings[position_key]];
            if (building.is_obstacle) return true;
        }
        return false;
    }
    // 阶段一：让所有链素提出申请
    for (const id in game_state.stryngs) {
        const stryng = game_state.stryngs[id];
        const position_old = stryng.position
        const position_new = Hex.add(stryng.position,stryng.velocity)
        const position_new_key = Hex.toString(position_new)
        if (!map_planned[position_new_key]) map_planned[position_new_key] = []; // 初始化
        map_planned[position_new_key].push(id);
    }
    // 阶段二：让被取消的链素回家
    let stabled = false;
    while (!stabled){
        stabled = true; // 假设已经稳定
        for (const position_key in map_planned) {
            const planning_ids = map_planned[position_key];
            const position_new = Hex.fromString(position_key);
            const have_to_cancel = planning_ids.length > 1 || hasObstacle(position_new);
            if (!have_to_cancel) continue;
            stabled = false; // 尚未稳定
            // 遣返所有链素
            let local_stryng = null; // 可能有一个链素本就在这
            for (const id of planning_ids) {
                const stryng = game_state.stryngs[id];
                /* 设定更动，现在不取消速度
                // 移动被取消，所以失去速度
                stryng.velocity.q = 0;
                stryng.velocity.r = 0;
                */
                // 改为申请原位
                const position_old = stryng.position
                if (Hex.ifEqual(position_new, position_old)) {
                    // 本地链素
                    local_stryng = id;
                    continue;
                }
                // 遣返外地链素
                const position_old_key = Hex.toString(position_old);
                if (!map_planned[position_old_key]) map_planned[position_old_key] = [];
                map_planned[position_old_key].push(id);
            }
            if (local_stryng){
                map_planned[position_key] = [local_stryng]; // 清空规划
            }else{
                delete map_planned[position_key];
            }
        }
    }
    // 阶段三：位置已经确定，更新链素位置
    game_state.map.stryngs = {}; // 清空旧的链素地图
    for (const position_key in map_planned) {
        const planning_ids = map_planned[position_key];
        if (planning_ids.length == 0) continue;
        const id = planning_ids[0];
        const stryng = game_state.stryngs[id];
        const position_new = Hex.fromString(position_key);
        stryng.position = position_new; // 更新位置
        game_state.map.stryngs[position_key] = id; // 更新链素地图
    }
}

function CheckCompletementGuard(){
    let completeds = [];
    for (const advancement_name in game_state.completing_guards){
        const guard = advancements[advancement_name].completing_guard;
        const result = guard();
        if (result) {
            completeds.push(advancement_name); // 字典遍历中，不可删除
            CompleteAdvancement(advancement_name);
        }
    }
    for (const advancement_name of completeds){
        delete game_state.completing_guards[advancement_name];
    }
}

function render(){
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // display origin
    Render.drawDotByPixel(0,0,"#000000", true);

    // 高消耗 目前选择绘制所有的建筑和链素，不根据屏幕范围剪枝
    for (const id in game_state.buildings) {
        const building = game_state.buildings[id];
        DrawBuilding[building.type](building);
    }
    for (const id in game_state.stryngs) {
        const stryng = game_state.stryngs[id];
        DrawStryng(stryng);
    }
}

function loop(){
    // time
    const now = performance.now();
    const delta = (now - game_state.time.last)
    game_state.time.last = now;
    game_state.time.accumulated += delta;

    handleInput();

    // 时间足够，则进行游戏逻辑更新
    if (game_state.time.accumulated > Config.max_time_accumulated) game_state.time.accumulated = Config.max_time_accumulated
    if (game_state.time.accumulated >= Config.tick_duration) {
        tickGame();
        game_state.time.accumulated -= Config.tick_duration;
    }
    
    render()
    
    requestAnimationFrame(loop);
}

BakeAdvancements();

MouseInput.init();
KeyboardInput.init();

// 设定上这个是飞船遗骸
ConstructBuilding.Vortexer({q:0,r:0});
SummonStryng("QQ", {q:1,r:0});
SummonStryng("(AA)", {q:0,r:1});
SummonStryng("RKH(", {q:-1,r:0});

requestAnimationFrame(loop);

ActivateAdvancement("坠落");

UpdateStorageContent();

UpdateSaveMenu();