import {
  method,  route, children, controller,
} from './Router.interface'

/***
 * init a Router
 */
export default class Router {

  pattern: string
  method: method
  children?: children
  controller?: controller
  meta = {}

  /**
   * @constructor
   * @param {String} pattern router match pattern
   * @param {method} method router method
   * @param {controller} controller router controller
   * @param {children} children router children
   */
  constructor({
    pattern, method = 'ALL', controller, children, meta,
  }: route) {
    this.pattern = pattern
    this.method = method
    this.controller = controller
    this.children = children
    this.meta = meta
  }

  /**
   * create a POST router
   */
  static get(pattern: string, resolve: controller | children) {
    if (Array.isArray(resolve)) {
      return new Router({
        pattern,
        method: 'GET',
        children: resolve,
      })
    } else {
      return new Router({
        pattern,
        method: 'GET',
        controller: resolve,
      })
    }
  }

  /**
   * create a post router
   */
  static post(pattern: string, resolve: controller | children) {
    if (Array.isArray(resolve)) {
      return new Router({
        pattern,
        method: 'POST',
        children: resolve,
      })
    } else {
      return new Router({
        pattern,
        method: 'POST',
        controller: resolve,
      })
    }
  }

  /**
   * create a router instance
   */
  static instance(pattern, method, resolve: controller | children) {
    if (Array.isArray(resolve)) {
      return new Router({
        pattern,
        method,
        children: resolve,
      })
    } else {
      return new Router({
        pattern,
        method,
        controller: resolve,
      })
    }
  }
}


export {
  method,  route, children, controller,
} from './Router.interface'
