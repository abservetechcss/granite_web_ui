import { injectable } from "inversify";
import { ISymmetricEncryption } from "./interface/ISymmetricEncryption";
import { randomBytes, createCipheriv }  from "crypto";

@injectable()
class AESEncryption implements ISymmetricEncryption {
    
    encrypt(key: string, text: string, iv: string | null = null, convertToHex: boolean) : any {
    
        if (!iv) {
            iv = randomBytes(16).toString("hex");
        }
        
        let cipher = createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
        cipher.setAutoPadding(true);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { content: convertToHex ? encrypted.toString("hex") : encrypted, iv: iv };
    }
}

export default AESEncryption;