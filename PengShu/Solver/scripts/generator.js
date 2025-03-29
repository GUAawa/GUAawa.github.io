/**
 * 局面
 * 
 * @property {string} assessment 局面评估: null "W"(winning) "L"(losing) "C"(cycle)
 * @property {number[]} to 该局面下一步可达的局面id列表
 * @property {number[]} from 可达该局面的局面id列表
 * @property {number} id id
 * @property {string} type a|x , ab|x , a|xy , ab|xy
 * @property {number[]} vals_me 增序排列，元素数与类型相符
 * @property {number[]} vals_enemy 增序排列，元素数与类型相符
 */
class Situation {
    /**
     * 
     * @param {number} id id
     * @param {string} type a|x , ab|x , a|xy , ab|xy
     * @param {number[]} vals_me 增序排列，元素数与类型相符
     * @param {number[]} vals_enemy 增序排列，元素数与类型相符
     */
    constructor(id, type, vals_me, vals_enemy) {
        this.id = id;
        this.type = type;
        this.vals_me = vals_me;
        this.vals_enemy = vals_enemy;

        this.assessment = null;
        this.from = [];
        this.to = [];
    }
}
//generate situations & assess winning
/**
 * @type {Situation[]}
 */
let situations = {};
let legal_ids = [];
//#region 
for (let a = 1; a < 10; a++) {
    for (let x = 1; x < 10; x++) {
        // id:0a0x
        let id = a * 100 + x;
        legal_ids.push(id);
        let situation = new Situation(
            id,
            "a|x",
            [a],
            [x]
        )
        situations[id] = situation;
        if (a + x == 10) { //我方可清空
            situation.assessment = "W";
        }
    }
}
for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
        for (let x = 1; x < 10; x++) {
            // id:ab0x
            let id = a * 1000 + b * 100 + x;
            legal_ids.push(id);
            let situation = new Situation(
                id,
                "ab|x",
                [a, b],
                [x]
            )
            situations[id] = situation;
        }
    }
}
for (let a = 1; a < 10; a++) {
    for (let x = 1; x < 10; x++) {
        for (let y = 1; y < 10; y++) {
            // id:0axy
            let id = a * 100 + x * 10 + y;
            legal_ids.push(id);
            let situation = new Situation(
                id,
                "a|xy",
                [a],
                [x, y]
            )
            situations[id] = situation;
            if (a + x == 10 || a + y == 10) { //我方可清空
                situation.assessment = "W";
            }
        }
    }
}
for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
        for (let x = 1; x < 10; x++) {
            for (let y = 1; y < 10; y++) {
                // id:abxy
                let id = a * 1000 + b * 100 + x * 10 + y;
                legal_ids.push(id);
                let situation = new Situation(
                    id,
                    "ab|xy",
                    [a, b],
                    [x, y]
                )
                situations[id] = situation;
            }
        }
    }
}
//#endregion
//人工标记situation
// a|x 型死循环
situations[902].assessment = "C";
situations[206].assessment = "C";
// 杂死循环
// situations[124].assessment = "C";


console.log(situations);
/**
 * transition_table[from][to] = has_access:bool
 */
let transition_table = {};
// set false to the table
for (let x = 101; x <= 9999; x++) {
    transition_table[x] = {};
    for (let y = 101; y <= 9999; y++) {
        transition_table[x][y] = false;
    }
}

function get_situation(id) {
    return situations[id];
}
function get_id(type, vals_me, vals_enemy) {
    if (type == "a|x") {
        return vals_me[0] * 100 + vals_enemy[0];
    } else if (type == "ab|x") {
        return vals_me[0] * 1000 + vals_me[1] * 100 + vals_enemy[0];
    } else if (type == "a|xy") {
        return vals_me[0] * 100 + vals_enemy[0] * 10 + vals_enemy[1];
    } else if (type == "ab|xy") {
        return vals_me[0] * 1000 + vals_me[1] * 100 + vals_enemy[0] * 10 + vals_enemy[1];
    }
}

// assign paths
for (let s of legal_ids) {
    if (situations[s].type == "a|x") {
        let a = situations[s].vals_me[0], x = situations[s].vals_enemy[0];
        if (a + x != 10) {
            let t = get_id("a|x", [x], [(a + x) % 10]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        }
    } else if (situations[s].type == "ab|x") {
        let a = situations[s].vals_me[0], b = situations[s].vals_me[1], x = situations[s].vals_enemy[0];
        if (a + x != 10) {
            let t = get_id("a|xy", [x], [(a + x) % 10, b]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        } else {
            let t = get_id("a|x", [x], [b]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        }
        if (b + x != 10) {
            let t = get_id("a|xy", [x], [a, (b + x) % 10]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        } else {
            let t = get_id("a|x", [x], [a]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        }
    } else if (situations[s].type == "a|xy") {
        let a = situations[s].vals_me[0], x = situations[s].vals_enemy[0], y = situations[s].vals_enemy[1];
        if (a + x != 10) {
            let t = get_id("ab|x", [x, y], [(a + x) % 10]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        }
        if (a + y != 10) {
            let t = get_id("ab|x", [x, y], [(a + y) % 10]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        }
    } else if (situations[s].type == "ab|xy") {
        let a = situations[s].vals_me[0],
            b = situations[s].vals_me[1],
            x = situations[s].vals_enemy[0],
            y = situations[s].vals_enemy[1];
        if (a + x != 10) {
            let t = get_id("ab|xy", [x, y], [(a + x) % 10, b]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        } else {
            let t = get_id("ab|x", [x, y], [b]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        }
        if (b + x != 10) {
            let t = get_id("ab|xy", [x, y], [a, (b + x) % 10]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        } else {
            let t = get_id("ab|x", [x, y], [a]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        }
        if (a + y != 10) {
            let t = get_id("ab|xy", [x, y], [(a + y) % 10, b]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        } else {
            let t = get_id("ab|x", [x, y], [b]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        }
        if (b + y != 10) {
            let t = get_id("ab|xy", [x, y], [a, (b + y) % 10]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        } else {
            let t = get_id("ab|x", [x, y], [a]);
            situations[s].to.push(t);
            situations[t].from.push(s)
            transition_table[s][t] = true;
        }
    }
}
//now we have map in forms as 
//transition table
//situation to
//situation from
const max_loop = 1000;
let loop_times = 0
while (true) {
    loop_times++;
    let have_change = false; //这一轮有没有出现新的评估
    let all_assessed = true; //所有局面都已评估
    let origin_reached = false; //初始局面已经被评估

    for (let s of legal_ids) {
        let S = situations[s];
        if (S.assessment != null) continue; //already assessed
        all_assessed = false;
        //rule1 have L in tos, W
        //rule2 all tos are W, L
        //rule3 as all tos are W or C, choose C
        let win_count = 0;
        let cycle_count = 0;
        for (let t of S.to) {
            let T = situations[t];
            if (T.assessment == "L") { //rule1
                S.assessment = "W";
                have_change = true;
                break;
            }
            else if (T.assessment == "W") {
                win_count++;
            }
            else if (T.assessment == "C") {
                cycle_count++;
            }
        }
        if (win_count == S.to.length) {
            S.assessment = "L";
            have_change = true;
            break;
        }
        else if (win_count+cycle_count == S.to.length) { //else说明win不够了，这里如果满足了cycle就显然不等于0
            S.assessment = "C";
            have_change = true;
            break;
        }
    }

    if (situations[1111].assessment != null) origin_reached = true;

    if (!have_change) { console.log("no change anymore"); break; }
    if (all_assessed) { console.log("all assessed"); break; }
    if (origin_reached) { console.log("origin reached"); break; }
    if (loop_times >= max_loop) { console.log("max loop reached"); break; }
}

function get_tos(s) {
    let l = [];
    for (let id of situations[s].to) {
        l.push(situations[id])
    }
    return l
}
// function analysis_loop(s, list = []) { //简单的数学，我们能发现null的唯一解释就是loop，即null的必定是nullloop的一环，自己的tos必然存在null
//     if (list.length != 0 && s in list) { return list };
//     if (list.length == 0) list.push(s);
//     let tos = get_tos(s)
//     for (let T of tos) {
//         if (T.assessment == null) {
//             console.log(T.id);
//             list.push(T.id);
//             return analysis_loop(T.id, list);
//         }
//     }
// }
let list = []; //参与null循环的状态
function analysis_loop(s, list = null) { //简单的数学，我们能发现null的唯一解释就是loop，即null的必定是nullloop的一环，自己的tos必然存在null
    if (list == null) list = [s];
    if (list.length != 0 && s in list) { return list };
    let tos = get_tos(s)
    for (let T of tos) {
        if (T.assessment == null) {
            console.log(T.id);
            list.push(T.id);

        }
    }
}
function help(s) {
    let assessment = situations[s].assessment;
    let suggestion;
    let decision = "";
    if (assessment == null) {
        suggestion = "我们无力评估，这种情况会在对局进一步发展后得到解决。";
    } else if (assessment == "L") {
        suggestion = "如果对方很聪明，你会输。期待他失误吧。";
    } else if (assessment == "C"){
        suggestion = "你们陷入了循环，如果双方都很聪明，平局。我会引导你不受压制。";
        for (let t of situations[s].to) {
            if (situations[t].assessment == "C") {
                // console.log(t);
                decision += t.toString() + "; "
            }
        }
    } else if (assessment == "W") {
        suggestion = "跟我走，你就赢定了。"
        for (let t of situations[s].to) {
            if (situations[t].assessment == "L") {
                // console.log(t);
                decision += t.toString() + "; "
            }
        }
    }
    return {
        assessment,
        suggestion,
        decision,
    }
}
// let i = 0;for(let id of legal_ids){if(situations[id].assessment!=null)i++;}console.log(i); //已评估数量
// let l = [];
// for(let s of legal_ids){
//     let S = situations[s];
//     if(S.type == "a|x"){
//         if(S.assessment == null){
//             l.push(s);
//         }
//     }
// }
// console.log(l);
// delete l;
//人工记录
/*
 */
function t(id){
    return [situations[id].assessment,situations[id].to.toString()]
}