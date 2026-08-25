function NewGame() {
    game_state = {
        persistance_info:{
            version: Config.version,
            last_update: Date.now(),
        },
        time: {
            accumulated: 0.0, //累积的未处理时间
            last: performance.now(), //上次结算时间
        },
        tick: 0, // 游戏逻辑刻
        map: {
            buildings: {}, // 建筑物，"q,r" -> id
            stryngs: {}, //链素，"q,r" -> id
        },
        buildings: {}, // 建筑物，id -> {id, type, position: {q, r}, ...(extra)}
        stryngs: {}, // 链素，id -> {id, content, position: {q, r}}
        catalysts: {}, // 催化剂，id -> {id, type, beds:{role, position: {q, r}}, ...(extra)}
        id_controller: {
            building: 0, // 建筑物id计数器
            stryng: 0, // 链素id计数器
            catalyst: 0, // 催化剂id计数器
        },
        advancement_state: {},
        storage: {},
        completing_guards: {},
        burn_stryng_tick_pool: Config.burn_stryng_tick_pool_max,
    }
}

function SaveGame(slot = "autosave") {
    game_state.persistance_info.last_update = Date.now(); // 更新最后更新时间
    var data = JSON.stringify(game_state);
    localStorage.setItem(`save_${slot}`, data);
    UpdateSaveMenu(); // 更新保存菜单
}

function UpdateSaveMenu(){
    let saveMenu = MainMenu.children.find(child => child.name === "Save&Load");
    // 初始化
    saveMenu.children = [
        {name: "保存", function: () => {
            let slot = prompt("请输入存档名：");
            if (!slot) {
                alert("非法的存档名！")
                return;
            }
            SaveGame(slot);
            alert(`成功保存游戏于 ${slot}`);
        }},
        {name: "删除", function: () => {
            let slot = prompt("请输入存档名：");
            if (!slot) {
                alert("非法的存档名！")
                return;
            }
            if (!confirm(`确定要删除存档 ${slot} 吗？`)) {
                return;
            }
            DeleteGame(slot);
            alert(`成功删除存档 ${slot}`);
        }},
    ]
    // 遍历所有存档
    const slots = Object.keys(localStorage).filter(key => key.startsWith("save_")).map(
        (key) => key.replace("save_", "")
    );
    for (let slot of slots){
        saveMenu.children.push({name: slot, function: () => {LoadGame(slot);}})
    }

    RefreshMenu(); // 刷新菜单
}

function LoadGame(slot = "autosave") {
    // 初步读取
    var data = localStorage.getItem(`save_${slot}`);
    if (!data) {
        alert("No save found!");
        return;
    }
    game_state = JSON.parse(data); // 解析保存的数据

    // 适配新环境
    // time
    game_state.time.last = performance.now();
    // 踩一下成就，赚Menu
    for (let advancement_name in game_state.advancement_state) {
        console.log(advancement_name, game_state.advancement_state[advancement_name])
        if (game_state.advancement_state[advancement_name].is_activated) {
            AddAdvancementActivatedToMenu(advancement_name); // 重新激活成就
        }
        if (game_state.advancement_state[advancement_name].is_completed) {
            AddAdvancementCompletedToMenu(advancement_name); // 重新完成成就
        }
    }
    // 修一下guard
    const names = Object.keys(game_state.completing_guards).filter(advancement_name => !game_state.advancement_state[advancement_name].is_completed);
    game_state.completing_guards = {}
    for (let name of names) {
        game_state.completing_guards[name] = true;
    }

    // 版本适配
    if (game_state.persistance_info.version !== Config.version) {
        alert("存档版本是过时的，我们会尝试兼容它。");
        const result = FixVersion();
        if (!result) {
            alert("版本兼容失败，请不要继续使用这个存档。");
        }else {
            alert("版本兼容成功！");
        }
    }
}

function FixVersion() {
    // 链素删除更新 0 -> 1
    if (game_state.persistance_info.version <= 0) { 
        game_state.burn_stryng_tick_pool = Config.burn_stryng_tick_pool_max;
        game_state.persistance_info.version = 1
        console.log("version: 0 -> 1")
    }
    return game_state.persistance_info.version === Config.version; // 返回版本是否兼容
}

function DeleteGame(slot) {
    localStorage.removeItem(`save_${slot}`); // 删除保存的数据
    UpdateSaveMenu(); // 更新保存菜单
    RefreshMenu(); // 刷新菜单
}