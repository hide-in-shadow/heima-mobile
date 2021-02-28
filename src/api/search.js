import request from '@/utils/request.js'

// 获取 搜索联想
export const getSearchSuggestion = (data) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q: data
    }
  })
}

// 获取 搜索结果
export const getSearch = (data) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params: data
  })
}

// 获取 历史搜索列表
export const getHistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}

// 删除 所有 历史搜索列表
export const deletHistory = () => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}
