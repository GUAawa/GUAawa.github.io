const title = getQueryVariable("title");
const numid = getQueryVariable("numid");
const DOM_content = document.getElementById("content")

//设置标题
document.title = decodeURIComponent(title);

//获取正文
(async ()=>{
    const content = await TextCC.get(numid);
    console.log(content);
    let text = content;
    text = text.replaceAll("\n","<br>");
    DOM_content.innerHTML = text;
})()