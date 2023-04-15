import { injectable } from "inversify";

import crypto from "crypto" 

import { ISymmetricDecryption } from "./interface/ISymmetricDecryption";
  
@injectable()
class AESDecryption implements ISymmetricDecryption {
    
    decryptFile(key: string, text: string, iv: string) {

      try{
        const encryptedText = Buffer.from(text, "hex")
        let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
        decipher.setAutoPadding(true);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        console.log("===============================decrypted.toString()===================================", decrypted.toString())
        return decrypted.toString();
      }
      catch(error){
        console.log(error)
        throw error
      }
    }
    
    decrypt(key: string, text: string, iv: string): any {

        let encryptedText = Buffer.from(text, "hex");
        let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

      // const ENCRYPTION_KEY = 'Must256bytes(32characters)secret';
      // const SALT = 'somethingrandom';
      // const IV_LENGTH = 16;
      // let key = pbkdf2Sync(ENCRYPTION_KEY, SALT, 10000, 32, 'sha512')

      // const NONCE_LENGTH = 5; // Gives us 8-character Base64 output. The higher this number, the better

      // let nonce = randomBytes(NONCE_LENGTH);
      // let iv = Buffer.alloc(IV_LENGTH)
      // nonce.copy(iv)

      // let cipher = createCipheriv('aes-256-cbc', key, iv);
      // let encrypted = cipher.update("ABC");
      // let message = Buffer.concat([nonce, encrypted, cipher.final()]);
      // let encryptedMessage = message.toString('base64')

      // let message2 = Buffer.from(encryptedMessage, 'base64')
      // let iv2 = Buffer.alloc(IV_LENGTH)
      // message.copy(iv2, 0, 0, NONCE_LENGTH)
      // let encryptedText = message2.slice(NONCE_LENGTH)
      // let decipher = createDecipheriv('aes-256-cbc', key, iv2);
      // let decrypted = decipher.update(encryptedText);
      // try{
      //   decrypted = Buffer.concat([decrypted, decipher.final()]);
      //   return decrypted.toString();
      // }catch(Err){
      //   return 'NULL';
      // }

      // const algorithm = "aes-256-cbc"; 

      // // generate 16 bytes of random data
      // const initVector = crypto.randomBytes(16);
      
      // // protected data
      // const message = "This is a secret message";
      
      // // secret key generate 32 bytes of random data
      // const Securitykey = crypto.randomBytes(32);
      
      // // the cipher function
      // const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
      
      // // encrypt the message
      // // input encoding
      // // output encoding
      // let encryptedData = cipher.update(message, "utf-8", "hex");
      
      // encryptedData += cipher.final("hex");
      
      // console.log("Encrypted message: " + encryptedData);
      
      // // the decipher function
      // const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
      
      // let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

      // decryptedData += decipher.final("utf8");

      // console.log("Decrypted message: " + decryptedData);
          
      // try{
      
      //   const key = crypto.randomBytes(32).toString("hex");  
      //   const iv = crypto.randomBytes(16).toString("hex");
      //   const text = 'qwerty'
      //   let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
      //   cipher.setAutoPadding(true);
      //   let encrypted = cipher.update(text);
      //   encrypted = Buffer.concat([encrypted, cipher.final()]);
      //   const encryptedMessage =  encrypted.toString("hex");

      //   const encryptedText = Buffer.from(encryptedMessage, "hex");
      //   let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
      //   decipher.setAutoPadding(true);
      //   let decrypted = decipher.update(encryptedText);
      //   decrypted = Buffer.concat([decrypted, decipher.final()]);
      //   console.log("=============================================decryptedvlaue", decrypted.toString());
      // }
      // catch(error){
      //   console.log(error)
      //   throw error
      // }
}

export default AESDecryption;

