import  Route from '../middlewares/routerMiddleware/Router'
import  route from '../middlewares/routerMiddleware/Router'
import { home } from '../controller/index'
const routes: route[] = [
  Route.instance({pattern: '', controller: home})

]

export default routes


