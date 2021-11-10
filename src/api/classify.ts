import request from '@/utils/request'
import { CategoryList, CateGoryParams, PostData } from './types/classify'
import { IFormData } from './types/form'

export const getCategoryList = (params?: CateGoryParams) => {
  return request<
  {
    count: number,
    list: CategoryList[]
  }>({
    method: 'GET',
    url: '/product/category',
    params,
  })
}


/**
 * 获取创建数据
 * @returns 
 */
export const getRoles = () => {
  return request<IFormData>({
    method: 'GET',
    url: '/setting/admin/create',
  }).then(data => {
    const roles = data.rules.find(item => item.field === 'pid')
    if (roles && roles.options) {
      return roles.options
    }
    return []
  })
}


export const createClassify = (data:PostData) => {
  return request({
    method: 'POST',
    url: '/product/category.html',
    data,
  })
}