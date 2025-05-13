const GUA_public_key = 
`-----BEGIN PUBLIC KEY-----
MFowDQYJKoZIhvcNAQEBBQADSQAwRgI/AJVu1vv8e0I+Na55CuqE+57NmjOwRWAh
pJxAd4vRGSvZ3yE9fVILdYp8NLyFKEXPgaQx9WCldNN7GXxBgtErAgMBAAE=
-----END PUBLIC KEY-----
`

const GUA_private_key_encrypted = 'U2FsdGVkX1+2mtVM2QGyWsCalRsNgPzo6Qss/q0gx78Vf1ZNeuKuP+zfOkTxVy2eCxjCqiskZkb6Z4JDBgAOO1FIgLWFjgMxoZimjobkLGbG0uralAZ6iqnDsyBtle/U/EpUeGEnwuYa8oxb095bHNhULaW7n71H7wxbaDdkxMgNXgbDInuJsbj+/kBVEaaq95EXHpJLjhbHn+NBe37uf2I91KGRdEgpfFARTTMUiTUsJOzEXPXeX7YkU3lBCpgMsvO+qxCOJjWgHUASIkxp939j6U9cqi7LLY709IuONXNozHnKZePQyDHhnoAh3ojiSBZT+M0nHWydif77bBGjB+gVcf4VsoL2vskn2StrPS6eaJp+NzJVEVZuOP+QtCoFOSPnBuzYiOfemfS0xjpDjLxl8HZFh3Q2PnNBXX+GNww3/+98i7vHOUCuzTtr1IxH+imGuFmmXxXlUUCpJ+nHkGOXLPcAwWc2LPulMoI5ckMxyVKg/vgczAgjOEumGCblhehBI0niW+x3UpszQ+uZcQ1cPBIqgkoSvb0c0F2jl6pkKI5I4J6+Jwod2v9nG6NPsAsBcl2on2CAesAumIr1W1GlOlIWLN03Go9Vkd44vSehlt4nHLbIOrUMzX61Xc6rTzTiqaxUFMtJW+MZw+XjOeaEr2TMFGyQ'

const Pigeon = (() => {
    console.log("正在获取公钥库 (numid=骗你的还没做)")

    // 1. 生成密钥对（字符串形式）
    function generateKeys() {
        // 创建 RSA 密钥对
        var keys = forge.pki.rsa.generateKeyPair({ bits: 62 * 8 });
        // 将私钥转换为 PEM 格式字符串
        var privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
        // 将公钥转换为 PEM 格式字符串
        var publicKeyPem = forge.pki.publicKeyToPem(keys.publicKey);
        return { privateKey: privateKeyPem, publicKey: publicKeyPem };
    }

    // 2. 签名（字符串, 字符串 -> 字符串）
    function signData(data, privateKey) {
        // 将私钥转换为 forge 可使用的私钥对象
        var privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
        // 创建签名对象
        var md = forge.md.md5.create();
        md.update(data, 'utf8');
        // 签名
        var signature = privateKeyObj.sign(md);
        // 签名转换为 Base64 字符串
        return forge.util.encode64(signature);
    }

    // 3. 验证（字符串, 字符串, 字符串 -> 字符串）
    // function verifyData(data, publicKey, signature) {
    //     // 将公钥转换为 forge 可使用的公钥对象
    //     var publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
    //     // 将签名转换为二进制格式
    //     var signatureBin = forge.util.decode64(signature);
    //     // 创建消息摘要对象
    //     var md = forge.md.sha256.create();
    //     md.update(data, 'utf8');
    //     // 验证签名
    //     var result = publicKeyObj.verify(md.digest().bytes(), signatureBin);
    //     return result ? '验证通过' : '验证失败';
    // }

    class Pigeon {
        /**
         * 
         * @param {String} data 数据
         * @param {String} signing 签名 
         * @param {String} public_key 公钥，即验证钥匙
         */
        constructor(data, signing, public_key) {
            [this.data, this.signing, this.public_key] = [data, signing, public_key];
        }
        static generateKeys(){
            return generateKeys();
        }
        static sign(data,privateKey,publicKey){
            return new Pigeon(data,signData(data,privateKey),publicKey);
        }
        verify(){
            try{
            var publicKeyObj = forge.pki.publicKeyFromPem(this.public_key);
            // 将签名转换为二进制格式
            var signatureBin = forge.util.decode64(this.signing);
            // 创建消息摘要对象
            var md = forge.md.md5.create();
            md.update(this.data, 'utf8');
            // 验证签名
            var result = publicKeyObj.verify(md.digest().bytes(), signatureBin);
            if(result) return result;
            else alert("Oops... Pigeon认证失败。这可能是GUA的问题，但八成是火子哥这个干净的白客污染了我的数据")
            }catch{
                alert("Oops... Pigeon出错了。这可能是GUA的问题，但八成是火子哥这个干净的白客污染了我的数据")
            }
        }
        stringify(){
            return JSON.stringify({
                data:this.data,
                public_key:this.public_key,
                signing:this.signing
            })
        }
        static parse(str){
            const obj = JSON.parse(str);
            return new Pigeon(obj.data,obj.signing,obj.public_key);
        }
        /**
         * 验证自己是不是GUA的咕咕咕
         * @returns {number} 0:正常 | -1:非GUA | -2:假签名
         */
        isGUA(){
            if(this.public_key != GUA_public_key){
                alert("这根本就不是GUA的！")
                return -1;
            }
            if(!this.verify()){
                alert("这根本就是假咕咕咕！");
                return -2;
            }
            return 0;
        }
    }
    return Pigeon
})()