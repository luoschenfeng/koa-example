import type {
  controller,
} from '@/core/Router'
import {
  WECHAT_TONKEN,
} from '@/const'
import {
  createHash,
} from 'crypto'
import {
  xmlToObject, objectToXml,
} from '@/utils'
export const testServer: controller = (ctx) => {
  const {
    signature, timestamp, nonce, echostr,
  } = ctx.request.query

  const plainArr = [
    WECHAT_TONKEN,
    timestamp,
    nonce,
  ]

  const plainText = plainArr.sort().join('')

  const ciphertext =  createHash('sha1')
    .update(plainText)
    .digest('hex')

  if (ciphertext === signature) {
    return echostr
  } else {
    return ''
  }
}

export const returnMassage: controller = (ctx) => {
  const reqMessageInfo = xmlToObject(ctx.request.body as string) as any

  const massageInfo = {
    tousername: reqMessageInfo.fromusername,
    fromusername: reqMessageInfo.tousername,
    createtime: {
      type: 'text',
      value: (+new Date().setMilliseconds(0) / 1000).toFixed(),
    },
    msgtype: reqMessageInfo.msgtype,
    content: reqMessageInfo.content,
  }

  return objectToXml(massageInfo)
}



export function home() {
  return {
    data: 11,
  }
}
