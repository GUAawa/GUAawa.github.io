const data_storage=document.getElementById("data_storage");


function upload(data){
  const url="https://cn.apihz.cn/api/cunchu/textcc.php?id=10003632&key=2d28bb4369491dd93cccdb543de18b6e&type=1&numid=1&words="+JSON.stringify(data);
  fetch(url).then((response)=>{
    console.log(response)
  })
}
function download(){
  console.log("downloading...");
  const url="https://cn.apihz.cn/api/cunchu/textcc.php?id=10003632&key=2d28bb4369491dd93cccdb543de18b6e&type=2&numid=1";
  fetch(url).then((response)=>{
    console.log(response);
    return response.json();
  }).then((obj)=>{
    console.log(obj);
    if(obj.code=="400"){
      alert("淦，咱玩太快了，服务器ban了咱一分钟。如果你给我充会员咱俩就爽玩");
      
    }
    return JSON.parse(obj.words);
  }).then((data)=>{
    console.log(data);
    alignData(data)
  })
}

let time=0;
function newGame(){
  console.log("submitting(new)...")
  let data={
    time:-114,
    myTurn:true,
    vals_me:[1,1],
    vals_enemy:[1,1],
  }
  console.log(data);
  upload(data);
}
function alignData(data){
    if(data.time==time) return; //这就是我发的
    time=data.time;
    if(time<0) time=0;
    myNum1box.value=data.vals_me[0];
    myNum2box.value=data.vals_me[1];
    enemyNum1box.value=data.vals_enemy[0];
    enemyNum2box.value=data.vals_enemy[1];
    myTurnbox.checked=data.myTurn;
    enemyTurnbox.checked=!data.myTurn
  }
function submitData(){
  console.log("submitting...")
  let data={
    time:time+1,
    myTurn:!(myTurnbox.checked),
    vals_me:[myNum1box.value,myNum2box.value],
    vals_enemy:[enemyNum1box.value,enemyNum2box.value]
  };
  console.log(data);
  upload(data);
}

//setInterval(download,12000)
