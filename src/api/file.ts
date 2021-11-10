import request from '@/utils/request'
import { FileItem, FileParams } from './types/file'

/**
 * 获取图片列表
 * @param params 
 * @returns 
 */
export const getFileList = (params?: FileParams) => {
  return request<
  {
    count: number,
    list: FileItem[]
  }>({
    method: 'GET',
    url: '/file/file',
    params,
  })
}

/**
 * 更新文件名字
 * @param id 
 * @param real_name 
 * @returns 
 */
export const updateFileName = (id: number,real_name:string) => {
  return request({
    method: 'put',
    url:`/file/file/update/${id}`,
    data: {
      real_name,
    },
  })
}

/**
 * 删除文件
 * @param ids 
 * @returns 
 */
export const fileDelete = (ids: string) => {
  return request({
    method: 'POST',
    url: '/file/file/delete',
    data: {
      ids:ids,
    },
  })
}

/**
 * 图片上传
 * @param file 
 * @returns 
 */
export const fileUpload = (file: File) => {
  let formData = new FormData()
  formData.append('pid', '0')
  formData.append('file', file)
  return request({
    method: 'POST',
    url: '/file/upload',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:formData,
  })
}