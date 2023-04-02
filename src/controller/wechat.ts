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
  xmlToObject, objectToXml, createCompletion,
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

export const returnMassage: controller = async (ctx) => {
  const reqMessageInfo = xmlToObject(ctx.request.body as string) as any

  let Content = {
    value: /\[CDATA\[(.*)?\]\]/.exec(reqMessageInfo.content.value)[1],
    type: '',
  }

  if (Content.value) {
    const [ choice ] = await createCompletion(Content.value)

    if (choice) {
      Content = {
        value: `[CDATA[${choice.text.replace(/^\s/, '')}]]`,
        type: 'comment',
      }
    }
  } else {
    Content = reqMessageInfo.content
  }

  const massageInfo = {
    ToUserName: reqMessageInfo.fromusername,
    FromUserName: reqMessageInfo.tousername,
    CreateTime: {
      type: 'text',
      value: (+new Date().setMilliseconds(0) / 1000).toFixed(),
    },
    MsgType: reqMessageInfo.msgtype,
    Content,
  }


  return objectToXml(massageInfo)
}



export function home() {
  return {
    data: 11,
  }
}
