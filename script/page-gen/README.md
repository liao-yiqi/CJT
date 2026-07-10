# CRUD 页面骨架生成器

## 目录结构

```
crud-gen/
├── cli.ts                    编排入口：顺序调用下面三个生成器
├── generators/
│   ├── types.ts               生成 xxx.d.ts，也可单独执行
│   ├── api.ts                  生成 xxx-api.ts，也可单独执行
│   └── vue.ts                   生成 index.vue，也可单独执行
├── utils/
│   ├── args.ts                 命令行参数解析（含 CliOptions 类型定义，三处共用）
│   └── fs-helpers.ts            路径拼接、安全写文件
├── tsconfig.json               仅用于给这套脚本本身做类型检查
```

## 用法一：一次性生成三个文件（走 cli.ts）

终端用法：

```bash
pnpm crud:create GenerateTemplate 生成模板 --domain=generateManagement --delete
```

权限码现在有默认值（见下方说明），不传 `--add-permission` 等参数也没关系，默认会生成 `projectTemplate:add` / `projectTemplate:edit` / `projectTemplate:remove`。如果要用自定义权限码， 照样可以显式传参覆盖：

```bash
pnpm crud:create ProjectTemplate 项目模板 --domain=projectManagement --delete --add-permission=project:template:add --edit-permission=project:template:edit --delete-permission=project:template:remove
```

会生成：

```
src/types/generateManagement/generateTemplate.d.ts
src/api/generateManagement/generateTemplate-api.ts
src/views/generateManagement/generateTemplate/index.vue
```

## 用法二：只跑其中一步

比如只想重新生成 `.vue` 文件，或者只补一个新模块的 api 文件：

```bash
npx tsx generators/vue.ts GenerateTemplate 项目模板 --domain=generateManagement --delete
npx tsx generators/api.ts GenerateTemplate --domain=generateManagement
npx tsx generators/types.ts GenerateTemplate --domain=generateManagement
```

三个子脚本各自支持的选项：

| 脚本 | 用法 |
|---|---|
| `generators/types.ts` | `npx tsx generators/types.ts <EntityName> [--domain=xxx] [--out=相对路径]` |
| `generators/api.ts` | `npx tsx generators/api.ts <EntityName> [--domain=xxx] [--out=相对路径]` |
| `generators/vue.ts` | `npx tsx generators/vue.ts <EntityName> <中文名> [--domain=xxx] [--delete] [--add-permission=xxx] [--edit-permission=xxx] [--delete-permission=xxx] [--out=相对路径]` |

## 选项说明

| 选项 | 说明 |
|---|---|
| `--domain=<name>` | 业务域目录名，对应 `views/types/api` 下的子目录。**默认不传就是空**，不会分子目录，直接生成到 `src/views/<entityLower>/index.vue` 这一级；需要分域时显式传，比如 `--domain=adminManagement` |
| `--delete` | 仅影响 `vue.ts`：控制 `.vue` 文件里要不要生成删除按钮 + `useDeleteAction` 相关代码。**`api.ts` 不受这个选项影响**，见下方说明 |
| `--add-permission=<code>` | 新增按钮权限码。**不传则默认用 `<entityLower>:add`**（比如 `--out`/`--domain` 之外，实体名是 `Test` 就默认 `test:add`），不需要权限控制的话生成完自己删掉那一行即可 |
| `--edit-permission=<code>` | 编辑按钮权限码（仅 `vue.ts` 用到） |
| `--delete-permission=<code>` | 删除按钮权限码，仅在 `--delete` 时生效。默认 `<entityLower>:remove` |
| `--out=<path>` | 覆盖输出路径（相对项目根目录），完全按你给的路径原样解析，**不会自动补 `src/` 前缀**，需要自己写全 |

## 各文件生成内容说明

### `types.ts` → 生成 `xxx.d.ts`

内容是 `XxxSearchParams` / `XxxData` / `XxxFormData` 三个接口骨架，字段留空待补。

### `api.ts` → 生成 `xxx-api.ts`

固定包含 `get${Entity}DataAPI`（用 `createListAPI` 泛型封装列表接口）、`create${Entity}API`、`get${Entity}DetailAPI`、`update${Entity}API`、`delete${Entity}API` 五个函数，**`delete${Entity}API` 始终生成，不受任何参数控制**——用不上的话生成完自己删掉这几行就行。

请求地址统一走顶部的 `${Entity}BaseUrl` 常量拼接：
```ts
const TestBaseUrl = ''

export const getTestDataAPI = createListAPI<TestSearchParams, TestData>(`${TestBaseUrl}/list`)
export const createTestAPI = (data) => request.post<BaseResponse>({ url: `${TestBaseUrl}`, data })
export const getTestDetailAPI = (id) => request.get<DataResponse<TestData>>(`${TestBaseUrl}/${id}`)
export const updateTestAPI = (data) => request.put<BaseResponse>({ url: `${TestBaseUrl}`, data })
export const deleteTestAPI = (data) => request.post<BaseResponse>({ url: `${TestBaseUrl}/delete`, data })
```
### `vue.ts` → 生成 `index.vue`

这里将填充CRUD页面所需的内容，由ScResourcePage、ScDialogForm两个组件构成、涵盖搜索栏、操作栏、表格、表单弹窗。

只需填写对应的config内容即可。
