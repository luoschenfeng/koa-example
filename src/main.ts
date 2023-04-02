import 'module-alias/register'

import setting from '@/setting'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import routerMiddleware from '@/middlewares/routerMiddleware'

const app = new Koa()

app.use(bodyParser({
  enableTypes: [
    'json',
    'form',
    'text',
    'xml',
  ],
}));
app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.state.setting = setting
  await next()
})

app.use(routerMiddleware);

app.listen('8080', function () {
  console.log('listen localhost:8080')
})

