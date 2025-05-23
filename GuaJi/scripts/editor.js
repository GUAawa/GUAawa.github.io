const [DOM_date, DOM_id, DOM_title, DOM_content, DOM_pwd] = [
    document.getElementById("date"),
    document.getElementById("id"),
    document.getElementById("title"),
    document.getElementById("content"),
    document.getElementById("pwd"),
]

async function handleGet() {
    const title = `${DOM_date.value}-${DOM_id.value} —— ${DOM_title.value}`;
    console.log(title);
    const hub_str = await TextCC.get(4);
    const hub_data = JSON.parse(hub_str);
    console.log(hub_data);
    const numid = hub_data[title];
    const content = await TextCC.get(numid);
    console.log(content);

    DOM_content.value = content;
    // alert("下载成功")
    setTimeout(()=>alert("下载成功"),1);
}

//修改 + 新建
async function handleSubmit() {
    let private_key;
    //验证密码(获取私钥)
    try{
        private_key = GUA_Crypto.decrypt(GUA_private_key_encrypted,DOM_pwd.value);
    }catch{
        alert("密码出错了 ERR: -1");
        return -1
    }

    const title = `${DOM_date.value}-${DOM_id.value} —— ${DOM_title.value}`;
    console.log(title);
    const hub_str = await TextCC.get(4);
    const hub_data = JSON.parse(hub_str);
    console.log(hub_data);
    let numid;
    if (hub_data[title]) {
        numid = hub_data[title];
    } else {
        numid = hub_data["next"];
        hub_data["next"]++;
        if (hub_data["next"] > 190) alert("警告! numid范围不足");
    }
    hub_data[title] = numid;
    //写入
    const content = DOM_content.value;
    const pig = Pigeon.sign(content,private_key,GUA_public_key);
    const str = pig.stringify()
    await TextCC.set(numid, str);
    await TextCC.set(4, JSON.stringify(hub_data));
    // alert("上传成功")
    setTimeout(()=>alert("上传成功"),1);
}

async function handleDelete() {
    const title = `${DOM_date.value}-${DOM_id.value} —— ${DOM_title.value}`;
    console.log(title);
    const hub_str = await TextCC.get(4);
    const hub_data = JSON.parse(hub_str);
    console.log(hub_data);
    if (hub_data[title] == undefined) {
        // alert("不存在的瓜记");
        setTimeout(()=>alert("不存在的瓜记"),1);
        return;
    }
    const numid = hub_data[title];
    delete hub_data[title];
    await TextCC.set(4, JSON.stringify(hub_data));
    // alert("删除成功")
    setTimeout(()=>alert("删除成功"),1);
    //文章就不删了，反正找不到了
}