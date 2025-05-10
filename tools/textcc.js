const TextCC = (()=>{

const TextCC = {
    /**
     * 
     * @param {number} numid 
     * @returns {Promise<string|number>} words | ERR_code
     */
    async get(numid){
        console.log(`TextCC get: ${numid}`)
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
        const words_ = Base64.decode(words)
        return words_
    },

    /**
     * 
     * @param {number} numid 
     * @param {string} str 
     * @returns {Promise<number>} OK_code := 0 | ERR_code
     */
    async set(numid,str){
        console.log(`TextCC set: ${numid}`)
        console.log(`str:${str}`)
        const str_ = Base64.encode(str)
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