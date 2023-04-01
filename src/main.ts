import 'module-alias/register'

import setting from '@/setting'

import Koa from 'koa'


import routerMiddleware from '@/middlewares/routerMiddleware'

const app = new Koa()

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.state.setting = setting
  console.log(ctx.request.query)
  await next()
})

app.use(routerMiddleware);

app.listen('8080', function () {
  console.log('listen localhost:8080')
})
