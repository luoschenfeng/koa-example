import Router, {
  route,
} from '@/core/Router'
import weChat from './weChat'
import user from './user'
import menu from './menu'

const routes: route[] = [
  new Router({
    pattern: '/^$/',
    children: weChat,
  }),
  Router.get('api/user', user),
  new Router({
    pattern: 'api/routes',
    children: menu,
  }),
]

export default routes


