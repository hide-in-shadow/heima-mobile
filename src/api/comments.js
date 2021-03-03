import request from '@/utils/request.js'

// 获取文章的评论列表
export function getComments(params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 对评论或评论回复点赞
export function addCommentLike(commentId) {
  return request({
    method: 'post',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

// 取消对评论或评论回复点赞
export function deleteCommentLike(commentId) {
  return request({
    method: 'delete',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}

// 添加评论或评论回复
export function addComment(data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
