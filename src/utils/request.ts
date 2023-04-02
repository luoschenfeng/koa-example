import axios from 'axios'
// import {
//   likeObject,
// } from '@/types'

// 创建实例时设置配置的默认值
const instance = axios.create({
  baseURL: process.env.VUE_APP_MOCK_URL,
  timeout: 5000,
});


instance.interceptors.request.use(function (config) {

  // Do something before request is sent
  return config
}, function (error) {

  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  return Promise.resolve(response)
}, function (err) {

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(err)
})

/**
 * @description 请求封装
 * @param {object} config
 * @param {string} config.url
 * @param {string} config.method
 * @param {object} [config.params]
 *
 */
export default function request({
  url, method = 'get', params = {},  config,
}) {
  config = {
    ...config,
    url: url,
    method: method,
  }

  if (method === 'get') {
    config.params = params
  }
  if (method === 'post') {
    config.data = params
  }

  return instance(config)

}


export function openApiRequest(url, method = 'get', params = {},) {
  const config = {
    headers: {
      Authorization: 'Bearer $OPENAI_API_KEY',
      'OpenAI-Organization': 'org-3ts5BhKnq4W4fAeN8EhJiNj3',
    },
    base: 'api.openai.com/v1/',
  }

  return request({
    url,
    method,
    params,
    config,
  })
}


