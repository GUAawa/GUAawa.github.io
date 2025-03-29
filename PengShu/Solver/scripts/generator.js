/**
 * 局面
 * 
 * @property {string} assessment 局面评估: null "w"(winning) "l"(losing) "c"(cycle)
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

//generate situations & assess border
let situations = {};
let legal_ids = [];
//#region 
for (let a = 1; a < 10; a++) {
    for (let x = 1; x < 10; x++) {
        // id:0a0x
        let id = a*100+x;
        legal_ids.push(id);
        let situation = new Situation(
            id,
            "a|x",
            [a],
            [x]
        )
        situations[id] = situation;
        if (a + x == 10) { //我方可清空
            situation.assessment = "w";
        }
    }
}
for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
        for (let x = 1; x < 10; x++) {
            // id:ab0x
            let id = a*1000+b*100+x;
            legal_ids.push(id);
            let situation = new Situation(
                id,
                "ab|x",
                [a,b],
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
            let id = a*100+x*10+y;
            legal_ids.push(id);
            let situation = new Situation(
                id,
                "a|xy",
                [a],
                [x,y]
            )
            situations[id] = situation;
            if (a + x == 10 || a + y == 10) { //我方可清空
                situation.assessment = "w";
            }
        }
    }
}
for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
        for (let x = 1; x < 10; x++) {
            for (let y = 1; y < 10; y++) {
                // id:abxy
                let id = a*1000+b*100+x*10+y;
                legal_ids.push(id);
                let situation = new Situation(
                    id,
                    "ab|xy",
                    [a,b],
                    [x,y]
                )
                situations[id] = situation;
            }
        }
    }
}
//#endregion

console.log(situations);

let transition_table = {}; // transition_table[from][to] = has_access:bool
// set false to the table
for(let x=0101; x<=9999 ; x++){
    transition_table[x]={};
    for(let y=0101; y<=9999;y++){
        transition_table[x][y]=false;
    }
}

function get_situation(id){
    return situations[id];
}
function get_id(type,vals_me,vals_enemy){
    if(type == "a|x"){
        return vals_me[0]*100 + vals_enemy[0];
    }else if(type == "ab|x"){
        return vals_me[0]*1000+vals_me[1]*100+vals_enemy[0];
    }else if(type == "a|xy"){
        return vals_me[0]*100+vals_enemy[0]*10+vals_enemy[1];
    }else if(type == "ab|xy"){
        return vals_me[0]*1000+vals_me[1]*100+vals_enemy[0]*10+vals_enemy[1];
    }
}

// assign paths
for(let s of legal_ids){

}


let have_change = false; //这一轮有没有出现新的评估
let all_assessed = false; //所有局面都已评估
let origin_reached = false; //初始局面 11|11:891 已经被评估