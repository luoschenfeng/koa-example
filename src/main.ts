import 'module-alias/register'
import * as Koa from "koa"
import { resolve } from 'path'
import routerMiddleware from '@/middlewares/routerMiddleware'

const app = new Koa()

app.use(routerMiddleware({
  root: resolve(__dirname, './routes')
}));

app.listen('8003', function () {
  console.log('listen localhost:8003')
})
