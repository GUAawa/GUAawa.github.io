const container = document.getElementById("container");

function main(data_string){
    const data = JSON.parse(data_string);
    console.log("data: ");
    console.log(data);
    for(let date in data){
        let articles = data[date];
        console.log(date);
        console.log(articles)
        for(let id in articles){
            let article = articles[id];
            console.log(id);
            console.log(article);
            let div = document.createElement("div");
            let a = document.createElement("a");
            container.appendChild(div);
            div.appendChild(a);
            a.innerHTML = date+"-"+id+" —— "+article.title;
            a.setAttribute("href","./note.html?date="+date+"&id="+id);
        }
    }
}

download(main,3);

//正确上传流程附上
//stringify之后给转义符套上一层转义符再动
/*
d = {
    "250123":{
        "0":{
            "title":"铭日期的答案",
            "content":"这三个日期都是\nf(x)=x³-60722072x²+1229056584737121x-8292316816447879299462\n的零点哟~"
        }
    },
    "250326":{
        "0":{
            "title":"新技能 ゲット！",
            "content":"试着把这个玩意连上了git\n现在我或许会用一点git了\n论如何使用git上传\ngit add .\ngit commit -m \"description\"\ngit push -u origin main"
        }
    },
    "250329":{
        "0":{
            "title":"碰数技能 ゲット！",
            "content":"开挂\n但是\n凭实力做的挂\n怎么不算石粒"
        },
        "1":{
            "title":"性价比",
            "content":"一次就上传一条note挺亏的\n多搞点"
        }
    },
    "250504":{
        "0":{
            "title":"第一次鱼缸大战",
            "content":"白毛红瞳萝莉欲灭绝所有shellfish\n唯一幸免的是一种名称里含有空格的鱼\n这启发了GUA，于是引入了空格和零宽字符隐写，极大地打击了白毛红瞳萝莉\n鱼缸太乱了，换水了"
        }
    }
}

t = JSON.stringify(d).replaceAll("\\","\\\\")
'{"250123":{"0":{"title":"铭日期的答案","content":"这三个日期都是\\\\nf(x)=x³-60722072x²+1229056584737121x-8292316816447879299462\\\\n的零点哟~"}},"250326":{"0":{"title":"新技能 ゲット！","content":"试着把这个玩意连上了git\\\\n现在我或许会用一点git了\\\\n论如何使用git上传\\\\ngit add .\\\\ngit commit -m \\\\"description\\\\"\\\\ngit push -u origin main"}},"250329":{"0":{"title":"碰数技能 ゲット！","content":"开挂\\\\n但是\\\\n凭实力做的挂\\\\n怎么不算石粒"},"1":{"title":"性价比","content":"一次就上传一条note挺亏的\\\\n多搞点"}},"250504":{"0":{"title":"第一次鱼缸大战","content":"白毛红瞳萝莉欲灭绝所有shellfish\\\\n唯一幸免的是一种名称里含有空格的鱼\\\\n这启发了GUA，于是引入了空格和零宽字符隐写，极大地打击了白毛红瞳萝莉\\\\n鱼缸太乱了，换水了"}}}'

upload(t,3)
*/