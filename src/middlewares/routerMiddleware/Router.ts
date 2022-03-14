import { URL } from 'url'
import * as Koa from "koa"
/***
 * init a Router
 */
export default class Router {

  pattern: string
  method?: method
  childFactory?: childFactory
  path = ''
  meta = {}
  params = {}

  /**
   * @constructor
   * @param {String} pattern router match pattern
   * @param {method} method router method
   * @param {childFactory} childFactory router childs
   */
  constructor({pattern, method, childFactory, meta}: route) {
    this.pattern = pattern
    this.method = method ? method : ['ACL', 'BIND', 'CHECKOUT', 'CONNECT', 'COPY', 'DELETE',
      'GET', 'HEAD', 'LINK', 'LOCK', 'M-SEARCH', 'MERGE',
      'MKACTIVITY', 'MKCALENDAR', 'MKCOL', 'MOVE', 'NOTIFY', 'OPTIONS',
      'PATCH', 'POST', 'PROPFIND', 'PROPPATCH', 'PURGE', 'PUT',
      'REBIND', 'REPORT', 'SEARCH', 'SOURCE', 'SUBSCRIBE', 'TRACE',
      'UNBIND', 'UNLINK', 'UNLOCK', 'UNSUBSCRIBE'
    ]
    this.childFactory = childFactory
    this.meta = meta
  }

  /**
   * create a get router
   */
  static get({pattern, controller, childFactory}: route) {
    return new Router({pattern, method: 'GET', controller, childFactory})
  }

  /**
   * create a get router
   */
  static post({pattern, controller, childFactory}: route) {
    return new Router({pattern, method: 'POST', controller, childFactory})
  }

  /**
   * create a router instance
   */
  static instance({pattern, method, controller, childFactory}: route) {
    return new Router({pattern, method, controller, childFactory})
  }
}



export type method =  typeof methods[number] | Array<typeof methods[number]>

export interface route {
  pattern: string
  method?: method
  childFactory?: childFactory,
  controller?: (ctx: Koa.Context) => void,
  path?: string
  meta?: likeObject | likeObject[]
  params?: likeObject | likeObject[]
}

export interface childFactory {
  (): Promise<route[]>
}


const methods = ['ACL', 'BIND', 'CHECKOUT', 'CONNECT', 'COPY', 'DELETE',
  'GET', 'HEAD', 'LINK', 'LOCK', 'M-SEARCH', 'MERGE',
  'MKACTIVITY', 'MKCALENDAR', 'MKCOL', 'MOVE', 'NOTIFY', 'OPTIONS',
  'PATCH', 'POST', 'PROPFIND', 'PROPPATCH', 'PURGE', 'PUT',
  'REBIND', 'REPORT', 'SEARCH', 'SOURCE', 'SUBSCRIBE', 'TRACE',
  'UNBIND', 'UNLINK', 'UNLOCK', 'UNSUBSCRIBE'
] as const
type Concrete<Type> = {
  [Property in keyof Type]: Type[Property]
} & route

type likeObject = {
  [key: string]: any
}

