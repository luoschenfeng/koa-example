import Router, {
  route,
} from '@/core/Router'
import {
  testServer, returnMassage,
} from '@/controller/wechat'
const routes: route[] = [
  Router.get('', testServer),
  Router.post('', returnMassage),
]

export default routes


