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
    url: '/product/category/create',
  }).then(data => {
    const roles = data.rules.find(item => item.field === 'pid')
    if (roles && roles.options) {
      return roles.options
    }
    return []
  })
}


// 创建分类
export const createClassify = (data:PostData) => {
  return request({
    method: 'POST',
    url: '/product/category.html',
    data,
  })
}

/**
 * 修改状态
 * @param data 
 * @returns 
 */
export const setCaterogy = (id:number,is_show: number) => {
  return request({
    method: 'PUT',
    url: `/product/category/set_show/${id}/${is_show}`,
  })
}

/**
 * 获取编辑数据
 * @param id 
 * @returns 
 */
export const getEditCaterogy = (id:number) => {
  return request({
    method: 'get',
    url: `/product/category/${id}`,
  }).then(data => {
    const obj: Record<string, any> = {}
    data.rules.forEach((item: { field: string | number; value: any }) => {
      obj[item.field] = item.value
    })
    return obj as PostData
  })
}

/**
 * 编辑
 * @param id 
 * @param is_show 
 * @returns 
 */
export const eidtCategory = (id:number, data:PostData) => {
  return request({
    method: 'PUT',
    url: `/product/category/${id}`,
    data,
  })
}

/**
 * 删除
 * @param id 
 * @param data 
 * @returns 
 */
export const deleteCategory = (id:number) => {
  return request({
    method: 'delete',
    url: `/product/category/${id}`,
  })
}