const Base64 = {
    encode(str) {
        // 将字符串转为 UTF-8 编码的字节序列，再进行 Base64 编码
        let encodedStr = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        })).replaceAll("+","-").replaceAll("/","|");
        return encodedStr;
    },
    
    // 解码
    decode(encodedStr) {
        // Base64 解码后，将字节序列转回 UTF-8 字符串
        let decodedStr = decodeURIComponent(Array.prototype.map.call(atob(encodedStr.replaceAll("-","+").replaceAll("|","/")), function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return decodedStr;
    }
}