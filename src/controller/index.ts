import type {
  controller,
} from '@/core/Router'
import {
  WECHAT_TONKEN,
} from '@/const'
import {
  createHash,
} from 'crypto'
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
  console.log(ctx.body)
  return ctx.body
}



export function home() {
  return {
    data: 11,
  }
}
