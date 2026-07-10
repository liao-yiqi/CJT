import { parseArgs } from './utils/args.ts'
import * as typesGen from './generators/types.ts'
import * as apiGen from './generators/api.ts'
import * as vueGen from './generators/vue.ts'

function usageAndExit(): never {
  process.exit(1)
}

function create(
  entityName: string,
  cnName: string,
  opts: ReturnType<typeof parseArgs>['opts']
) {
  if (!entityName || !cnName) usageAndExit()

  const typesPath = typesGen.generate(entityName, opts)
  const apiPath = apiGen.generate(entityName, opts)
  const vuePath = vueGen.generate(entityName, cnName, opts)

  console.log(`
请在:
  1. 在 ${typesPath} 里补充字段
  2. 在 ${apiPath} 里替换真实接口地址
  3. 在 ${vuePath} 里按 TODO 注释填入 searchbarItems / tableColumns / formItems / dialogFormData
     字段名对不上时 TypeScript 会直接报错，照着改就行
`)
}

const { positional, opts } = parseArgs(process.argv.slice(2))
const cmd = positional[0]

if (cmd === 'create') {
  create(positional[1], positional[2], opts)
} else {
  usageAndExit()
}
