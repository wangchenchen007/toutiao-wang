import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import Component from './components/index' // 自定义全局组件
import './assets/style/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(Component)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
