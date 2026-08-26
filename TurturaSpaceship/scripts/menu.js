var MainMenu = {name: "MainMenu" , children: [
    {name: "Buildings", children: [
        {name: "Transporters", children: [
            {name: "Vortexer", function: () => setInteractStateBuilding("Vortexer")},
            {name: "Repulser", function: () => setInteractStateBuilding("Repulser")},
            {name: "Slide", function: () => setInteractStateBuilding("Slide")},
            {name: "Filter", function: () => setInteractStateBuilding("Filter")},
        ]},
        {name: "Beds", children: [
            // 自动注册
        ]}
    ]},
    {name: "Tools", children: [
        {name: "Burn Stryng", function: () => setInteractStateDeleteStryng()}
    ]},
    {name: "Documentation", children: [
        {name: "stryng", function: () => OpenPage("documentation/stryng")},
        {name: "transportation", function: () => OpenPage("documentation/transportation")},
        {name: "catalyst", function: () => OpenPage("documentation/catalyst")},
        {name: "catalysts", children: [
            {name: "aq", function: () => OpenPage("documentation/catalysts/aq")},
            {name: "qi", function: () => OpenPage("documentation/catalysts/qi")},
            {name: "srcQ", function: () => OpenPage("documentation/catalysts/srcQ")},
            {name: "srcA", function: () => OpenPage("documentation/catalysts/srcA")},
            {name: "srcI", function: () => OpenPage("documentation/catalysts/srcI")},
            {name: "input", function: () => OpenPage("documentation/catalysts/input")},
            {name: "srcQQ", function: () => OpenPage("documentation/catalysts/srcQQ")},
            {name: "srcG", function: () => OpenPage("documentation/catalysts/srcG")},
            {name: "trash", function: () => OpenPage("documentation/catalysts/trash")},
            {name: "gq", function: () => OpenPage("documentation/catalysts/gq")},
        ]},
        {name: "!!!Do not touch!!!", function: () => {
            if(!IsAdvancementCompleted("你被骗了")) CompleteAdvancement("你被骗了"); // 你被骗了
            window.open("https://www.bilibili.com/video/BV1GJ411x7h7/?spm_id_from=333.337.search-card.all.click&vd_source=d58769cd17feec8c54efcb9233da31cd", "_blank")
        }}
    ]},
    {name: "Advancements", children: []},
    {name: "Storage", content: "Storage not initialized."},
    {name: "Stories", children: [
        {name: "Prologue", children: [
            {name: "迫降", function: () => OpenPage("stories/prologue/迫降")},
            {name: "检查", function: () => OpenPage("stories/prologue/检查")},
        ]}
    ]},
    {name: "Tutorial", children: [
        {name: "操作", function: () => OpenPage("tutorial/操作")},
        {name: "第一个机器", function: () => OpenPage("tutorial/第一个机器")},
    ]},
    {name: "Save&Load", children: [
        {name: "保存", function: () => {alert("保存功能没有初始化")}}
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
    // 3.展示当前目录 或 文本
    const content = submenu.content;
    if (content !== undefined){
        const div = document.createElement("div");
        div.innerHTML = content;
        gameMenu.appendChild(div); // 文本内容
    }
    const children = submenu.children;
    if (children) {
        for(const child of children){
            const div = document.createElement("div");
            const a = document.createElement("a");
            div.appendChild(a);
            a.innerHTML = child.name;
            a.href = "javascript:void(0)"
            if (child.color) {
                a.style.color = child.color;
            }
            if (child.children || child.content !== undefined){
                a.onclick = () => GotoMenu(child);
            }
            if (child.function){
                a.onclick = child.function;
            }
            gameMenu.appendChild(div);
        }
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

function RefreshMenu(){
    DisplayMenu(menu_stack[menu_stack.length - 1]); // 更新菜单内容
}

function UpdateStorageContent(){
    let content = "";
    for (const stryng in game_state.storage){
        content += `${stryng}: ${game_state.storage[stryng]}\n`;
    }
    const storage_menu = MainMenu.children.find(child => child.name === "Storage")
    storage_menu.content = content; // 更新存储内容
    globalThis.RefreshMenu();
}

GotoMenu(MainMenu); // 显示主菜单