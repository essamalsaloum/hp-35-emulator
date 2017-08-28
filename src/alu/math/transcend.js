const degreesToRadians = degrees => degrees * Math.PI / 180.0
const radiansToDegrees = radians => radians * 180.0 / Math.PI

export default {
  pow: { argCount: 2, fn: (x, y) => Math.pow(y, x) },
  log: { argCount: 1, fn: x => Math.log10(x) },
  ln: { argCount: 1, fn: x => Math.log(x) },
  exp: { argCount: 1, fn: x => Math.exp(x) },
  sqrt: { argCount: 1, fn: x => Math.sqrt(x) },

  reciproc: { argCount: 1, fn: x => 1 / x },

  sin: { argCount: 1, fn: x => Math.sin(degreesToRadians(x)) },
  cos: { argCount: 1, fn: x => Math.cos(degreesToRadians(x)) },
  tan: { argCount: 1, fn: x => Math.tan(degreesToRadians(x)) },

  asin: { argCount: 1, fn: x => radiansToDegrees(Math.asin(x)) },
  acos: { argCount: 1, fn: x => radiansToDegrees(Math.acos(x)) },
  atan: { argCount: 1, fn: x => radiansToDegrees(Math.atan(x)) }
}
