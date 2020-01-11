// 路由管理
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
    // component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'tab-bar',
    component: () => import('@/views/tabbar'),
    children: [
      {
        path: 'home', // 默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }

]
const router = new VueRouter({
  routes
})

export default router
