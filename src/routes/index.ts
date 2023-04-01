import Router, {
  route,
} from '@/core/Router'
import {
  index,
} from '@/controller/index'
import user from './user'
import menu from './menu'

const routes: route[] = [
  Router.get('/^$/', index),
  Router.get('api/user', user),
  new Router({
    pattern: 'api/routes',
    children: menu,
  }),
]

export default routes


