import * as Koa from 'koa'
export function home(ctx: Koa.Context) {
  return {
    data: 11
  }
}
