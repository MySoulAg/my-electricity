import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './login/index.js'//登录
import Home from './home/index.js'//主页

Vue.use(VueRouter)

const routes = [
    ...Login,
    ...Home
]

const router = new VueRouter({
  routes
})

export default router
