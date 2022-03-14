import * as Koa from "koa"
import routerMiddleware from './middlewares/routerMiddleware'

const app = new Koa()

app.use(routerMiddleware);

app.listen('8000', function () {
  console.log('listen localhost:8000')
})
