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

// 获取指定用户 信息资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

// 编辑更新 用户的 信息
export const updateUser = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

// 编辑用户头像
export const updateUserImg = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
