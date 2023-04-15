import { injectable } from "inversify";
import { IASymmetricDecryption } from "./interface/IASymmetricDecryption";
import { privateDecrypt } from "crypto";

@injectable()
class RSADecryption implements IASymmetricDecryption {

    decrypt(payload: string, key: string, passphrase: string): any {

        let buffer = Buffer.from(payload, "hex");

        return privateDecrypt({ key, passphrase }, buffer).toString("utf-8");
    }
}

export default RSADecryption;