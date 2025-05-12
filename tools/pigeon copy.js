// 1. 生成密钥对（字符串形式）
function generateKeys() {
  // 创建 RSA 密钥对
  var keys = forge.pki.rsa.generateKeyPair({ bits: 512 });
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
  var md = forge.md.sha256.create();
  md.update(data, 'utf8');
  // 签名
  var signature = privateKeyObj.sign(md);
  // 签名转换为 Base64 字符串
  return forge.util.encode64(signature);
}

// 3. 验证（字符串, 字符串, 字符串 -> 字符串）
function verifyData(data, publicKey, signature) {
  // 将公钥转换为 forge 可使用的公钥对象
  var publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
  // 将签名转换为二进制格式
  var signatureBin = forge.util.decode64(signature);
  // 创建消息摘要对象
  var md = forge.md.sha256.create();
  md.update(data, 'utf8');
  // 验证签名
  var result = publicKeyObj.verify(md.digest().bytes(), signatureBin);
  return result ? '验证通过' : '验证失败';
}

// 使用示例
// 生成密钥对
var keys = generateKeys();
console.log('私钥:', keys.privateKey);
console.log('公钥:', keys.publicKey);

// 要签名的数据
var data = '这是要签名的数据';

// 签名
var signature = signData(data, keys.privateKey);
console.log('签名:', signature);

// 验证
var verifyResult = verifyData(data, keys.publicKey, signature);
console.log('验证结果:', verifyResult);
// const Pigeon = (()=>{
//     console.log("正在获取公钥库 (numid=)")
//     class Pigeon{
//         /**
//          * 
//          * @param {String} data 数据
//          * @param {String} signing 签名 
//          * @param {String} public_key 公钥，即验证钥匙
//          */
//         constructor(data,signing,public_key){
//             [this.data,this.signing,this.public_key] = [data,signing,public_key];
//         }
//         verify(){

//         }
//     }
//     return Pigeon
// })()