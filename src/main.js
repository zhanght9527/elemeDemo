// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import './common/js/font'
import './common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 新建一个vue实例，用来组件之间的传值
  data: {
    eventHub: new Vue()
  },
  template: '<App/>',
  components: { App }
})
