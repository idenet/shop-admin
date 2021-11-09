import request from '@/utils/request'
import { CategoryList, CateGoryParams } from './types/classify'

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