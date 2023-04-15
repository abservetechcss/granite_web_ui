export interface IASymmetricEncryption {
    encrypt(key: string, payload: string): any;
  }