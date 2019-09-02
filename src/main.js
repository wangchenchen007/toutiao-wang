import Vue from 'vue'
import App from './App.vue'
import router from './premission'
import ElementUI from 'element-ui'
import Component from './components/index' // 自定义全局组件
import './assets/style/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/axios.config'
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(Component)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
