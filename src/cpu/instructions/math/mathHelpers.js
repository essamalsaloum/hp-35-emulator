export const monadic = fn => ([x, ...rest]) => ([fn(x), ...rest])
export const dyadic = fn => ([x, y, z, t]) => ([fn(y, x), z, t, t])
export const dyadic2 = fn => ([x, y, z, t]) => ([fn(y, x), y, z, t])
