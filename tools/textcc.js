const TextCC = (()=>{


// 编码
function base64Encode(str) {
    // 将字符串转为 UTF-8 编码的字节序列，再进行 Base64 编码
    let encodedStr = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
    return encodedStr;
}

// 解码
function base64Decode(encodedStr) {
    // Base64 解码后，将字节序列转回 UTF-8 字符串
    let decodedStr = decodeURIComponent(Array.prototype.map.call(atob(encodedStr), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return decodedStr;
}
const TextCC = {
    /**
     * 
     * @param {number} numid 
     * @returns {Promise<string|number>} words | ERR_code
     */
    async get(numid){
        const response = await fetch(`https://cn.apihz.cn/api/cunchu/textcc.php?id=10003632&key=2d28bb4369491dd93cccdb543de18b6e&type=2&numid=${numid}`);
        console.log(response)
        if(response.status != 200){
            console.log("response 失败");
            return -1;
        }
        const res_json = await response.json();
        console.log(res_json)
        if(res_json.code != 200){
            console.log("res_json 失败");
            return -2;
        }
        const words = res_json.words;
        console.log(words);
        const words_ = base64Decode(words)
        return words_
    },

    /**
     * 
     * @param {number} numid 
     * @param {string} str 
     * @returns {Promise<number>} OK_code := 0 | ERR_code
     */
    async set(numid,str){
        const str_ = base64Encode(str)
        const response = await fetch(`https://cn.apihz.cn/api/cunchu/textcc.php?id=10003632&key=2d28bb4369491dd93cccdb543de18b6e&type=1&numid=${numid}&words=${str_}`);
        console.log(response)
        if(response.status != 200){
            console.log("response 失败");
            return -1;
        }
        const res_json = await response.json();
        console.log(res_json)
        if(res_json.code != 200){
            console.log("res_json 失败");
            return -2;
        }
        const words = res_json.words;
        console.log(words);
        return 0;
    }
}

return TextCC;
})()