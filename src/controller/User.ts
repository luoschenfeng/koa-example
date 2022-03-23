import type { controller } from '@/middlewares/routerMiddleware/Router.interface'
import { User } from '@/model/User'
export const  userList: controller = async  (ctx) => {
  const user = new User()
  const userList = user.where('sex', 1).orderBy('username').limit(10).select()
  return userList
}

export const user: controller = (ctx, matchInfo) => {
  return {
    status: 200000,
    data: {
      id: matchInfo.params?.id
    }
  }
}