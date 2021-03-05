import { isDate, isPlainObject } from './util'

function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL (url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach((key) => {
    let val = params[key]
    // 值为 null 或者 undefined 的属性，不添加到 url 参数中
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 处理参数值为数组
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach((val) => {
      if (isDate(val)) {
        // 处理参数值为时间
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        // 处理参数值为对象
        val = JSON.stringify(val)
      }
      // 处理特殊字符
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    // 丢弃 url 中的哈希标记
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 保留 url 中已存在的参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}