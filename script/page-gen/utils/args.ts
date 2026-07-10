export interface CliOptions {
  domain: string
  delete: boolean
  out: string
  addPermission?: string
  editPermission?: string
  deletePermission?: string
}

export interface ParsedArgs {
  positional: string[]
  opts: CliOptions
}

export function parseArgs(argv: string[]): ParsedArgs {
  const positional: string[] = []
  const opts: CliOptions = { domain: '', delete: false, out: '' }

  for (const a of argv) {
    if (a === '--delete') {
      opts.delete = true
    } else if (a.startsWith('--domain=')) {
      opts.domain = a.slice('--domain='.length)
    } else if (a.startsWith('--out=')) {
      opts.out = a.slice('--out='.length)
    } else if (a.startsWith('--add-permission=')) {
      opts.addPermission = a.slice('--add-permission='.length)
    } else if (a.startsWith('--edit-permission=')) {
      opts.editPermission = a.slice('--edit-permission='.length)
    } else if (a.startsWith('--delete-permission=')) {
      opts.deletePermission = a.slice('--delete-permission='.length)
    } else if (a.startsWith('--')) {
      console.warn(`忽略未知参数：${a}`)
    } else {
      positional.push(a)
    }
  }

  return { positional, opts }
}
