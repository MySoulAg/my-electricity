import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from "echarts"
import VueQuillEditor from 'vue-quill-editor'//富文本编辑器

import 'quill/dist/quill.core.css'//富文本样式
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import 'nprogress/nprogress.css'//顶部进度条样式

import './assets/icon/iconfont.css' //字体图标
import './assets/js/elementUI.js' //element-ui的按需导入

import ZkTable from 'vue-table-with-tree-grid'

Vue.use(ZkTable)
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.prototype.$echarts = echarts;


router.beforeEach((to, from, next) => {
  if (to.path != '/login') {
    if (window.sessionStorage.getItem('token')) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')