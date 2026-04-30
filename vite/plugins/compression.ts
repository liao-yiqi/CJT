import viteCompression from 'vite-plugin-compression'

export default function createCompression(env: Record<string, string>) {
  const { VITE_BUILD_COMPRESS } = env
  const plugin = []
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(',')
    if (compressList.includes('gzip')) {
      plugin.push(
        viteCompression({
          algorithm: 'gzip',
          threshold: 1024 * 50,
          deleteOriginFile: false
        })
      )
    }

    if (compressList.includes('brotli')) {
      plugin.push(
        viteCompression({
          algorithm: 'brotliCompress',
          threshold: 1024 * 50,
          ext: '.br',
          deleteOriginFile: false
        })
      )
    }
  }
  return plugin
}
