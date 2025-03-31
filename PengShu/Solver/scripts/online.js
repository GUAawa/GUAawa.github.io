const data_storage=document.getElementById("data_storage");

async function createOrUpdateText(key, value) {
    const url = `https://api.textdb.online/update/?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`;
    try {
        let response = await fetch(url, {
            method: 'POST', // 或者使用POST方法
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`
        });
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
async function readText(key,call) {
    const url = `https://textdb.online/${encodeURIComponent(key)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.text();
        console.log(url)
        call(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

let time=0;
function newGame(){
  let data={
    time:0,
    myTurn:true,
    vals_me:[1,1],
    vals_enemy:[1,1],
  }
  createOrUpdateText(
    'guatxt3347',
    JSON.stringify(data)
  )
}
function align(){
  readText('guatxt3347',
  function(dataString){
    let data=JSON.parse(dataString);
    console.log('get data:')
    console.log(data)
    if(data.time==time) return; //这就是我发的
    time=data.time;
    myNum1box.value=data.vals_me[0];
    myNum2box.value=data.vals_me[1];
    enemyNum1box.value=data.vals_enemy[0];
    enemyNum2box.value=data.vals_enemy[1];
    myTurnbox.checked=data.myTurn;
    enemyTurnbox.checked=!data.myTurn
  }
  );
}
function submit(){
  let data={
    time:time+1,
    myTurn:!(myTurnbox.checked),
    vals_me:[myNum1box.value,myNum2box.value],
    vals_enemy:[enemyNum1box.value,enemyNum2box.value]
  }
  console.log('submit data:');
  console.log(JSON.stringify(data));
  createOrUpdateText(
    'guatxt3347',
    JSON.stringify(data)
  )
}
