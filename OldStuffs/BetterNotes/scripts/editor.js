var data;

function main(data_string){
    data = JSON.parse(data_string);
    console.log("data: ");
    console.log(data);
}

download(main,3);

const DOM_date = document.getElementById("date");
const DOM_id = document.getElementById("id");
const DOM_title = document.getElementById("title");
const DOM_content = document.getElementById("content");
function handleSubmit(){
    let date = DOM_date.value;
    let id = DOM_id.value;
    let title = DOM_title.value;
    let content = DOM_content.value;
    // alert(date+id+title+content);
    if(!(data[date])) data[date] = {};
    if(!(data[date][id])) data[date][id] = {};
    data[date][id].title = title;
    data[date][id].content = content;
    console.log(data);
    const data_string = JSON.stringify(data).replaceAll("\\","\\\\");
    upload(data_string,3);
}

function handleDelete(){
    let date = DOM_date.value;
    let id = DOM_id.value;

    delete data[date][id];
    let flag = true;
    for(let i in data[date]){
        flag = false; break;
    }
    if(flag) delete data[date];

    console.log(data);
    const data_string = JSON.stringify(data).replaceAll("\\","\\\\");
    upload(data_string,3);
}