import fs from 'node:fs'
import path from 'node:path'

export function lowerFirst(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export function upperFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 写文件，如果目标已存在则跳过并打印提示，不会覆盖已有内容。
 * 返回 true 表示写入成功，false 表示跳过。
 */
export function writeFileSafe(filePath: string, content: string): boolean {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (fs.existsSync(filePath)) {
    console.error(`已存在，跳过（避免覆盖）：${filePath}`)
    return false
  }
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`已生成：${filePath}`)
  return true
}
