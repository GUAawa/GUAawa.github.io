const Pigeon = (()=>{
    console.log("正在获取公钥库 (numid=)")
    class Pigeon{
        /**
         * 
         * @param {String} data 数据
         * @param {String} signing 签名 
         * @param {String} public_key 公钥，即验证钥匙
         */
        constructor(data,signing,public_key){
            [this.data,this.signing,this.public_key] = [data,signing,public_key];
        }
        verify(){

        }
    }
    return Pigeon
})()