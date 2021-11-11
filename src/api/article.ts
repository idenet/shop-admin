import request from '@/utils/request'

/**
 * 获取文章分类列表
 * @param params 
 * @returns 
 */
export const getCategoryList = (params?: cateParams) => {
  return request<
  {
    count: number,
    list: cateList[]
  }>({
    method: 'GET',
    url: '/cms/category',
    params,
  })
}