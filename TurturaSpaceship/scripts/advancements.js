var advancements = {
    "坠落": {
        description: "打开游戏，你就坠落在这颗星球了。",
        default_activated: true,
        on_complete: () => {globalThis.ActivateAdvancement("有Q人");},
        completing_guard: () => {return !IsAdvancementCompleted("有Q人");}
    },
    "有Q人": {
        description: "使用 srcQ 得到你的第一个链素。",
        on_complete: () => {globalThis.ActivateAdvancement("自产自销");}
    },
    "自产自销": {
        description: "将 10 个 Q 链素运至 input 催化剂提交。",
        stryng_requirement: {
            stryng: "Q",
            amount: 10,
        },
        on_complete: () => {globalThis.ActivateAdvancement("苹果");},
    },
    "苹果": {
        description: "使用 srcA 得到 A 链素。",
        on_complete: () => {globalThis.ActivateAdvancement("它变长了");},
    },
    "它变长了": {
        description: "使用 aq 催化剂组合 A 和 Q 。",
        on_complete: () => {globalThis.ActivateAdvancement("多多益善");},
    },
    "多多益善": {
        description: "提交 100 个 AQ 。",
        on_complete: () => {globalThis.ActivateAdvancement("套起来了");},
        stryng_requirement: {
            stryng: "AQ",
            amount: 100,
        },
    },
    "套起来了": {
        description: "提交 100 个 AAQ 。",
        on_complete: () => {globalThis.ActivateAdvancement("举一反三");},
        stryng_requirement: {
            stryng: "AAQ",
            amount: 100,
        },
    },
    "举一反三": {
        description: "提交 100 个 AAQII[气泡水] 。它很好喝。",
        on_complete: () => {globalThis.ActivateAdvancement("QQ弹弹");},
        stryng_requirement: {
            stryng: "AAQII",
            amount: 100,
        },
    },
    "QQ弹弹": {
        description: "使用 srcQQ 得到 QQ 链素。",
        on_complete: () => {
            globalThis.ActivateAdvancement("差速离心法");
            globalThis.ActivateAdvancement("无污染");
        },
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
        description: "提交 100 个 QQII 。可惜它没有用途。",
        stryng_requirement: {
            stryng: "QQII",
            amount: 100,
        }
    },
    "残次品": {
        description: "提交 100 个 AAQQ 。不过通过它来合成 AAAAQQ 恐怕不是个好主意。",
        stryng_requirement: {
            stryng: "AAQQ",
            amount: 100,
        }
    },
    "不够火热": {
        description: "提交 200 个 QIAQ[酒精] 。洁癖必备，但并不能驱动什么。",
        stryng_requirement: {
            stryng: "QIAQ",
            amount: 200,
        }
    },
    "害羞羞": {
        description: "提交 100 个 GG 。你或许可以找到些 G 字元",
        stryng_requirement: {
            stryng: "GG",
            amount: 100,
        }
    },
    "定向选择": {
        description: "提交 100 个 QG 。你用筛选器扔掉了所有保护失败的链素，还是说你把它们回收了？",
        stryng_requirement: {
            stryng: "QG",
            amount: 100,
        }
    },
    "足够火热": {
        description: "提交 500 个 AAAAQQ[高能燃料] 。公路旅行必备。",
        stryng_requirement: {
            stryng: "AAAAQQ",
            amount: 500,
        }
    },
    "高维空间？": {
        description: "提交 100 个 QK(Q) 。它们只是练习用的废物。",
        stryng_requirement: {
            stryng: "QK(Q)",
            amount: 100,
        }
    },
    "套套套套娃！": {
        description: "提交 500 个 QK(QK(QK(QK(QI))))[润滑油] 。凝结的牛顿第一定律。"
    },
    "展示内在": {
        description: "提交 100 个 QQQ[半橡胶] 。很好的化工原料。",
        stryng_requirement: {
            stryng: "QQQ",
            amount: 100,
        }
    },
    "儿童玩具": {
        description: "提交 500 个 QEAQ[磁粉] 。优秀的磁能存储材料。",
        stryng_requirement: {
            stryng: "QEAQ",
            amount: 500,
        }
    },
    "真·QQ弹弹": {
        description: "提交 1000 个 QQQQ[橡胶] 。哪里都用得到，而且很弹。真的，超级弹。",
        stryng_requirement: {
            stryng: "QQQQ",
            amount: 1000,
        }
    },
    "你被骗了": {
        description: "Never gonna give you up, never gonna let you down. Never gonna run around and desert you. Never gonna make you cry, never gonna say goodbye. Never gonna tell a lie and hurt you."
    },
    "硬汉！": {
        description: "提交 100 个 K(H)K(H)[砂粒] 。看起来左括号搞错了属于它的右括号。不过没关系，因为它是硬汉！"
    },
    "蓄势待发": {
        description: "将 QEAQ[磁粉] 充能得到 QAEQ[充能磁粉] 。放能后或许还能回收利用呢。"
    },
    "贫血症发作": {
        description: "提交 500 个 K() 。里面的 E 字元好像被神秘方式取走了。"
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

function BakeAdvancements(){
    // 精加工成就配置
    for(let advancement in advancements){
        if (advancements[advancement].stryng_requirement){
            const stryng = advancements[advancement].stryng_requirement.stryng;
            const amount = advancements[advancement].stryng_requirement.amount;
            // 守卫设置
            advancements[advancement].completing_guard = () => {
                return game_state.storage[stryng] >= amount; // 检查是否满足要求 // undef一定返回false
            }
            // 提交设置
            if(!Config.storage_stryng_amount_max[stryng]) {
                Config.storage_stryng_amount_max[stryng] = amount; // 如果没有设置最大值，就设置为当前需求值
            }
        }
        // 占位守卫，对于版本更新友好
        if (!advancements[advancement].completing_guard){
            advancements[advancement].completing_guard = () => {return false;} // 说明这个成就当前版本只是占位
        }
    }
}

function InitializeAdvancement(advancement_name) {
    if (game_state.advancement_state[advancement_name]) return;
    game_state.advancement_state[advancement_name] = {
        is_activated: false, 
        is_completed: false, 
        completed_time: null, 
        completed_tick: null, 
    }; // 初始化成就状态
}

function ActivateAdvancement(advancement_name) {
    if (!game_state.advancement_state[advancement_name]) InitializeAdvancement(advancement_name);
    if (game_state.advancement_state[advancement_name].is_activated) return;
    game_state.advancement_state[advancement_name].is_activated = true;

    if (advancements[advancement_name].completing_guard) {
        game_state.completing_guards[advancement_name] = true;
    }
    
    console.log(`成就 ${advancement_name} 已激活`);
    AddAdvancementActivatedToMenu(advancement_name);
}
function AddAdvancementActivatedToMenu(advancement_name) {
    let advancement_menu = globalThis.MainMenu.children.find(child => child.name === "Advancements");
    if (advancement_menu.children.some(child => child.name === advancement_name)) return;
    advancement_menu.children.push({
        name: advancement_name, 
        content: advancements[advancement_name].description, 
        color: "grey", 
    });
    globalThis.RefreshMenu();
}

function CompleteAdvancement(advancement_name, completed_time = Date.now(), completed_tick = game_state.tick) {
    // 预防性激活
    ActivateAdvancement(advancement_name);
    // 完成
    if (game_state.advancement_state[advancement_name].is_completed) return;
    game_state.advancement_state[advancement_name].is_completed = true;
    game_state.advancement_state[advancement_name].completed_time = completed_time;
    game_state.advancement_state[advancement_name].completed_tick = completed_tick;
    console.log(`成就 ${advancement_name} 已完成`);
    AddAdvancementCompletedToMenu(advancement_name);
}
function AddAdvancementCompletedToMenu(advancement_name) {
    let advancement_menu = globalThis.MainMenu.children.find(child => child.name === "Advancements");
    let child = advancement_menu.children.find(child => child.name === advancement_name);
    child.color = "green"; // 成就图标变绿
    child.content = advancements[advancement_name].description + `<br>完成刻: ${game_state.advancement_state[advancement_name].completed_tick}<br>完成时间: ${new Date(game_state.advancement_state[advancement_name].completed_time).toLocaleString()}`;

    if(advancements[advancement_name].on_complete){
        advancements[advancement_name].on_complete();
    }
}

function IsAdvancementCompleted(advancement_name) {
    if (!game_state.advancement_state[advancement_name]) return false;
    return Boolean(game_state.advancement_state[advancement_name].is_completed);
}