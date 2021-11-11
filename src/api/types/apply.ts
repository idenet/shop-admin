interface replyParams {
  page: number,
  limit:number,
  account?: string,
  is_reply?: 0 | 1 | '',
  store_name?:string
  data?: string,
  product_id?:string
}

interface replyList {
  product_id:number
  account:string
  image:string
  store_name:string
  comment:string
  pics:string
  add_time:number
  merchant_reply_content:string
  score:string
  create_time:string
  time:string
}
interface Iimage {
  image: string
  product_id: number
}

interface replyPostData {
  nickname:string
  avatar:string
  comment: string
  image: Iimage
  pics:string[]
  product_score:number
  service_score:number
  add_time?:string
}