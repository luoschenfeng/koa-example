import type {
  controller,
} from '@/core/Router'
import {
  responseJsonList,
} from '@/core/response'

/**
 * routes
 * @returns {Promise<responseList<User>>}
 */
export const  menus: controller = async () => {

  return responseJsonList({
    total: 2,
    page: 1,
    list: [
      {
        name: 'OrderList',
        path: '/orderList',
        component: '@/views/OrderList.vue',
      },
    ],
  })
}
