// id->S;S-\>id 过于复杂
//建议：严禁S对象，S对象仅用于查询和记录；只运营id；
//建议：使id漫布0~10000，但是遍历时只对存在的局面遍历
//建议：使 ab|x 和 ba|x 共存，当做两种局面处理，因我对算力有绝对自信

/**
 * 局面
 * 
 * @param {string} assessment 局面评估: null "w"(winning) "l"(losing) "c"(cycle)
 * @param {number[]} to 该局面下一步可达的局面id列表
 * @param {number[]} from 可达该局面的局面id列表
 * @param {number} id id
 * @param {string} type a|x , ab|x , a|xy , ab|xy
 * @param {number[]} vals_me 增序排列，元素数与类型相符
 * @param {number[]} vals_enemy 增序排列，元素数与类型相符
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
let situations = [];
//#region 
for (let a = 1; a < 10; a++) {
    for (let x = 1; x < 10; x++) {
        situations.push(
            new Situation(
                situations.length,
                "a|x",
                [a],
                [x]
            )
        )

        if (a + x == 10) { //我方可清空
            situations.assessment = "w";
        }
    }
}
for (let a = 1; a < 10; a++) {
    for (let b = a; b < 10; b++) {
        for (let x = 1; x < 10; x++) {
            situations.push(
                new Situation(
                    situations.length,
                    "ab|x",
                    [a, b],
                    [x]
                )
            )
        }
    }
}
for (let a = 1; a < 10; a++) {
    for (let x = 1; x < 10; x++) {
        for (let y = x; y < 10; y++) {
            situations.push(
                new Situation(
                    situations.length,
                    "a|xy",
                    [a],
                    [x, y]
                )
            )
            if (a + x == 10 || a + y == 10) { //我方可清空
                situations.assessment = "w";
            }
        }
    }
}
for (let a = 1; a < 10; a++) {
    for (let b = a; b < 10; b++) {
        for (let x = 1; x < 10; x++) {
            for (let y = x; y < 10; y++) {
                situations.push(
                    new Situation(
                        situations.length,
                        "ab|xy",
                        [a, b],
                        [x, y]
                    )
                )
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