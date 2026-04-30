type StorageType = 'localStorage' | 'sessionStorage'

interface SetOptions {
  // 过期时间
  expire?: number
}

interface StorageValue<T = any> {
  value: T
  expire?: number
}

/**
 * Storage 工具类（支持 localStorage / sessionStorage）
 *
 * 该工具对浏览器原生 storage 进行二次封装，提供以下能力：
 *
 * 1. 自动 JSON 序列化 / 反序列化
 * 2. 支持数据过期时间（expire）
 * 3. 支持命名空间（prefix），避免 key 冲突
 * 4. 统一 API：set / get / remove / clear
 *
 * 数据存储结构：
 * {
 *   value: any,        // 实际存储的数据
 *   expire?: number    // 过期时间（时间戳）
 * }
 *
 * 使用示例：
 * const localCache = new Storage('localStorage')
 * localCache.set('token', 'xxx', { expire: 10000 })
 * const token = localCache.get('token')
 *
 */
class Storage {
  private storage: globalThis.Storage
  readonly prefix: string

  constructor(type: StorageType = 'localStorage', prefix = 'SC_') {
    this.storage = window[type]
    this.prefix = prefix
  }

  private getKey(key: string) {
    return `${this.prefix}${key}`
  }

  set<T = any>(key: string, value: T, options?: SetOptions) {
    const data: StorageValue = {
      value
    }
    if (options?.expire) data.expire = Date.now() + options.expire
    this.storage.setItem(this.getKey(key), JSON.stringify(data))
  }

  get<T = any>(key: string): T | null {
    const item = this.storage.getItem(this.getKey(key))
    if (!item) return null
    try {
      const data: StorageValue<T> = JSON.parse(item)
      if (data.expire && Date.now() > data.expire) {
        this.remove(key)
        return null
      }
      return data.value
    } catch (error) {
      return null
    }
  }

  remove(key: string) {
    this.storage.removeItem(this.getKey(key))
  }

  clear() {
    Object.keys(this.storage).forEach(key => {
      if (key.startsWith(this.prefix)) {
        this.storage.removeItem(key)
      }
    })
  }
}

export const localStorage = new Storage('localStorage')
export const sessionStorage = new Storage('sessionStorage')
