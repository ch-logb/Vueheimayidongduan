// 整个模块系统入口
// 加载vue
// 加载vueRuoter挂载到实例
// 加载 vuex 挂载到实例
// 想要所有视图都共享的资源，那就加载到 main 中
// 加载公共样式文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import './styles/base.less'
import { Button, NavBar, Field, CellGroup, Cell, Toast } from 'vant'
Vue.use(NavBar).use(Field).use(CellGroup).use(Cell).use(Button).use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
