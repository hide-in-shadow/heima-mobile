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
