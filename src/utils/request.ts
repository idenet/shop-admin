import router from '@/router/'
import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from './../store/index'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置用户身份
  const user = store.state.user
  if (user && user.token) {
    // not null的断言操作符，不执行运行时检查
    config.headers!.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 控制登录过期的锁
let isRefreshing = false
// 响应拦截器
request.interceptors.response.use(function (response) {
  const status = response.data.status
  // 正确的情况
  if (!status || status === 200) {
    return response
  }
  // 错误的情况 token 无效
  if (status === 410000) {
    if (isRefreshing) return Promise.reject(response)
    isRefreshing = true
    ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面，或确认重新登录', '登录过期', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    }).then(() => {
      // 清除过期的登录状态
      store.commit('setUser', null)
      // 跳转到登录页面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath,
        },
      })
    }).finally(() => {
      isRefreshing = false
    })
    // 抛出异常
    return Promise.reject(response)
  }
  // 其他错误
  ElMessage.error(response.data.msg || '请求失败，请稍后重试')
  return Promise.reject(response.data)
  // 统一处理接口响应错误，比如 token 失效，服务端异常
  // if (response.data.status && response.data.status !== 200) {
  //   ElMessage.error(response.data.msg || '请求失败，请稍后重试')
  //   // 手动返回一个promise异常
  //   return Promise.reject(response.data)
  // }
  // return response
}, function (error) {
  return Promise.reject(error)
})

export default <T=any>(config:AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
