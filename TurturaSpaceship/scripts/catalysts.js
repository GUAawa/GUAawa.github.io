var CatalystPattern = {
    aq: [
        {type: "Abed", role: "appendix", position: {q:0,r:-1}},
        {type: "Qbed", role: "reactant", position: {q:-1,r:0}},
        {type: "Qbed", role: "product", position: {q:1,r:0}},
    ],
    qi: [
        {type: "Abed", role: "appendix", position: {q:-1,r:1}},
        {type: "Qbed", role: "reactant", position: {q:-1,r:0}},
        {type: "Qbed", role: "product", position: {q:1,r:0}},
    ],
    srcQ: [
        {type: "Ibed", role: "generator", position: {q:0,r:0}},
        {type: `Qbed`, role: "decoration1", position: {q:1,r:0}},
        {type: `Qbed`, role: "decoration2", position: {q:0,r:-1}},
        {type: `Qbed`, role: "decoration3", position: {q:-1,r:1}},
    ],
    srcA: [
        {type: "Ibed", role: "generator", position: {q:0,r:0}},
        {type: `Abed`, role: "decoration1", position: {q:1,r:0}},
        {type: `Abed`, role: "decoration2", position: {q:0,r:-1}},
        {type: `Abed`, role: "decoration3", position: {q:-1,r:1}},
    ],
    input: [
        {type: "Ibed", role: "input", position: {q:0,r:-1}},
        {type: "Abed", role: "decoration1", position: {q:0,r:1}},
        {type: "Qbed", role: "decoration2", position: {q:1,r:0}},
        {type: "Qbed", role: "decoration3", position: {q:-1,r:1}},
    ],
    srcQQ: [
        {type: `Ibed`, role: "generator", position: {q:2,r:0}},
        {type: `Ibed`, role: "fake_gen1", position: {q:0,r:-2}},
        {type: `Ibed`, role: "fake_gen2", position: {q:-2,r:2}},
        {type: "Qbed", role: "decoration1", position: {q:1,r:0}},
        {type: "Qbed", role: "decoration1", position: {q:-1,r:0}},
        {type: "Qbed", role: "decoration1", position: {q:0,r:1}},
        {type: "Qbed", role: "decoration1", position: {q:0,r:-1}},
        {type: "Qbed", role: "decoration1", position: {q:1,r:-1}},
        {type: "Qbed", role: "decoration1", position: {q:-1,r:1}},
    ],
    gq: [
        {type: `Gbed`, role: "decoration1", position: {q:0,r:0}},
        {type: `Qbed`, role: "reactant", position: {q:-1,r:1}},
        {type: `Qbed`, role: "product", position: {q:1,r:1}},
        {type: `Abed`, role: "appendix", position: {q:0,r:-1}},
        {type: `Ibed`, role: "waste", position: {q:2,r:-1}},
    ],
    trash: [
        {type: "Ibed", role: "trash", position: {q:0,r:0}},
        {type: "Abed", role: "decoration1", position: {q:1,r:1}},
        {type: "Abed", role: "decoration2", position: {q:2,r:-1}},
        {type: "Abed", role: "decoration3", position: {q:-2,r:1}},
        {type: "Abed", role: "decoration4", position: {q:-1,r:-1}},
        {type: "Qbed", role: "decoration5", position: {q:1,r:-2}},
        {type: "Qbed", role: "decoration6", position: {q:-1,r:2}},
    ],
}

function AssignSourcePattern(content){ // 目前只支持单字符
    CatalystPattern[`src${content}`] = [
        {type: "Ibed", role:"generator", position: {q:0,r:0}},
        {type: `${content}bed`, role: "decoration1", position: {q:1,r:0}},
        {type: `${content}bed`, role: "decoration2", position: {q:0,r:-1}},
        {type: `${content}bed`, role: "decoration3", position: {q:-1,r:1}},
    ]
    Reaction[`src${content}`] = (catalyst) => {
        const stryng_old = WithdrawStryngByRole(catalyst, "generator", true)
        if (stryng_old !== null) return false;
        TransferStryngByRole(catalyst, "generator", content)
        return true;
    }
}

function SearchSubstryngs(substryng, stryng){
    const positions = [];
    let pos = stryng.indexOf(substryng);
    while (pos !== -1) {
        positions.push(pos);
        pos = stryng.indexOf(substryng, pos + 1); // 跳过当前匹配，避免重叠死循环
    }
    return positions;
}

var Reaction = {
    aq: (catalyst) => {
        const reactant = WithdrawStryngByRole(catalyst, "reactant", true)
        const appendix = WithdrawStryngByRole(catalyst, "appendix", true)
        const product_old = WithdrawStryngByRole(catalyst, "product", true)
        if (product_old !== null) return false;
        if (appendix != "A") return false;
        if (reactant === null) return false;
        // 执行反应
        // 寻找reactant中所有的'Q'子串
        const positions = SearchSubstryngs('Q', reactant); // 找到reactant中所有的'Q'子串
        if (positions.length === 0) return false;
        const position = positions[Math.floor(Math.random() * positions.length)]
        const product = reactant.slice(0, position) + 'AQ' + reactant.slice(position + 1);
        // 创造链素
        TransferStryngByRole(catalyst, "product", product)
        WithdrawStryngByRole(catalyst, "reactant")
        WithdrawStryngByRole(catalyst, "appendix")
        if (!IsAdvancementCompleted("它变长了")) CompleteAdvancement("它变长了"); //成就
        return true;
    },
    qi: (catalyst) => {
        const reactant = WithdrawStryngByRole(catalyst, "reactant", true)
        const appendix = WithdrawStryngByRole(catalyst, "appendix", true)
        const product_old = WithdrawStryngByRole(catalyst, "product", true)
        if (product_old !== null) return false;
        if (appendix != "I") return false;
        if (reactant === null) return false;
        // 执行反应
        // 寻找reactant中所有的'Q'子串
        const positions = SearchSubstryngs('Q', reactant); // 找到reactant中所有的'Q'子串
        if (positions.length === 0) return false;
        const position = positions[Math.floor(Math.random() * positions.length)]
        const product = reactant.slice(0, position) + 'QI' + reactant.slice(position + 1);
        // 创造链素
        TransferStryngByRole(catalyst, "product", product)
        WithdrawStryngByRole(catalyst, "reactant")
        WithdrawStryngByRole(catalyst, "appendix")
        return true;
    },
    srcQ: (catalyst) => {
        if (!IsAdvancementCompleted("有Q人")) CompleteAdvancement("有Q人"); //成就

        const stryng_old = WithdrawStryngByRole(catalyst, "generator", true)
        if (stryng_old !== null) return false;
        TransferStryngByRole(catalyst, "generator", "Q")
        return true;
    },
    srcA: (catalyst) => {
        if (!IsAdvancementCompleted("苹果")) CompleteAdvancement("苹果"); //成就

        const stryng_old = WithdrawStryngByRole(catalyst, "generator", true)
        if (stryng_old !== null) return false;
        TransferStryngByRole(catalyst, "generator", "A")
        return true;
    },
    input: (catalyst) => {
        // 输入逻辑
        const stryng_old = WithdrawStryngByRole(catalyst, "input", isFake=true)
        if (stryng_old === null) return false;
        if (!Config.storage_stryng_amount_max[stryng_old]) return false;
        if (!game_state.storage[stryng_old]) game_state.storage[stryng_old] = 0;
        if (game_state.storage[stryng_old] >= Config.storage_stryng_amount_max[stryng_old]) return false;
        
        WithdrawStryngByRole(catalyst, "input");
        game_state.storage[stryng_old]++;
        UpdateStorageContent();

        // 成就检测
        /*成就检测不在这里做了，用成就系统里的completement_guard实现 */
        return true;
    },
    srcQQ: (catalyst) => {
        if (!IsAdvancementCompleted("QQ弹弹")) CompleteAdvancement("QQ弹弹"); //成就

        const stryng_old = WithdrawStryngByRole(catalyst, "generator", true)
        if (stryng_old !== null) return false;
        TransferStryngByRole(catalyst, "generator", "QQ")
        return true;
    },
    gq: (catalyst) => {
        const appendix = WithdrawStryngByRole(catalyst, "appendix", true)
        const reactant = WithdrawStryngByRole(catalyst, "reactant", true)
        const product_old = WithdrawStryngByRole(catalyst, "product", true)
        const waste_old = WithdrawStryngByRole(catalyst, "waste", true)
        // 检测模式
        if (appendix == 'G'){
            if (product_old !== null) return false;
            if (waste_old !== null) return false;
            if (reactant === null) return false;
            // 位点定位
            const positions = SearchSubstryngs('Q', reactant); // 找到reactant中所有的'Q'子串
            if (positions.length === 0) return false;
            // 选择位点
            const position = positions[Math.floor(Math.random() * positions.length)]
            // 创造链素
            const product = reactant.slice(0, position) + 'G' + reactant.slice(position + 1);
            const waste = "Q"
            // IO
            WithdrawStryngByRole(catalyst, "reactant");
            WithdrawStryngByRole(catalyst, "appendix");
            TransferStryngByRole(catalyst, "product", product);
            TransferStryngByRole(catalyst, "waste", waste);
            return true; // 成功
        }else if (appendix == 'Q'){
            console.log("unimplimented!")
        }
    },
    trash: (catalyst) => {
        const trash = WithdrawStryngByRole(catalyst, "trash", true)
        if (trash === null) return false;
        if (trash.length != 4) return false;
        WithdrawStryngByRole(catalyst, "trash");
        return true;
    },
}

AssignSourcePattern("I");
AssignSourcePattern("G");

function WithdrawStryngByRole(catalyst, role, isFake = false){
    const bed_id = catalyst.beds[role]
    const bed = game_state.buildings[bed_id]
    const position = bed.position
    const stryng_id = game_state.map.stryngs[Hex.toString(bed.position)]
    const stryng = game_state.stryngs[stryng_id]
    if (!stryng) return null
    const content = stryng.content
    if (!isFake){
        delete game_state.map.stryngs[Hex.toString(bed.position)]
        delete game_state.stryngs[stryng_id] // 删除链素
    }
    return content
}
function TransferStryngByRole(catalyst, role, content){
    const bed_id = catalyst.beds[role]
    const bed = game_state.buildings[bed_id]
    const position = bed.position
    SummonStryng(content, position)
}

// 预烘焙
var CatalystPatternRelative = {}
/*{
    Abed:[
        {name: "aq", pattern: {type,role,position}}
    ]
} */
for (const catalyst_name in CatalystPattern){
    const catalyst_pattern = CatalystPattern[catalyst_name];
    for (const center of catalyst_pattern){
        // 以这个bed为中心的六种方向下的pattern
        // 初始化，为该基座创建查询表
        if (!CatalystPatternRelative[center.type]) CatalystPatternRelative[center.type] = []
        // 1. 置为中心
        let pattern_relative = []
        for (const bed of catalyst_pattern){
            const position = Hex.sub(bed.position, center.position)
            const bed_new = {type: bed.type, role: bed.role, position: position}
            pattern_relative.push(bed_new)
        }
        // 2. 旋转 + 推入
        for (let i = 0; i < 6; i++){
            let pattern_relative_rotated = []
            for (const bed of pattern_relative){
                const position = Hex.rotate(bed.position, i)
                const bed_new = {type: bed.type, role: bed.role, position: position}
                pattern_relative_rotated.push(bed_new)
            }
            CatalystPatternRelative[center.type].push({
                name: catalyst_name,
                pattern: pattern_relative_rotated, // 旋转后的pattern
            })
        }
    }
}