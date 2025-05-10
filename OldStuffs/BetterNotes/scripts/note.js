const content_DOM = document.getElementById("content");

const date = getQueryVariable("date");
const id = getQueryVariable("id");
console.log(date,id);

function main(data_string){
    const data = JSON.parse(data_string);
    console.log("data: ");
    console.log(data);
    const article = data[date][id];
    console.log("article:")
    console.log(article);

    document.title = article.title + " —— " + date + "-" + id;
    let content = article.content.replaceAll("\n","<br>");
    content_DOM.innerHTML = content;
}

download(main,3);