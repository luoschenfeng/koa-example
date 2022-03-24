import * as Koa from 'koa'
import {
  defineAsyncRoutes, 
} from './Router'
import {
  URL, 
} from 'url'
import {
  responseJsonError, 
} from '@/core/response'
import type {
  route, routerMatchedInfo, controller, methodUnion, 
} from './Router.interface'

/***
 * koa router middleware
 * @param ctx {Koa.Context}
 * @param next {Koa.Next}
 * @public
 */
export default function routerMiddleware(option: {
  root: string
} = {
  root: '@/routes',
}) {
  return async function (ctx: Koa.Context, next: Koa.Next): Promise<void> {

    const urlObj = new URL(ctx.request.href)


    const method = ctx.request.method as methodUnion

    const routes: route[] = await (defineAsyncRoutes(option.root)())

    const pathStr = urlObj.pathname.slice(1)

    const paths = pathStr.split('/')

    let callback: controller

    const matchedInfo: routerMatchedInfo = {
      params: {},
      method: 'ALL',
    }

    let index = 0

    function match(pattern, subPath): boolean {
      if (pattern[0] === ':') {
        if (subPath) {
          matchedInfo.params[pattern.slice(1)] = subPath

          return true
        } else {
          ctx.body = responseJsonError({
            status: 404000,
            message: `参数${pattern.slice(1)}获取为空`,
          })
        }
      } else {
        let reg = '^$'

        if (pattern[0] === '/') {
          reg = pattern.slice(1, -1)
        } else if (pattern !== '') {
          reg = `^${pattern}$`
        }

        const patternRegexp = RegExp(reg)

        return patternRegexp.test(subPath)
      }
    }

    async function select(routes: route[]) {
      const subPath =  paths[index] || ''

      for (const route of routes) {

        if (!route.method.includes(method)) {
          ctx.body = responseJsonError({
            status: 40500,
          })
          continue
        }

        if (!match(route.pattern, subPath)) {
          continue
        }

        if (++index >= paths.length && route.controller) {
          callback = route.controller

          return true
        }

        if (route.childFactory) {
          const childRoutes = await route.childFactory()

          return select(childRoutes)
        }
      }
    }

    const matched = await select(routes)

    if (matched) {
      if (!callback) { throw Error('route 没有相应的 controller') }

      ctx.body = await Promise.resolve(callback(ctx, {
        ...matchedInfo,
        ...urlObj,
      }))
    } else if (!ctx.body) {
      ctx.body = responseJsonError({
        status: 404000,
        message: '资源不存在',
      })
    }

    await next()
  }
}
