import type = require('@/types')

export function responseJsonList<Model>(listInfo: {
  total: number
  page: number
  list: Model[],
}): responseList<Model> {
  return {
    data: {
      total: listInfo.total,
      page: listInfo.page,
      data: {
        list: listInfo.list
      }
    },
    status: 0
  }
}

export function responseJsonDetail<Model>(detailInfo: {
  data: Model,
}): responseDetali<Model> {
  return  {
    data: {
      data: detailInfo.data
    },
    status: 0
  }
}

export function responseJsonError(errorInfo: {
  status: number
  message?: string
  title?: string
}): responseError {
  return {
    status: errorInfo.status,
    data: {
      message: errorInfo.message || errorCodes[errorInfo.status],
      title: errorInfo.title,
    }
  }
}


export interface responseList<Model> {
  data: {
    total: number
    page: number
    data: {
      list: Model[]
    }
  },
  status: number
}

export interface responseDetali<Model> {
  data: {
    data: Model
  },
  status: number
}

export interface responseError {
  data: {
    message: string,
    title?: string
  },
  status: number
}

const errorCodes = {
  405000: '方法未实现'
}
