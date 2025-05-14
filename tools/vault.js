/*
改进方案：
多页
*/
/*
数据组织方案
hub : {
    usr_hash0:numid0,
    next:最新的没用的numid,
    deleted:[删除的numid，优先用它们]
}
sub : data
*/

const Vault = (() => {
    const numid_hub=5;
    const numid_max=320; //不含
    console.log(`Vault 账密系统加载中 numid_hub=${numid_hub}`);
    class Vault {
        constructor(usr,pwd){
            this.usr=usr;
            this.pwd=pwd;
            // this.usr_hash = CryptoJS.MD5(usr).toString(CryptoJS.enc.Utf8); 现在起禁止瞒着我！！！
            this.pwd_hash = CryptoJS.MD5(pwd).toString();
            this.numid;
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
            //获取hub
            const hub_str = await TextCC.get(numid_hub);
            let hub = JSON.parse(hub_str);
            console.log(hub);
            //检查撞名
            if(usr in hub){
                alert("用户已存在");
                return -2;
            }
            //开辟sub numid
            let numid_sub;
            ///deleted检查
            if(hub.deleted.length > 0){
                numid_sub = hub.deleted.shift();
            }
            ///next检查
            else {
                if(hub.next >= numid_max) {
                    alert("创建失败，Vault已耗尽");
                    return -1;
                }
                else{
                    numid_sub = hub.next++;
                }
            }
            vault.numid = numid_sub; //我傻了这俩其实是一个量但现在才想起来
            //注册用户于hub
            hub[usr] = numid_sub;
            console.log(hub);
            //更新hub
            await TextCC.set(numid_hub,JSON.stringify(hub));
            //更新sub
            let data = "verified{}";
            data = GUA_Crypto.encrypt(data,vault.pwd_hash);
            console.log(114514);
            console.log(data);
            await TextCC.set(numid_sub,data);
            return vault;
        }
        /**
         * 初次生成时会获取自己的numid
         * @returns {number} 负数: 错误 | 正数: numid
         */
        async get_numid(){
            const hub_str = await TextCC.get(numid_hub);
            let hub = JSON.parse(hub_str);
            console.log(hub);
            if(!(this.usr in hub)) {
                alert("未知的用户");
                return -1;
            }
            this.numid = hub[this.usr];
            return this.numid;
        }
        /**
         * 覆盖账密, 和Create几乎一样，但是data是可变的，且会验证密码 (当然是防止小孩误食而非防熊)
         * @param {Prototype} data 新的数据
         */
        async set(data){
            //获取numid
            if(!(this.numid)) await this.get_numid();
            //获取data_encrypted
            const data_encrypted = await TextCC.get(this.numid);
            console.log(data_encrypted);
            //解密以验证密码
            const data_decrypted = GUA_Crypto.decrypt(data_encrypted,this.pwd_hash)
            if(data_decrypted.slice(0,8) != "verified"){
                console.log("错误的密码 ERR=-2");
                return -2;
            }
            //更新data
            const data_new = "verified" + JSON.stringify(data);
            console.log(data_new);
            const data_new_encrypted = GUA_Crypto.encrypt(data_new,this.pwd_hash);
            console.log(data_new_encrypted);
            //上传
            await TextCC.set(this.numid,data_new_encrypted);
            return 0;
        }
        /**
         * 获取账密内数据
         * @returns {Prototype}
         */
        async get(){
            //获取numid
            if(!(this.numid)) await this.get_numid();
            //获取data_encrypted
            const data_encrypted = await TextCC.get(this.numid);
            console.log(data_encrypted);
            //解密以验证密码
            const data_decrypted = GUA_Crypto.decrypt(data_encrypted,this.pwd_hash)
            if(data_decrypted.slice(0,8) != "verified"){
                console.log("错误的密码 ERR=-2");
                return -2;
            }
            //生成JSON data
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
        static async Delete(usr,pwd,no_pwd_check = false){
            let vault = new Vault(usr,pwd);
            //获取numid
            await vault.get_numid();
            //获取data_encrypted
            const data_encrypted = await TextCC.get(vault.numid);
            console.log(data_encrypted);
            //解密以验证密码
            const data_decrypted = GUA_Crypto.decrypt(data_encrypted,vault.pwd_hash)
            if(no_pwd_check) console.log("无密码强制删除")
            if(!no_pwd_check && data_decrypted.slice(0,8) != "verified"){
                console.log("错误的密码 ERR=-2");
                return -2;
            }
            //更新hub
            const hub_str = await TextCC.get(numid_hub);
            let hub = JSON.parse(hub_str);
            console.log(hub);
            hub.deleted.push(vault.numid);
            delete hub[vault.usr];
            console.log(hub);
            //上传
            await TextCC.set(numid_hub,JSON.stringify(hub));
            return 0;
        }
        async reset(new_usr,new_pwd){
            //迁出data + 判断密码
            const data = await this.get();
            if(data == -2){
                alert("旧账密错误 ERR: -1")
                return -1
            }
            let new_vault;
            if(new_usr != this.usr){
                //创建新的
                new_vault = await Vault.Create(new_usr,new_pwd);
                if(new_vault == -2 || new_vault == -1){
                    alert("新账密创建失败 ERR: -2")
                    return -2
                }
                //删除旧的
                await Vault.Delete(this.usr,this.pwd);
            }else{
                //删除旧的
                await Vault.Delete(this.usr,this.pwd);
                //创建新的
                new_vault = await Vault.Create(new_usr,new_pwd);
            }
            //更新this
            [this.usr,this.pwd,this.pwd_hash,this.numid] = [new_vault.usr,new_vault.pwd,new_vault.pwd_hash,new_vault.numid];
            //迁入data
            await this.set(data);
        }
    }
    return Vault
})()