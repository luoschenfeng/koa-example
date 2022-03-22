import { method,  route, childFactory, controller } from './Router.interface'

/***
 * init a Router
 */
export default class Router {

  pattern: string
  method: method
  childFactory?: childFactory
  controller?: controller
  meta = {}

  /**
   * @constructor
   * @param {String} pattern router match pattern
   * @param {method} method router method
   * @param {controller} controller router controller
   * @param {childFactory} childFactory router childs
   */
  constructor({pattern, method, controller, childFactory, meta}: route) {
    this.pattern = pattern
    this.method = method || 'ALL'
    this.controller = controller
    this.childFactory = childFactory
    this.meta = meta
  }

  /**
   * create a POST router
   */
  static get(pattern: string, factory: controller | childFactory) {
    if (factory.name === 'defineAsyncRoutes') {
      return new Router({pattern, method: 'GET', childFactory: factory as childFactory})
    } else {
      return new Router({pattern, method: 'GET', controller: factory as controller})
    }
  }

  /**
   * create a post router
   */
   static post(pattern: string, factory: controller | childFactory) {
    if (factory.name === 'defineAsyncRoutes') {
      return new Router({pattern, method: 'POST', childFactory: factory as childFactory})
    } else {
      return new Router({pattern, method: 'POST', controller: factory as controller})
    }
  }

  /**
   * create a router instance
   */
  static instance(pattern, method, factory: controller | childFactory) {
    if (factory.name === 'defineAsyncRoutes') {
      return new Router({pattern, method, childFactory: factory as childFactory})
    } else {
      return new Router({pattern, method, controller: factory as controller})
    }
  }
}

export function defineAsyncRoutes (path): () => Promise<route[]> {
  async function defineAsyncRoutes (): Promise<route[]> {
    const routesDefault: { default:  route[]} =  await import(path)
    return routesDefault.default
  }
  return defineAsyncRoutes
}


