/*
我自己注意：
显示的时候不要不小心把 undefined 带上了
*/

const split_halftime = 20 * 1000 //10s
const grow_halftime = 10 * 1000 //5s
const mutate_rate = 0.3 //30%
const max_available_amount = 5;

// data样板
let data = {
    time: Date.now(), //毫秒时间戳
    shellfishes_amounts: { //sf数
        " :D<": 4,
    },
    shells_amounts: { //头
        " :D<": 2,
    },
    fishes_amounts: { //尾
        " :D<": 3,
    },
    shells_projects: { //头长怪尾
        " :D<": " :D<{",
    },
    fishes_projects: { //尾长怪头
        " :D<": " :C<",
    }
}

function getShell(sf) {
    return sf.substring(0, 3);
}
function getFish(sf) {
    return sf.substring(3, sf.length);
}

function getPosibility(halftime, deltatime) {
    const k = Math.pow(2, -1 / halftime);
    return 1 - (Math.pow(k, deltatime));
}

function handleGrow(data, time_now) {
    const deltatime = time_now - data.time;
    //直接修改data
    //对每种shell
    for (let shell in data.shells_amounts) {
        //生成生长（不含变异）和变异数
        let grow_amount = 0;
        let mutate_amount = 0;
        for (let i = 0; i < max_available_amount && i < data.shells_amounts[shell]; i++) {
            if (Math.random() < getPosibility(grow_halftime, deltatime)) {
                data.shells_amounts[shell]--;
                if (data.fishes_projects[shell] && Math.random() < mutate_rate) {
                    mutate_amount++;
                } else {
                    grow_amount++;
                }
            }
        }
        data.shellfishes_amounts[shell] += grow_amount;
        if (!data.shellfishes_amounts[
            data.shells_projects[shell]
        ]) data.shellfishes_amounts[
            data.shells_projects[shell]
        ] = 0;
        data.shellfishes_amounts[
            data.shells_projects[shell]
        ] += mutate_amount;
    }
    //对每种fish
    for (let fish in data.fishes_amounts) {
        //生成生长（不含变异）和变异数
        let grow_amount = 0;
        let mutate_amount = 0;
        for (let i = 0; i < max_available_amount && i < data.fishes_amounts[fish]; i++) {
            if (Math.random() < getPosibility(grow_halftime, deltatime)) {
                data.fishes_amounts[fish]--;
                if (data.fishes_projects[fish] && Math.random() < mutate_rate) {
                    mutate_amount++;
                } else {
                    grow_amount++;
                }
            }
        }
        data.shellfishes_amounts[fish] += grow_amount;
        if (!data.shellfishes_amounts[
            data.fishes_projects[fish]
        ]) data.shellfishes_amounts[
            data.fishes_projects[fish]
        ] = 0;
        data.shellfishes_amounts[
            data.fishes_projects[fish]
        ] += mutate_amount;
    }
}

function handleSplit(data,time_now){
    const deltatime = time_now - data.time;
    //直接修改data
    //对每种sf
    for (let shellfish in data.shellfishes_amounts) {
        //生成生长（不含变异）和变异数
        let split_amount = 0;
        for (let i = 0; i < max_available_amount && i < data.shellfishes_amounts[shellfish]; i++) {
            if (Math.random() < getPosibility(split_halftime, deltatime)) {
                data.shellfishes_amounts[shellfish]--;
                split_amount++;
            }
        }
        //add shell
        if (!data.shells_amounts[shellfish]) data.shells_amounts[shellfish] = 0;
        data.shells_amounts[shellfish] += split_amount;
        //add fish
        if (!data.fishes_amounts[shellfish]) data.fishes_amounts[shellfish] = 0;
        data.fishes_amounts[shellfish] += split_amount;
    }
}

//单机时用这个频率，且不通信
setInterval(()=>{
    handleGrow(data,Date.now())
},10000)
setInterval(()=>{
    handleSplit(data,Date.now())
},10000)