const title = getQueryVariable("title");
const numid = getQueryVariable("numid");
const DOM_content = document.getElementById("content")

//设置标题
document.title = decodeURIComponent(title);

//获取正文
(async ()=>{
    const content = await TextCC.get(numid);
    console.log(content);

    const pig = Pigeon.parse(content);
    if(pig.isGUA() != 0){
        alert("一定是火子哥干坏事了");
        return -1;
    }

    let text = pig.data;
    text = text.replaceAll("\n","<br>");
    DOM_content.innerHTML = text;
})()