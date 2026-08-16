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
        }else if(tokens[0] === "calc"){
            const result_log = command_calc(tokens);
            push_log(`>>> ${result_log}`)
        }else if(tokens[0] === "list"){
            alert("列出宏");
        }else if(tokens[0] === "dialect"){
            alert("设置别名, 这个用于设置参数数");
        }else if(tokens[0] === "debug"){
            console.log("你debug了, 它的效果取决于瓜正在研究什么")
            // push_log(`>>> ${get_args_count(tokens[1])}`)
            push_log('开始解析树')
            const tree = construct_tree(tokens.slice(1)).tree
            console.log(tree)
            push_log('解析完成, 已推至日志')
            push_log('扁平化')
            const flat_tree = flatten_tree(tree)
            push_log(flat_tree)
            push_log('扁平化完成')
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
    const body_tokens = tokens.slice(assign_index+1);

    let macro = {
        name: macro_name,
        args: macro_args,
        args_count: assign_index - 2,
        body: body_tokens
    };
    macros[macro_name] = macro;
    
    return `定义了宏 ${macro_name}, 接受 ${assign_index - 2} 个参数`
}

var dialects = {};
//初始化方言列表
console.log("还没做方言模式，所以不初始化方言")

function get_args_count(name){
    // 查询已注册的宏
    const macro = macros[name];
    if (macro){
        console.log(`查询了宏 ${name} 的参数数量： ${macro.args_count}`)
        return macro.args_count;
    }
    // 查询方言
    const dialect = dialects[name];
    if (dialect){
        console.log(`查询了方言 ${name} 的参数数量： ${dialect.args_count}`)
        return dialect.args_count;
    }
    // 检测自定参数后缀 name_count
    const count_str = name.match(/_(\d+)$/);

    if (count_str){
        const count = parseInt(count_str[1]);
        console.log(`查询了词 ${name} 的参数数量, 采用了后缀值: ${count}`)
        return count;
    }
    
    // 漏网, 默认为叶子, 发布警告
    console.log(`查询了 ${name} 的参数数量, 但失败了, 它是叶词吗?`)
    return 0;
}

function construct_tree(tokens){
    /* 标准树json格式:
    {
        name,
        args_count,
        parent,
        children: [trees]
    }
    */
    // 我很强了，不用递归了
    let root = {
        name: "_root",
        args_count: 1,
        parent: null,
        children: []
    };
    let current_tree = root;

    let index = 0;
    while (true){
        // 检测当前树是否满
        if (current_tree.children.length === current_tree.args_count){
            // 如果是根树，则完全退出
            if (current_tree.parent === null){
                console.log("树构造完成")
                return {
                    tree: root.children[0],
                    end_index: index
                }
            }
            // 退出树
            current_tree = current_tree.parent;
            continue;
        }
        // 检测出界
        if (index >= tokens.length){
            console.log("树构造失败，超出token长度")
            return null;
        }
        // 生成子树并进入
        const token = tokens[index];
        const args_count = get_args_count(token);
        const child_tree = {
            name: token,
            args_count: args_count,
            parent: current_tree,
            children: []
        };
        current_tree.children.push(child_tree);
        current_tree = child_tree;
        index += 1;
    }
}

// 这个我想用递归
function flatten_tree(tree){
    let result = [tree.name];
    for (let child of tree.children){
        result = result.concat(flatten_tree(child));
    }
    return result;
}

function command_calc(tokens){
    // 构造语法树
    const tree_result = construct_tree(tokens.slice(1));
    if (tree_result === null){
        return "语法树构造失败";
    }
    const tree = tree_result.tree;
    // 处理
    console.log("树处理没有被实现!")
    // 输出结果
    const flat_tree = flatten_tree(tree);
    const result_log = flat_tree.join("");
    return result_log;
}