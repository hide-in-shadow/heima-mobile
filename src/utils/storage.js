// 获取 本地存储
export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (err) {
    return localStorage.getItem(key)
  }
}

// 设置 本地存储
export const setItem = (key, value) => {
  if (typeof value === 'object') value = JSON.stringify(value)
  localStorage.setItem(key, value)
}

// 移除 本地存储
export const removeItem = (key) => {
  localStorage.removeItem(key)
}
