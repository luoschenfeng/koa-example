import {
  URL, 
} from 'url'
import * as Koa from 'koa'
import type = require('@/types')


export type methodUnion = 'ACL' | 'BIND' | 'CHECKOUT' | 'CONNECT' | 'COPY' | 'DELETE' |
  'GET' | 'HEAD' | 'LINK' | 'LOCK' | 'M-SEARCH' | 'MERGE' |
  'MKACTIVITY' | 'MKCALENDAR' | 'MKCOL' | 'MOVE' | 'NOTIFY' | 'OPTIONS' |
  'PATCH' | 'POST' | 'PROPFIND' | 'PROPPATCH' | 'PURGE' | 'PUT' |
  'REBIND' | 'REPORT' | 'SEARCH' | 'SOURCE' | 'SUBSCRIBE' | 'TRACE' |
  'UNBIND' | 'UNLINK' | 'UNLOCK' | 'UNSUBSCRIBE'

export type method =  methodUnion | 'ALL' | Array<methodUnion | 'ALL'>


export type childFactory = () => Promise<route[]>

export interface route {
  method: method
  pattern: string
  controller?: controller,
  childFactory?: childFactory,
  meta?: type.likeObject
}
export type routerMatchedInfo = matchInfo<URL>
export interface controller {
  (ctx: Koa.Context, matchedInfo: routerMatchedInfo): any
}

interface routerMatched {
  method: string
  matched?: type.likeObject[]
  params?: type.likeObject
}

type matchInfo<Type> = {
  [Property in keyof Type]?: Type[Property]
} & routerMatched
