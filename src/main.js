import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'base/style/reset.css'
import fastclick from 'fastclick'


fastclick.attach(document.body)
Vue.config.productionTip = false

import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require('common/loading/loading.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  //给绑定节点渲染一个组件
  render: h => h(App)
})
