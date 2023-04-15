export interface ISymmetricDecryption {
    decrypt(key: string, text: string, iv: string ): any;
    decryptFile(key: string, text: string, iv: string ): any;
  }