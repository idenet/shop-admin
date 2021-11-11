import request from '@/utils/request'

/**
 * 获取评论列表
 * @param params 
 * @returns 
 */
export const getReplyList = (params?: replyParams) => {
  return request<
  {
    count: number,
    list: replyList[]
  }>({
    method: 'GET',
    url: '/product/reply',
    params,
  })
}

/**
 * 添加虚拟评论
 * @param params 
 * @returns 
 */
export const setReply = (data?: replyPostData) => {
  return request({
    method: 'post',
    url: '/product/reply',
    data,
  })
}