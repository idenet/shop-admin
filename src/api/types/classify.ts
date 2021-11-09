export interface CategoryList {
  id:	number
  pid:	number
  cate_name:	string
  sort:	number
  pic	:string
  is_show:	number
  add_time:	string
  big_pic: string
  children?: CategoryList[]
}

export interface CateGoryParams {
  page?: number
  limit?: number
  is_show?: 0 | 1 | ''
  pid?: number | string,
  cate_name?:string
}