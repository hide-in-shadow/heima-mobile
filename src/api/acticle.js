import request from '@/utils/request.js'

// 获取指定文章数据
export const getActicleById = (id) => {
  return request({
    method: 'get',
    url: `/app/v1_0/articles/${id}`
  })
}

// 关注用户
export const addFollow = (userId) => {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注用户
export const deleteFollow = (userId) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

// 收藏文章
export const addCollect = (articleId) => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}

// 取消收藏文章
export const deleteCollect = (articleId) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}

// 文章点赞
export const addLike = (articleId) => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

// 取消文章点赞
export const deleteLike = (articleId) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
