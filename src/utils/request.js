import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

// 创建了一个axios实例 可以 创建多个 配置不同的基准地址
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基准URL地址
})

/**
 * 配置处理后端返回数据中超出 js 安全整数范围问题
 */
request.defaults.transformResponse = [
  (data) => {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return {}
    }
  }
]

// 请求拦截器  设置响应头token
request.interceptors.request.use(
  (req) => {
    // 将 vuex 里的 token 提取出来当做响应头 headers
    const token = store.state.token
    // vuex 中 state里的数据 token 里的属性 token
    if (token && token.token) {
      req.headers.Authorization = `Bearer ${token.token}`
    }
    return req
  },
  (err) => {
    // 返回 一个带有原因的 promise 对象
    return Promise.reject(err)
  }
)

// 请求响应拦截器
request.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    // 如果响应码是 401 ，则请求获取新的 token
    // console.log(err)
    const token = store.state.token
    if (err.response && err.response.status === 401) {
      // 如果 vuex 里没有 token 并且 token 没有 refresh_token 属性
      if (!token || !token.refresh_token) {
        router.push('/login') // 跳转到登录页面
        return
      }
    }
    // 如果有refresh_token，则请求获取新的 token
    try {
      const { data } = await axios({
        method: 'put',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${token.refresh_token}`
        }
      })
      // 获取 新的 token 值 存入 vuex 中 仍然使用原来的 refresh_token
      store.commit('getToken', {
        token: data.data.token,
        refresh_token: token.refresh_token
      })
      // 返回 重新发送请求
      // err.config 是一个对象 包含 本次失败请求的各种信息
      return request(err.config)
    } catch (err) {
      // 获取失败返回登录页
      router.push('/login')
    }

    return Promise.reject(err)
  }
)

export default request
