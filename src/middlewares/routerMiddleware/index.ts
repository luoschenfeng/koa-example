import * as Koa from 'koa'
import types = require('@/types')
import {
  responseJsonError,
} from '@/core/response'
import type {
  route, controller,
} from '@/core/Router'
import type {
  methodUnion,
} from '@/core/Router.interface'
import routes from '@/routes'

declare module 'koa' {
  interface Request {
    params: types.likeObject
}
}

interface matchedResult {
  metched: boolean
  result: string | types.likeObject | null
}

/***
 * koa router middleware
 * @param ctx {Koa.Context}
 * @param next {Koa.Next}
 * @public
 */
export default async function (ctx:Koa.Context, next:Koa.Next) {

  const pathList = deleteSpliter(ctx.request.path).split('/')

  const method = ctx.request.method as methodUnion

  let params: types.likeObject = {}

  let callback: controller

  let start = 0

  async function select(routes: route[]) {

    for (const route of routes) {

      const spliterCount = deleteSpliter(route.pattern).split('/').length

      const subPathList = pathList.slice(start, spliterCount + 1)

      const subPath = subPathList.join('/')


      const matchedResult = match(deleteSpliter(route.pattern), subPath)

      if (!matchedResult.metched) {
        if (matchedResult.result) {
          ctx.body = responseJsonError({
            code: '400000',
            message: matchedResult.result as string,
          })
          break
        }
        continue
      }
      if (!(route.method == 'ALL' || route.method.includes(method))) {
        ctx.body = responseJsonError({
          code: '405000',
        })
        break
      }

      // has a param
      matchedResult.result && (params = Object.assign(params, matchedResult.result))
      start += subPathList.length

      if (start >= pathList.length && route.controller) {
        callback = route.controller

        return true
      }

      if (route.children) {
        return select(route.children)
      }
    }
  }

  const matched = await select(routes)

  if (matched) {
    if (!callback) { throw Error('route 没有相应的 controller') }
    ctx.request.params = params
    ctx.body = await Promise.resolve(callback(ctx))
  } else if (!ctx.body) {
    ctx.body = responseJsonError({
      code: '404000',
      message: '资源不存在',
    })
  }

  await next()
}


const modeList = {
  number(val) {
    return !isNaN(val)
  },
}

function match(patterns:string, paths:string): matchedResult  {
  const matchedResult: matchedResult = {
    metched: false,
    result: null,
  }

  const patternList = patterns.split('/')

  const pathList = paths.split('/')

  for (let index = 0; index < patternList.length; index++) {
    const pattern = patternList[index]

    const path = pathList[index]

    if (pattern[0] !== ':') {
      // regexp
      if (pattern[0] === '^') {
        if (!new RegExp(pattern).test(path)) {
          index--
          break
        }
      } else if (pattern !== path) {
        // not is a params
        break }
    } else {
      const regMetched = /^:(?:<(?<matchedMode>[^>]+)>\s*)?(?<matchedPattern>.*)$/.exec(pattern)

      if (regMetched) {
        const {
          matchedMode, matchedPattern,
        } = regMetched.groups

        if (matchedMode) {
          if (modeList[matchedMode] && modeList[matchedMode](path)) {
            if (!matchedResult.result) { matchedResult.result = {} }
            matchedResult.result[matchedPattern] = path
          } else {
            matchedResult.result = `expect params "${matchedPattern}" is a  ${matchedMode} but get a string`
            index--
            break
          }
        } else if (matchedResult.result[matchedPattern] === path) {
          matchedResult.result[matchedPattern] = path
        } else {
          index--
          break
        }
      } else {
        matchedResult.result = `pattern format error`
        index--
        break
      }
    }
    if (index === patternList.length - 1) {
      matchedResult.metched = true
    }
  }

  return matchedResult
}

function deleteSpliter(str: string):string {
  return /^\/?(.*)\/?$/.exec(str)[1]
}
