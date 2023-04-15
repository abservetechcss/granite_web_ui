export interface ISymmetricEncryption {
    encrypt(key: string, text: string, iv: string | null, convertToHex: boolean ): any;
  }