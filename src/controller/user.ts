import type {
  controller,
} from '@/core/Router'
import {
  responseJsonList, responseJsonError, responseJsonDetail,
} from '@/core/response'
import {
  User,
} from '@/model/User'

/**
 * 用户列表
 * @returns {Promise<responseList<User>>}
 */
export const  userList: controller = async () => {
  const user = new User()

  const userList = await user.fields([
    'username',
    'MAX(id)',
  ]).where('sex', 1).groupBy('username').orderBy('username').limit(10).find()

  return responseJsonList({
    total: 2,
    page: 1,
    list: userList,
  })
}

export const user: controller = (ctx) => {
  return {
    data: {
      id: ctx.request.params.id,
    },
  }
}

export const addUser: controller = async () => {
  const user = new User()

  try {
    await user.insert({
      id: 65539,
      sex: 2,
      sex_desc: '女',
      username: 'goul',
      password: 'bhdgghethetye5t635',
      mail: 'ranko@gmail.com',
    })
  } catch (err) {
    return responseJsonError({
      code: '500000',
      message: err.message,
    })
  }
  return responseJsonDetail({
    data: '',
  })
}

export const updateUser: controller = async () => {
  const user = new User()

  try {
    await user.where('id', 65539).update({
      sex: 1,
      sex_desc: '男',
    })
  } catch (err) {
    return responseJsonError({
      code: '500000',
      message: err.message,
    })
  }
  return responseJsonDetail({
    data: '',
  })
}
