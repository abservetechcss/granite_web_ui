export interface IASymmetricDecryption {
    decrypt(payload: string, key: string, passphrase: string) : any
}