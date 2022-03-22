import type { controller } from '@/middlewares/routerMiddleware/Router.interface'
export const  userList: controller = (ctx) => {
  return {
    status: 200000,
    data: {
      total: 2,
      page: 1,
      totalPage: 1,
      count: 10,
      list: [
        {name: 'yaohan', age: 18},
        {name: 'maoten', age: 23},
      ]
    }
  }
}

export const user: controller = (ctx, matchInfo) => {
  return {
    status: 200000,
    data: {
      id: matchInfo.params?.id
    }
  }
}