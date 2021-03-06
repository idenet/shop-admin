/**
 * 公共接口封装
 */

import request from '@/utils/request'

import { ILoginInfo, ILoginResponse } from './types/common'

export const getLoginInfo = () => {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/login/info',
  })
}

export const getCaptcha = () => {
  return request<Blob>({
    method: 'GET',
    url: '/captcha_pro',
    params: {
      // 避免地址缓存
      stamp: Date.now(),
    },
    responseType: 'blob', // 请求获取图片数据
  })
}

export const login = (data: {
  account: string,
  pwd: string,
  imgcode: string
}) => {
  return request<ILoginResponse>({
    method: 'POST',
    url: '/login',
    data,
  })
}

export const logout = () => {
  return request<ILoginResponse>({
    method: 'GET',
    url: '/setting/admin/logout',
  })
}
