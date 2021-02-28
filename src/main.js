import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './styles/index.less'

// 引入 lib-flexible 动态设置 REM 基准值(html 标签的字体大小)
import 'amfe-flexible'

// 全局引入处理时间插件
import './utils/dayjs.js'

// 引入 vant 框架
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
