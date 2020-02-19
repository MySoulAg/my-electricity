import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/icon/iconfont.css' //字体图标
import './assets/js/elementUI.js' //element-ui的按需导入

import ZkTable from 'vue-table-with-tree-grid'

Vue.use(ZkTable)


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