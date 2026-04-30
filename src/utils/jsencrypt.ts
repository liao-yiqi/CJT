import JSEncrypt from 'jsencrypt'
import { sm2, sm4 } from 'sm-crypto'
import { PARAM_PUBLIC_KEY, PRIVATE_KEY, PUBLIC_KEY } from '@/constant/encryptionKey'

// 加密
export const encrypt = (txt: string) => {
  const encryptor = new JSEncrypt()
  // 设置公钥
  encryptor.setPublicKey(PUBLIC_KEY)
  // 对数据进行加密
  return encryptor.encrypt(txt)
}

// 解密
export const decrypt = (txt?: string) => {
  if (!txt) return ''
  const encryptor = new JSEncrypt()
  // 设置私钥
  encryptor.setPrivateKey(PRIVATE_KEY)
  // 对数据进行解密
  return encryptor.decrypt(txt)
}

// SM2加密
export const encryptWithSm2 = (txt?: string) => {
  return sm2.doEncrypt(txt || '', PARAM_PUBLIC_KEY, 1)
}

export const SM2Encrypt = (message: string) => {
  return sm2.doEncrypt(message, PARAM_PUBLIC_KEY, 1)
}

// SM2解密
export const SM2Decrypt = (cipherText: string, privateKey: string): string => {
  return sm2.doDecrypt(cipherText, privateKey, 1)
}

// SM4加密
export const encryptWithSM4 = (data: string, key: string, iv: string): string => {
  return sm4.encrypt(data, key, {
    mode: 'cbc',
    iv: iv,
    output: 'hex'
  })
}

// SM4解密
export const decryptWithSM4 = (encryptedData: string, key: string, iv: string): string => {
  return sm4.decrypt(encryptedData, key, {
    mode: 'cbc',
    iv: iv,
    input: 'hex'
  })
}

// 生成随机字符串
export const generateRandomKey = (len: number): string => {
  if ('crypto' in window) {
    const arr = new Uint8Array(len)
    // 使用crypto.getRandomValues()生成随机数
    window.crypto.getRandomValues(arr)
    // 将随机数转换为字符串
    const key = Array.from(arr)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('')
    return key
  } else {
    return 'API no supported'
  }
}

// 生成随机密钥
export const generateRandomSymmetricKey = (): { symmetricKey: string; iv: string } => {
  // 生成16字节的随机对称密钥
  const symmetricKey = generateRandomKey(16)
  const iv = generateRandomKey(16)
  return { symmetricKey, iv }
}
