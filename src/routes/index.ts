import  Router, {
  defineAsyncRoutes, 
} from '@/middlewares/routerMiddleware/Router'
import  {
  route, 
} from '@/middlewares/routerMiddleware/Router.interface'
import {
  home, 
} from '@/controller/index'
import {
  resolve, 
} from 'path'

const routes: route[] = [
  Router.get('/^$/', home),
  Router.get('user', defineAsyncRoutes(resolve(__dirname, './user'))),
]

export default routes


