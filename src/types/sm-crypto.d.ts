declare module 'sm-crypto' {
  export const sm2: {
    doEncrypt(msg: string, pubKey: string, cipherMode?: number): string
    doDecrypt(msg: string, priKey: string, cipherMode?: number): string
  }

  export function sm3(msg: string): string

  export const sm4: {
    encrypt(msg: string, key: string, options?: any): string
    decrypt(msg: string, key: string, options?: any): string
  }
}
