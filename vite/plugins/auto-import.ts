import AutoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return AutoImport({
    // 类型文件存放地址
    dts: 'src/auto-import.d.ts',
    imports: ['vue', 'vue-router', 'pinia'],
    include: [
      // .ts, .tsx, .js, .jsx
      /\.[tj]sx?$/,
      // .vue
      /\.vue$/,
      /\.vue\?vue/,
      // .md
      /\.md$/
    ]
    // dirs: ['src/hooks/']
  })
}
