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
//#region 
for (let a = 1; a < 10; a++) {
    for (let x = 1; x < 10; x++) {
        // id:0a0x
        let id = a*100+x;
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

function get_id(type,vals_me,vals_enemy){
    if(type == "a|x"){ //0起
        return (vals_me[0]-1)*9 + vals_enemy[0]-1;
    }else if(type == "ab|x"){ //81起
        return 81+ (vals_me[0]-1)*81 + (vals_me[1]-1)*9 + vals_enemy[0]-1 - (vals_me[0]-1)*vals_me[0]/2;
    }
}
let check = (t,m,e)=>{let s = situations[get_id(t,m,e)];return s.vals_me.toString()+'|'+s.vals_enemy.toString();} //DEBUG
// for(let s of situations){
//     if(s.type == "ab|xy" && s.vals_me[0] == 1 && s.vals_me[1] == 1 && s.vals_enemy[0] == 1 && s.vals_enemy[1] == 1){ console.log(s)}
// }

let transition_table = []; // transition_table[from][to] = has_access:bool
// set false to the table
for(let x=0; x<situations.length ; x++){
    transition_table.push([]);
    for(let y=0; y<situations.length;y++){
        transition_table[x].push(false);
    }
}
// assign paths
for(let s of situations){
    if(s.type == "a|x"){
        if( s.vals_me[0] + s.vals_enemy[0] == 10) continue; //到头了，不能再下降了
        
    }else if(s.type == "ab|x"){

    }else if(s.type == "a|xy"){

    }else if(s.type == "ab|xy"){

    }
}


let have_change = false; //这一轮有没有出现新的评估
let all_assessed = false; //所有局面都已评估
let origin_reached = false; //初始局面 11|11:891 已经被评估