import forge from 'node-forge';

const {
  publicEncrypt,
  privateDecrypt
} = require("crypto");

const iv = `\u0019j*£n(ß\u001dO{\u0018\u0013\tP`;

export const decryptPrivateKey = (privateKeyString, password) =>
  forge.pki.decryptRsaPrivateKey(privateKeyString, password);

export const encryptMessage = (payload, key) => {
  return publicEncrypt(
    key,
    Buffer.from(payload, "utf-8")
  ).toString("hex");
};

export const decryptMessage = (payload, key, passphrase) => {
  try{
    let buffer = Buffer.from(payload, "hex");

    return privateDecrypt({ key, passphrase }, buffer).toString("utf-8");
  }
  catch(err){
  }

};

export const encryptAES = (key, payload) => {
  const cipher = forge.cipher.createCipher('AES-GCM', key);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(payload)));
  cipher.finish();
  const encrypted = cipher.output;
  const tag = forge.util.bytesToHex(cipher.mode.tag);
  return { text: encrypted.toHex(), tag };
};


export const decryptAES = (key, tag, payload) => {
  tag = forge.util.hexToBytes(tag)
  const input = forge.util.hexToBytes(payload);
  const buffer = forge.util.createBuffer(input);
  const decipher = forge.cipher.createDecipher('AES-GCM', key);
  
  decipher.start({iv, tag});
  decipher.update(buffer);
  decipher.finish();
  decipher.output.data = forge.util.decodeUtf8(decipher.output.data);

  return decipher.output;
}

export const generateRandomKeyAndIV = (key = null) => {
  // if key or iv passed, than we take that value and don't generate it
  const res = { key, iv };
  if (!key) res.key = forge.random.getBytesSync(16);
  if (!iv) res.iv = forge.random.getBytesSync(16);
  return res;
};