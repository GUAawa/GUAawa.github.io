/**
 * 
 * @param {String} data 字符串数据
 * @param {number} numid 文本库的id
 */
function upload(data,numid){
  const url="https://cn.apihz.cn/api/cunchu/textcc.php?id=10003632&key=2d28bb4369491dd93cccdb543de18b6e&type=1&numid="+numid.toString()+"&words="+data;
  fetch(url).then((response)=>{
    console.log(response)
  })
}
/**
 * 
 * @param {Function} handler 接收data字符串的函数
 * @param {number} numid 文本库的id
 */
function download(handler,numid){
  console.log("downloading...");
  const url="https://cn.apihz.cn/api/cunchu/textcc.php?id=10003632&key=2d28bb4369491dd93cccdb543de18b6e&type=2&numid="+numid.toString();
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
    handler(data);
  })
}