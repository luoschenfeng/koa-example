import * as Koa from "koa"
import { resolve } from 'path'

/***
 * koa router middleware
 * @param ctx {Koa.Context}
 * @param next {Koa.Next}
 * @public
 */
export default async function routerMiddleware(ctx: Koa.Context, next: Koa.Next): Promise<void> {
  const cwd = process.cwd()
  const url = ctx.request.originalUrl
  const routes = await import(resolve(cwd, 'src/routes'))
  console.log(routes)
  await next()
}
