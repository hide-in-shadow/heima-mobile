import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 处理时间 的插件
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 加载全局样式
import './styles/index.less'

// 引入 lib-flexible 动态设置 REM 基准值(html 标签的字体大小)
import 'amfe-flexible'

// 引入 vant 框架
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// 配置使用中文语言包
dayjs.locale('zh-cn')
// 全局过滤器：处理相对时间
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
