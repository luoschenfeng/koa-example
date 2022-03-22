import  Route from '@/middlewares/routerMiddleware/Router'
import  route from '@/middlewares/routerMiddleware/Router'
import { userList, user } from '@/controller/User'
const routes: route[] = [
  Route.get('', userList),
  Route.get(':id', user)
]

export default routes


