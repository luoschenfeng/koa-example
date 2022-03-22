import type = require('@/types')

export function respnseError(status: number, detail: string, res?: type.likeObject) {
  return {
    status,
    data: {
      detail,
      ...res
    }
  }
}

export default {}
