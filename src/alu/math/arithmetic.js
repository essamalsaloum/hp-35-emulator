export default {
  add: { argCount: 2, fn: (x, y) => y + x },
  sub: { argCount: 2, fn: (x, y) => y - x },
  mul: { argCount: 2, fn: (x, y) => y * x },
  div: { argCount: 2, fn: (x, y) => y / x },
  reciproc: { argCount: 1, fn: x => 1 / x },
  chs: { argCount: 1, fn: x => -x }
}
