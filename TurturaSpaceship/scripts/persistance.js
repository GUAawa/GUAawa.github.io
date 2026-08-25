function NewGame() {
    game_state = {
        persistance_info:{
            version: 0,
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
    }
}

function SaveGame(slot = "autosave") {
    game_state.persistance_info.last_update = Date.now(); // 更新最后更新时间
    var data = JSON.stringify(game_state);
    localStorage.setItem(`save_${slot}`, data);
}

function LoadGame(slot = "autosave") {
    var data = localStorage.getItem(`save_${slot}`);
    if (!data) {
        alert("No save found!");
        return;
    }
    game_state = JSON.parse(data); // 解析保存的数据
    game_state.time.last = performance.now();
}