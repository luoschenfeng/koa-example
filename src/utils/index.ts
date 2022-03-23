export function koaError (name:string, msg:string) {
    const error = new Error(msg)
    error.name = `koa-mvc: ${name}`
    return error
  }