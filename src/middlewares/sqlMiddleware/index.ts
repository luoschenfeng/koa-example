import { koaError } from "@/utils"
import * as Koa from "koa"
import { URL } from 'url'
/***
 * koa router middleware
 * @param ctx {Koa.Context}
 * @param next {Koa.Next}
 * @public
 */
export default async function (ctx: Koa.Context, next: Koa.Next): Promise<void> {
  await next()
}