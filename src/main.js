/* 
入口js
*/
import Vue from 'vue'
import 'swiper/css/swiper.min.css' // 如果需要查找包下的非主模块, 需要指定后面的路径
// import App from './App.vue'
import App from '@/App'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import './mock/mockServer'
import { Pagination } from 'swiper/js/swiper.esm'


Vue.config.productionTip = false // 去掉不是生产环境的提示

//注册全局组件
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination',Pagination)

// 给Vue原型对象指定事件总线对象(vm对象)
// Vue.prototype.$bus = new Vue()

new Vue({

  beforeCreate() {
    // 给Vue原型对象指定事件总线对象(当前vm对象)
    Vue.prototype.$bus = this
  },

  // el: '#app'
  render: h => h(App), // 将App组件的对象界面渲染到页面上
  router, // 配置路由器  所有组件对象都可以通过$router属性得到router对象
  store,//配置vuex的store  所有组件对象都可以通过$store属性得到srore对象
}).$mount('#app')

// var a = 3