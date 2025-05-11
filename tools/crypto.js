const GUA_Crypto = {
    encrypt: (message, key) => CryptoJS.DES.encrypt(message, key).toString(),
    decrypt: (encrypted, key) => CryptoJS.DES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8)
}

