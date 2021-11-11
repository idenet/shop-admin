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


/**
 * 保存或者编辑商品规格
 * @param id 
 * @param data 
 * @returns 
 */
export const setAttrRule = (id:number, data:IFormData) => {
  return request({
    method: 'post',
    url: `/product/product/rule/${id}`,
    data,
  })
}

/**
 * 获取编辑数据
 * @param id 
 * @returns 
 */
export const getAttrRule = (id:number) => {
  return request({
    method: 'get',
    url: `/product/product/rule/${id}`,
  })
}


/**
 * 单个删除或者多个删除
 * @param id 
 * @returns 
 */
export const deleteRule = (ids: string) => {
  return request({
    method: 'delete',
    url: `/product/product/rule/delete`,
    data: {
      ids: ids,
    },
  })
}
