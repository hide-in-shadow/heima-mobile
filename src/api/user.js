import request from '@/utils/request.js'

// 用户登录
export const login = (message) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: message
  })
}

// 发送验证码
export const sendCode = (message) => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${message}`
  })
}

// 获取用户信息
export const getUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取新闻导航列表
export const getNewsNav = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
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
