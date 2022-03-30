import Router, {
  route,
} from '@/core/Router'
import {
  userList, user, addUser, updateUser,
} from '@/controller/user'
const routes: route[] = [
  Router.get('', userList),
  Router.get('add', addUser),
  Router.get('update', updateUser),
  Router.get(':id', user),
]

export default routes


