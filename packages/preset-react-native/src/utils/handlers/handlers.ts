import { numberRE } from './regex'

function round(n: number) {
  return n.toFixed(10).replace(/\.0+$/, '').replace(/(\.\d+?)0+$/, '$1')
}

export function bracket(str: string) {
  if (str && str.startsWith('[') && str.endsWith(']')) {
    const base = str.slice(1, -1)

    if (!base)
      return

    let curly = 0
    for (const i of base) {
      if (i === '[') {
        curly += 1
      }
      else if (i === ']') {
        curly -= 1
        if (curly < 0)
          return
      }
    }
    if (curly)
      return
    if (!numberRE.test(base))
      return base
    const num = Number.parseFloat(base)
    if (!Number.isNaN(num))
      return num
  }
}

export function number(str: string): number | undefined {
  if (!numberRE.test(str))
    return
  const num = Number.parseFloat(str)
  if (!Number.isNaN(num))
    return num
}

export function auto(str: string) {
  if (str === 'auto')
    return 'auto'
}

export function fraction(str: string) {
  if (str === 'full')
    return '100%'
  const [left, right] = str.split('/')
  const num = Number.parseFloat(left) / Number.parseFloat(right)
  if (!Number.isNaN(num)) {
    if (num === 0)
      return 0
    return `${round(num * 100)}%`
  }
}

export function percent(str: string) {
  if (str.endsWith('%'))
    str = str.slice(0, -1)
  if (!numberRE.test(str))
    return
  const num = Number.parseFloat(str)
  if (!Number.isNaN(num))
    return round(num / 100)
}
