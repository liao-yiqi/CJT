import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFileSafe, lowerFirst, upperFirst } from '../utils/fs-helpers.ts'
import { parseArgs, type CliOptions } from '../utils/args.ts'

const DEFAULT_TYPES_ROOT = 'src/types'

export function buildContent(Entity: string): string {
  return `

export type ${Entity}SearchParams = {
  // exampleProp?: string
}

export type ${Entity}Data = {
  // exampleProp: string
} & CommonTableData

export type ${Entity}FormData = {
  // exampleProp: string
}
`
}

/**
 * @returns 实际写入（或本应写入）的文件路径
 */
export function generate(
  entityName: string,
  opts: Partial<CliOptions> = {}
): string {
  const domainPath = opts.domain ? `${opts.domain}/` : ''
  const apiPrefix = lowerFirst(entityName)

  const typesPath = opts.out
    ? path.resolve(process.cwd(), opts.out)
    : path.resolve(
        process.cwd(),
        DEFAULT_TYPES_ROOT,
        domainPath,
        `${apiPrefix}.d.ts`
      )

  writeFileSafe(typesPath, buildContent(upperFirst(entityName)))
  return typesPath
}

// 支持单独执行： npx tsx generators/types.ts EntityName --domain=xxx
const isMain = process.argv[1] === fileURLToPath(import.meta.url)
if (isMain) {
  const { positional, opts } = parseArgs(process.argv.slice(2))
  const entityName = positional[0]
  if (!entityName) {
    console.log(
      '用法: npx tsx generators/types.ts <EntityName> [--domain=xxx] [--out=相对路径]'
    )
    process.exit(1)
  }
  generate(entityName, opts)
}
