// 引入CryptoJS库
// import CryptoJS from '/node_modules/crypto-js/crypto-js.js';

// 加密函数
function encryptDES(message, key) {
    const encrypted = CryptoJS.DES.encrypt(message, key);
    return encrypted.toString();
}

// 解密函数
function decryptDES(encryptedMessage, key) {
    const decrypted = CryptoJS.DES.decrypt(encryptedMessage, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// 示例
const key = '12345678'; // 密钥长度必须为8字节
const message = 'Hello, World!';
const encryptedMessage = encryptDES(message, key);
console.log('Encrypted Message:', encryptedMessage);
const decryptedMessage = decryptDES(encryptedMessage, '22222222');
console.log('Decrypted Message:', decryptedMessage);