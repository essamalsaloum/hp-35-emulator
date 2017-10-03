export const monadic = fn => ([x, ...rest]) => ([fn(x), ...rest])
export const dyadic = fn => ([x, y, z, t]) => ([fn(x, y), z, t, t])
export const dyadic2 = fn => ([x, y, z, t]) => ([fn(x, y), y, z, t])
