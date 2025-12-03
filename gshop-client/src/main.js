
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import './mock/mockServer'  // 加载mockServer即可

import loading from './common/imgs/loading.gif'
import './filters'

// 内部自定义一个指令v-lazy，图片懒加载
Vue.use(VueLazyload, {
  loading
})

// 注册全局组件标签
Vue.component(Button.name, Button) // <mt-button>
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用上vue-router
  store // 使用上vuex
})