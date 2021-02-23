module.exports = {
  devServer: {
    // 自动打开浏览器
    open: true,
    host: '127.0.0.1',
    port: 8888,
    // 接口问题调试
    proxy: {
      '/app': {
        target: 'http://toutiao-app.itheima.net/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/app': ''
        }
      }
    }
  }
}
