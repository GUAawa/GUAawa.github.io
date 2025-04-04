const split_halftime=10*1000 //10s
const grow_halftime=5*1000 //5s
const mutate_rate=0.5 //50%

let data_got={
  time:Date.now(), //毫秒时间戳
  shellfishes_amounts:{
    " :D<":4,
  },
  shells_amounts:{
    " :D<":2,
  },
  fishes_amounts:{
    " :D<":3,
  },
  shells_projects:{
    " :D<":" :D<{",
  },
  fishes_projects:{
    " :D<":" :C<",
  }
}
console.log(data_got);

function getShell(sf){
  return sf.substring(0,3);
}
function getFish(sf){
  return sf.substring(3,sf.length);
}

function getPosibility(halftime,deltatime){
  const k=Math.pow(2,-1/halftime);
  return 1-(Math.pow(k,deltatime));
}

function handleGrow(data,time_now){
  const deltatime=time_now - data.time;
  //直接修改data
  //对每种shell
  for(let shell in data.shells_amounts){
    //生成生长（不含变异）和变异数
    let grow_amount=0;
    let mutate_amount=0;
    for(let i=0;i<data.shells_amounts[shell];i++){
      if(Math.random()<getPosibility(grow_halftime,deltatime)){
        if(data.fishes_projects[shell]&& Math.random()<mutate_rate){
          mutate_amount++;
        }else{
          grow_amount++;
        }
      }
    }
    data.shellfishes_amounts[shell]+=grow_amount;
    if(!data.shellfishes_amounts[
      data.fishes_projects[shell]
    ]) data.shellfishes_amounts[
      data.fishes_projects[shell]
    ]=0;
    data.shellfishes_amounts[
      data.fishes_projects[shell]
    ]+=mutate_amount;
  }
}