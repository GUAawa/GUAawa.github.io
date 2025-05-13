const numid = 6
const DOM_content = document.getElementById("content");

async function handleGet(){
    const content = await TextCC.get(numid);
    DOM_content.value = content;
    setTimeout(()=>alert("获取了哟~"),10);
}

async function handleSubmit(){
    const content = DOM_content.value;
    await TextCC.set(numid,content);
    setTimeout(()=>alert("提交了哟~"),10);
}

handleGet()