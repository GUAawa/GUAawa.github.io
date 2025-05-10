const DOM_container = document.getElementById("container");

(async () => {

    let str = await TextCC.get(4);
    let data = JSON.parse(str);
    console.log(data);

    for (let title in data) {
        if (title == "next") continue;
        const numid = data[title];
        console.log(`title: ${title}, numid: ${numid}`);

        const DOM_a = document.createElement("a")
        DOM_a.setAttribute("href", `note.html?title=${title}&numid=${numid}`);
        DOM_a.innerHTML = title;
        const DOM_div = document.createElement("div")
        DOM_container.appendChild(DOM_div);
        DOM_div.appendChild(DOM_a);

    }

})();