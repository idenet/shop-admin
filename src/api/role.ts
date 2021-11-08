import request from '@/utils/request'
import { EditRole, IListParams, Menu, Role, RolePostData} from './types/role'

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


export const getMenus = () => {
  return request<{
    menus: Menu[]
  }>({
    method: 'GET',
    url: '/setting/role/create',
  })
}

export const saveRole = (id: number, data: RolePostData) => {
  return request({
    method: 'POST',
    url: `/setting/role/${id}`,
    data,
  })
}


export const getRole = (id: number) => {
  return request<{
    role: EditRole
    menus: Menu[]
  }>({
    method: 'GET',
    url: `/setting/role/${id}/edit`,
  })
}