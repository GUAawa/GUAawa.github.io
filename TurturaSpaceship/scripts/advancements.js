var advancements = {
    "坠落": {
        description: "打开游戏，你就坠落在这颗星球了。",
        on_complete: () => {globalThis.ActivateAdvancement("有Q人");}
    },
    "有Q人": {
        description: "使用 srcQ 得到你的第一个链素。",
    },
    "自产自销": {
        description: "将 Q 链素运至 input 催化剂来提交它。",
    },
    "无穷尽也": {
        description: "提交 100 个 Q 。",
    },
    "苹果": {
        description: "使用 srcA 得到 A 链素。",
    },
    "它变长了": {
        description: "使用 aq 催化剂组合 A 和 Q 。",
    },
    "多多益善": {
        description: "提交 100 个 AQ 。",
    },
    "套起来了": {
        description: "提交 100 个 AAQ 。",
    },
    "举一反三": {
        description: "提交 100 个 AAQII[气泡水] 。它很好喝。",
    },
    "QQ弹弹": {
        description: "使用 srcQII 得到 QQ 链素。",
    },
    "差速离心法": {
        description: "使用 筛选器 运输链素。",
    },
    "无污染": {
        description: "使用 trashI 催化剂销毁长度恰为 4 的链素。",
    },
    "有污染": {
        description: "手动销毁一个长度超过 4 的链素。"
    },
    "只是玩具": {
        description: "提交 100 个 QQII 。可惜它没有用途。"
    },
    "残次品": {
        description: "提交 100 个 AAQQ 。可惜通过它来合成 AAAAQQ 的路线很是低效。"
    },
    "不够火热": {
        description: "提交 200 个 QIAQ[酒精] 。洁癖必备，但并不能驱动什么。"
    },
    "害羞羞": {
        description: "提交 100 个 GG 。"
    },
    "定向选择": {
        description: "提交 100 个 QG 。你用筛选器扔掉了所有保护失败的链素，还是说你把它们回收了？"
    },
    "足够火热": {
        description: "提交 500 个 AAAAQQ[高能燃料] 。公路旅行必备。"
    },
    "高维空间？": {
        description: "提交 100 个 QK(Q) 。它们只是练习用的废物。"
    },
    "套套套套娃！": {
        description: "提交 500 个 QK(QK(QK(QK(I))))Q[润滑油] 。或许能让物流系统更丝滑？"
    },
    "展示内在": {
        description: "提交 100 个 QQQ[半橡胶] 。很好的化工原料。"
    },
    "儿童玩具": {
        description: "提交 500 个 QEAQ[磁粉] 。优秀的磁能存储材料。"
    },
    "真·QQ弹弹": {
        description: "提交 1000 个 QQQQ[橡胶] 。哪里都用得到，而且很弹。真的，超级弹。"
    },
    "你被骗了": {
        description: "Never gonna give you up, never gonna let you down. Never gonna run around and desert you. Never gonna make you cry, never gonna say goodbye. Never gonna tell a lie and hurt you."
    },
    "蓄势待发": {
        description: "将 QEAQ[磁粉] 充能得到 QAEQ[充能磁粉] 。放能后或许还能回收利用呢。"
    },
    "贫血症发作": {
        description: "提交 500 个 K() 。里面的 E 字元好像被神秘方式取走了。"
    },
    "硬汉！": {
        description: "提交 100 个 K(H)K(H)[砂粒] 。看起来左括号搞错了属于它的右括号。不过没关系，因为它是硬汉！"
    },
    "内裤反穿": {
        description: "提交 100 个 Q)K(Q 。看起来括号并没有通过什么超距作用匹配起来..."
    },
    "双倍快乐": {
        description: "提交 500 个 Q)K(QQ)K(Q 。它似乎蕴含着什么。"
    },
    "双黄蛋": {
        description: "提交 1000 个 K(QQ) 。环保工厂要对废品做不少处理呢，不是吗？"
    },
    "吹个大泡泡": {
        description: "提交 100 个 QQQQQQQQQQ[泡泡糖] 。别数错了哦~"
    },
    "这上面风景不错，应该吧": {
        description: "提交 500 个 AAAAQQK(AAAAQQ)K(AAAAQQ)K(AAAAQQ)[火箭燃料] 。至少能源有了，对吧？"
    },
}

function InitAdvancementState(){
    // 初始化所有成就
    for(let advancement in advancements){
        game_state.advancement_state[advancement] = {
            description: advancements[advancement].description,
            is_completed: false, // 默认未完成
            is_activated: false, // 默认未激活
        };
    }
}

function ActivateAdvancement(advancement_name) {
    if (game_state.advancement_state[advancement_name].is_activated) return;
    game_state.advancement_state[advancement_name].is_activated = true;
    console.log(`成就 ${advancement_name} 已激活`);
    let advancement_menu = globalThis.MainMenu.children.find(child => child.name === "Advancements");
    if (advancement_menu.children.some(child => child.name === advancement_name)) return;
    advancement_menu.children.push({
        name: advancement_name, 
        content: advancements[advancement_name].description, 
        color: "grey", 
    });
}

function CompleteAdvancement(advancement_name) {
    // 预防性激活
    ActivateAdvancement(advancement_name);
    // 完成
    if (game_state.advancement_state[advancement_name].is_completed) return;
    game_state.advancement_state[advancement_name].is_completed = true;
    game_state.advancement_state[advancement_name].completed_time = Date.now();
    game_state.advancement_state[advancement_name].completed_tick = game_state.tick;
    console.log(`成就 ${advancement_name} 已完成`);
    let advancement_menu = globalThis.MainMenu.children.find(child => child.name === "Advancements");
    let child = advancement_menu.children.find(child => child.name === advancement_name);
    child.color = "green"; // 成就图标变绿
    child.content = advancements[advancement_name].description + `<br>完成刻: ${game_state.advancement_state[advancement_name].completed_tick}<br>完成时间: ${new Date(game_state.advancement_state[advancement_name].completed_time).toLocaleString()}`;

    if(advancements[advancement_name].on_complete){
        advancements[advancement_name].on_complete();
    }
}

function IsAdvancementCompleted(advancement_name) {
    return Boolean(game_state.advancement_state[advancement_name].is_completed);
}