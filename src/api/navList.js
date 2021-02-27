import request from '@/utils/request.js'

// 获取用户的新闻导航列表
export const getUserNewsNav = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}

// 获取文章列表
export const getArticleList = (params) => {
  return request({
    method: 'get',
    url: '/app/v1_1//articles',
    params
  })
}

// 获取全部的新闻导航列表
export const getNewsNav = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}

// 删除 指定 导航列表项
export const removeNavItem = (id) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/channels/${id}`
  })
}

// 添加导航列表项
export const addNavItem = (id, num) => {
  return request({
    method: 'patch',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [{ id: id, seq: num }]
    }
  })
}
