import request from '@/utils/request'
import { IListParams, Role} from './types/role'

export const getRoles = (params: IListParams) => {
  return request<{
    count: number
    list: Role[]
  }>({
    method: 'GET',
    url: '/setting/role',
    params,
  })
}

export const deleteRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/setting/role/${id}`,
  })
}

export const updateRoleStatus = (id: number, status: 0 | 1) => {
  return request({
    method: 'PUT',
    url: `/setting/role/set_status/${id}/${status}`,
  })
}
