import  Route from '@/middlewares/routerMiddleware/Router'
import  route from '@/middlewares/routerMiddleware/Router'
import { userList, user, addUser, updateUser } from '@/controller/User'
const routes: route[] = [
  Route.get('', userList),
  Route.get('add', addUser),
  Route.get('update', updateUser),
  Route.get(':id', user),
]

export default routes


