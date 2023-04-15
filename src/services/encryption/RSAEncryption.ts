import { injectable } from "inversify";
import { publicEncrypt }  from "crypto";
import { IASymmetricEncryption } from "./interface/IASymmetricEncryption";

@injectable()
class RSAEncryption implements IASymmetricEncryption {
    
    encrypt(key: string, payload: string) {
        return publicEncrypt(key, Buffer.from(payload, "utf-8")).toString("hex");    }
}

export default RSAEncryption;