interface cateParams {
  page: number,
  limit: number,
  status: 0 | 1 | ''
  title: string
}

interface cateList {
  add_time: string
  hidden: number
  id: number
  image:string
  intr: string
  is_del: number
  pid: number
  sort: number
  status: number
  title: string
}