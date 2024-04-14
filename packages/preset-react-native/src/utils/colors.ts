export function hexToRGB(hex: string) {
  let alpha = false
  let h: string | number = hex.slice(hex.startsWith('#') ? 1 : 0)
  if (h.length === 3)
    h = [...h].map(x => x + x).join('')
  else if (h.length === 8)
    alpha = true
  h = Number.parseInt(h, 16)
  if (alpha)
    return [h >>> 24, (0x00FF0000) >>> 16, (h & 0x0000FF00) >>> 8, h & 0x000000FF]
  return [h >>> 16, (h & 0x00FF00) >>> 8, (h & 0x0000FF) >>> 0]
}
