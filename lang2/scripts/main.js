const log_DOM = document.getElementById("log");
const input_DOM = document.getElementById("input");

input_DOM.onkeydown = ()=>{
    if(event.keyCode === 13){
        const input_value = input_DOM.value;
        input_DOM.value = "";

        push_log(`<<< ${input_value}`)

        // 词法分析：把括号替换为空格
        const input_without_blanket = input_value.replace(/\(|\)/g, " ");
        // 词法解析：按空格分割token
        const tokens_maybe_empty = input_without_blanket.split(" ");
        // 词法解析：除去空token
        const tokens = tokens_maybe_empty.filter(token => token!== "");
        console.log(tokens);
        // 语法分析：判断指令
        if(tokens[0] === "def"){
            alert("定义宏，我暂时不写");
        }else if(tokens[0] === "let"){
            const result_log = command_let(tokens);
            push_log(`>>> ${result_log}`);
        }else if(tokens[0] === "cal"){
            alert("展开宏");
        }else{
            alert("指令错误");
            push_log(`>>> 指令错误: ${tokens[0]}`)
        }
    }
}

function push_log(str){
    const log_content = log_DOM.innerHTML;
    log_DOM.innerHTML = log_content + str + "<br>";
    console.log(`push log: ${str}`)
}

var macros = {};
//初始化宏列表
console.log("还没做记忆模式，所以不初始化宏")

function command_let(tokens){
    // 定位赋值符号
    const assign_index = tokens.indexOf(":=");
    if (assign_index === -1){
        return `缺少赋值符号 ":=" !`;
    }
    if (assign_index === 1){
        return `未定义宏名称!`
    }
    // 获取宏名称和参数
    const macro_name = tokens[1];
    const macro_args = tokens.slice(2, assign_index);
    // 获取宏定义
    const actual_tokens = tokens.slice(assign_index+1);
    return `定义了宏 ${macro_name}, 接受 ${assign_index - 2} 个参数`
}