import axios from 'axios'

import router from '../premission'
import jsonBigInt from 'json-bigint'
import {
  Message
} from 'element-ui'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.defaults.transformResponse = [function (data) {
  return data ? jsonBigInt.parse(data) : {}
}]

// 请求拦截器
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function () {})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // debugger
  return response.data ? response.data : {}
},
// 异常处理
function (error) {
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户，无权限登录'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      window.localStorage.clear()
      router.push('/login')
      break
    case 404:
      message = '手机号不正确'
      break
    case 204:
      message = '删除成功，没有message消息体数据'
      break
    default:
      message = '未知错误'
      break
  }
  Message({
    type: 'warning',
    message
  })
  return new Promise(function () {})
})

export default axios
