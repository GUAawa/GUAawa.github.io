const Vault = (() => {
    const storage_numid=5;
    console.log(`Vault 账密系统加载中 storage_numid=${storage_numid}`);
    class Vault {
        constructor(usr,pwd){
            [this.usr,this.pwd] = [usr,pwd];
            this.usr_hash = CryptoJS.SHA1(usr).toString();
            this.pwd_hash = CryptoJS.SHA1(pwd).toString();
        }
        /**
         * 创建新的账密 (或覆盖)
         * @param {String} usr 
         * @param {String} pwd 
         * @returns 
         */
        static async Create(usr,pwd){
            //生成本地vault
            const vault = new Vault(usr,pwd);
            //增加线上vault
            const storage_str = await TextCC.get(storage_numid);
            const storage = JSON.parse(storage_str);
            console.log(storage);
            let data = "verified{}";
            data = GUA_Crypto.encrypt(data,vault.pwd_hash);
            storage[vault.usr_hash] = data;
            console.log(storage)
            await TextCC.set(storage_numid,JSON.stringify(storage));
            return vault;
        }
        /**
         * 覆盖账密, 和Create几乎一样，但是data是可变的，且会验证密码 (当然是防止小孩误食而非防熊)
         * @param {Prototype} data 新的数据
         */
        async set(data){
            //获取storage&验证密码
            const storage_str = await TextCC.get(storage_numid);
            const storage = JSON.parse(storage_str);
            console.log(storage);
            const data_encrypted = storage[vault.usr_hash];
            if(data_encrypted == undefined){
                console.log("错误的用户 ERR=-1");
                return -1;
            }
            const data_decrypted = GUA_Crypto.decrypt(data_encrypted,this.pwd_hash)
            if(data_decrypted.slice(0,8) != "verified"){
                console.log("错误的密码 ERR=-2");
                return -2;
            }
            //更新data
            const data_new_decrypted = "verified" + JSON.stringify(data);
            console.log(data_new_decrypted);
            const data_new_encrypted = GUA_Crypto.encrypt(data_new_decrypted,this.pwd_hash);
            storage[this.usr_hash] = data_new_encrypted;
            console.log(storage);
            //上传
            await TextCC.set(storage_numid,JSON.stringify(storage));
            return 0;
        }
        /**
         * 获取账密内数据
         * @returns {Prototype}
         */
        async get(){
            //获取storage&验证密码
            const storage_str = await TextCC.get(storage_numid);
            const storage = JSON.parse(storage_str);
            console.log(storage);
            const data_encrypted = storage[vault.usr_hash];
            if(data_encrypted == undefined){
                console.log("错误的用户 ERR=-1");
                return -1;
            }
            const data_decrypted = GUA_Crypto.decrypt(data_encrypted,this.pwd_hash)
            if(data_decrypted.slice(0,8) != "verified"){
                console.log("错误的密码 ERR=-2");
                return -2;
            }
            //解码解JSON
            const data_str = data_decrypted.slice(8);
            const data = JSON.parse(data_str);
            console.log(data);
            return data;
        }
        /**
         * Delete被特地定义为静态，除了方便伟大的我控制台操作，也是为了防止我误食
         * @param {String} usr 
         * @param {String} pwd 
         */
        static async Delete(usr,pwd){
            const vault = new Vault(usr,pwd);
            //获取storage
            const storage_str = await TextCC.get(storage_numid);
            const storage = JSON.parse(storage_str);
            //删除vault
            delete storage[vault.usr_hash];
            console.log(storage);
            //上传
            await TextCC.set(storage_numid,JSON.stringify(storage));
            return 0;
        }
    }
    return Vault
})()