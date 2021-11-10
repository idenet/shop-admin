import request from '@/utils/request'

/**
 * 获取规格数据
 * @param params 
 * @returns 
 */
export const getRuleList = (params?: ruleParams) => {
  return request<
  {
    count: number,
    list: ruleList[]
  }>({
    method: 'GET',
    url: '/product/product/rule',
    params,
  })
}
