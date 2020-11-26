const CryptoJS = require('crypto-js');
import {ServicesKeys as keys} from '../keys/services-keys';
export class EncryptDecrypt {
  type: string;
  constructor(type: string) {
    this.type = type;
  }
  Encrypt(text: string) {
    switch (this.type) {
      case keys.MD5:
        return CryptoJS.MD5(text).toString();
        break;
      case keys.AES:
        return CryptoJS.AES.encrypt(text, keys.AES_SECRET_KEY).toString();
        break;
      case keys.SHA_512:

        break;
      default:
        return "this type of creypt is not supported."
        break;
    }
  }
}
