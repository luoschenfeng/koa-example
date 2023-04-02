import {
  parse,
} from 'parse5'

export function objectToXml(object) {
  let xml = ''

  Object.keys(object).forEach((key) => {
    const {
      type, value,
    } = object[key]

    const tagName = key

    xml += `<${tagName}>${type === 'text' ? value : `<!${value}>`}</${tagName}>`
  })
  return `<xml>${xml}</xml>`
}
export function xmlToObject(xml: string) {
  const object = {}

  const document = parse(xml.slice(5, -6))

  const body = (document.childNodes
    ?.[0] as any)
    ?.childNodes
    ?.find(({
      nodeName,
    }) => nodeName === 'body')
    ?.childNodes
    || []

  body.reduce((object, node) => {
    if (!node.tagName) { return object }
    if (node.childNodes.length > 1) {
      object[node.tagName] = ''
    } else {
      const childNode = node.childNodes[0] || {}

      object[node.tagName] = {}
      if (childNode.nodeName === '#comment') {
        object[node.tagName].value = childNode.data
        object[node.tagName].type = 'comment'
      } else if (childNode.nodeName === '#text') {
        object[node.tagName].value = childNode.value
        object[node.tagName].type = 'text'
      } else {
        object[node.tagName] = ''
      }
    }
    return object
  }, object)

  return object
}




// 标签

// 标签名 name

// 子标签 chlidren

// mate

// 自闭和
