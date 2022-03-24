import 'module-alias/register'
// import setting from '@/setting'
import {
  resolve, 
} from 'path'

import * as Koa from 'koa'
import routerMiddleware from '@/middlewares/routerMiddleware'

const app = new Koa()

// app.use(async (ctx: Koa.Context, next: Koa.Next) => {
//   ctx.app.setting = setting
//   next()
// })

app.use(routerMiddleware({
  root: resolve(__dirname, './routes'),
}));

app.listen('8004', function () {
  console.log('listen localhost:8004')
})
