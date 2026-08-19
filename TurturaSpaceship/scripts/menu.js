var MainMenu = {name: "MainMenu" , children: [
    {name: "Buildings", children: [
        {name: "Transporters", children: [
            {name: "Vortexer", function: () => setInteractStateBuilding("Vortexer")},
            {name: "Repulser", function: () => setInteractStateBuilding("Repulser")},
            {name: "Slide", function: () => setInteractStateBuilding("Slide")},
        ]},
        {name: "Beds", children: [
            {name: "Abed", function: () => setInteractStateBuilding("Abed")},
            {name: "Ibed", function: () => setInteractStateBuilding("Ibed")},
            {name: "Qbed", function: () => setInteractStateBuilding("Qbed")},
        ]}
    ]},
    {name: "Documentation", children: [
        {name: "stryng", function: () => OpenPage("documentation/stryng")},
        {name: "transportation", function: () => OpenPage("documentation/transportation")},
        {name: "!!!Do not touch!!!", function: () => window.open("https://www.bilibili.com/video/BV1GJ411x7h7/?spm_id_from=333.337.search-card.all.click&vd_source=d58769cd17feec8c54efcb9233da31cd", "_blank")}
    ]}
]}

function OpenPage(page){
    window.open(`texts/${page}.html`, "_blank");
}

let menu_stack = [];
function DisplayMenu(submenu){
    // 这个submenu是个目录，我们要把它展示出来
    // 1.清空菜单
    const gameMenu = document.getElementById("gameMenu");
    gameMenu.innerHTML = ""; // 清空菜单
    // 2.是否有上一级菜单，如果有，返回按钮
    if (menu_stack.length > 1){
        const div = document.createElement("div");
        const a = document.createElement("a");
        a.innerHTML = "<<[back]"
        a.href = "javascript:void(0)"
        a.onclick = () => GoBackMenu();
        div.appendChild(a);
        gameMenu.appendChild(div); // 返回按钮
    }
    // 3.展示当前目录
    const children = submenu.children;
    for(const child of children){
        const div = document.createElement("div");
        const a = document.createElement("a");
        div.appendChild(a);
        a.innerHTML = child.name;
        a.href = "javascript:void(0)"
        if (child.children){
            a.onclick = () => GotoMenu(child);
        }
        if (child.function){
            a.onclick = child.function;
        }
        gameMenu.appendChild(div);
    }
}

function GotoMenu(menu){
    menu_stack.push(menu);
    DisplayMenu(menu);
}

function GoBackMenu(){
    menu_stack.pop();
    DisplayMenu(menu_stack[menu_stack.length - 1]); // 返回上一级菜单
}

GotoMenu(MainMenu); // 显示主菜单