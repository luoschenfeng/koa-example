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
        list: listInfo.list,
      },
    },
    status: 0,
  }
}

export function responseJsonDetail<Model>(detailInfo: {
  data: Model,
}): responseDetali<Model> {
  return  {
    data: {
      data: detailInfo.data,
    },
    status: 0,
  }
}

export function responseJsonError(errorInfo: {
  code: string,
  message?: string
  title?: string
}): responseError {
  return {
    status: 1,
    data: {
      code: errorInfo.code,
      message: errorInfo.message || errorCodes[errorInfo.code],
      title: errorInfo.title,
    },
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
  status: 0
}

export interface responseDetali<Model> {
  data: {
    data: Model
  },
  status: 0
}

export interface responseError {
  data: {
    code: string,
    message: string,
    title?: string
  },
  status: 1
}

const errorCodes = {
  '405000': '方法未实现',
}
