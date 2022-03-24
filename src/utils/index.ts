export function appError(name: string, msg: string) {
  const error = new Error(msg)

  error.name = `koa-mvc: ${name}`
  return error
}

export function appWarn(msg:string) {
  console.warn(`koa-mvc: ${msg}`)
}