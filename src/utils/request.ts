import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置用户身份
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 统一处理接口响应错误，比如 token 失效，服务端异常
  if (response.data.status && response.data.status !== 200) {
    ElMessage.error(response.data.msg || '请求失败，请稍后重试')
    // 手动返回一个promise异常
    return Promise.reject(response.data)
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default <T=any>(config:AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
