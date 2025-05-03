function addShellfish_local(str){
    shellfishes.push(new Shellfish(str))
}

function upload(data){
    const url="https://cn.apihz.cn/api/cunchu/textcc.php?id=10003632&key=2d28bb4369491dd93cccdb543de18b6e&type=1&numid=2&words="+JSON.stringify(data);
    fetch(url).then((response)=>{
      console.log(response)
    })
}
function download(){
    console.log("downloading...");
    const url="https://cn.apihz.cn/api/cunchu/textcc.php?id=10003632&key=2d28bb4369491dd93cccdb543de18b6e&type=2&numid=2";
    fetch(url).then((response)=>{
      console.log(response);
      return response.json();
    }).then((obj)=>{
      console.log(obj);
      if(obj.code=="400"){
        alert("淦，咱玩太快了，服务器ban了咱一分钟。如果你给我充会员咱俩就爽玩");
        
      }
    //   return JSON.parse(obj.words);
      return obj.words;
    }).then((data)=>{
    //   console.log(data);
      solveData(data);
    })
}

function uploadShellfishes(shellfishes){
    let str_list = []
    for(let sf of shellfishes){
        str_list.push(sf.sf);
    }
    let string = JSON.stringify(str_list);
    console.log("SendingData:",string);
    upload(string);
}

function solveData(data){
    console.log("SolveData:",data);
    let new_strings = JSON.parse(data.slice(1,-1))
    console.log(new_strings)

    let current_strings = shellfishes.map((sf)=>sf.sf);
    //新量 - 旧量 = 增量
    let delta_strings = {}
    for(let shellfish of current_strings){
        if(shellfish in delta_strings == false) delta_strings[shellfish] = 0;
        delta_strings[shellfish]--;
    }
    for(let shellfish of new_strings){
        if(shellfish in delta_strings == false) delta_strings[shellfish] = 0;
        delta_strings[shellfish]++;
    }
    console.log(delta_strings);

    for(let shellfish in delta_strings){
        if(delta_strings[shellfish] == 0) continue;
        if(delta_strings[shellfish] > 0){
            for(let i=0;i<delta_strings[shellfish];i++){
                addShellfish_local(shellfish)
            }
        }
        if(delta_strings[shellfish] < 0){
            shellfishes = shellfishes.filter((sf)=>{
                let string = sf.sf;
                if(delta_strings[shellfish] == 0) return true;//扣够了，保留
                if(string != shellfish) return true;//抓错人了，保留
                delta_strings[shellfish]++; sf.kill(); return false //就是你啦！剩余处决数绝对值减一，你滚
            })
        }
    }
}

function addShellfish(str){
    addShellfish_local(str);
    uploadShellfishes(shellfishes);
}
function new_shellfish_btn(){
    addShellfish(document.getElementById('new_shellfish').value);
}
function kill_shellfish_btn(){
    let string = document.getElementById('kill_shellfish').value;
    for(let i in shellfishes){
        let sf = shellfishes[i];
        // console.log(string)
        let sf_str = sf.sf;
        if(string == sf_str) {sf.kill(); shellfishes.splice(i,1); break;}
    }
    console.log(shellfishes)
    uploadShellfishes(shellfishes);
}

setInterval(download,5000);

download();