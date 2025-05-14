const DOM_old_usr = document.getElementById("old_usr");
const DOM_old_pwd = document.getElementById("old_pwd");
const DOM_new_usr = document.getElementById("new_usr");
const DOM_new_pwd = document.getElementById("new_pwd");

async function reset(){
    setTimeout(()=>alert("改中..."),10);
    let vault = new Vault(DOM_old_usr.value,DOM_old_pwd.value);
    await vault.reset(DOM_new_usr.value,DOM_new_pwd.value);
    setTimeout(()=>alert("改啦~"),10);
}