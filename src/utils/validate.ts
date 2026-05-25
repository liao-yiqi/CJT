export const isHttp = (url: string) => {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}

export const isJsonBlob = async (blob: Blob) => {
  if (blob.type.includes('application/json')) {
    return true
  }
  try {
    const text = await blob.text()
    JSON.parse(text)
    return false
  } catch {
    return true
  }
}
