import Router, {
  route,
} from '@/core/Router'
import {
  menus,
} from '@/controller/menu'
const routes: route[] = [ Router.get('', menus) ]

export default routes


