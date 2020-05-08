<template>
  <div>
    <Header/>
    
    <!-- 在此显示当前路由组件 -->
    <router-view></router-view>

    <!-- <Footer v-show="$route.path!=='/register' && $route.path!=='/login'"/>  -->
    <Footer v-show="!$route.meta.isHideFooter"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import {reqBaseCategoryList, reqLogin} from '@/api'

import { reqFloors } from '@/api'
export default {
  name: 'App',

  async mounted(){
    //函数接口请求函数
    //const result = await reqBaseCategoryList()
    //console.log('result',result)
    //const result2 = await reqLogin('13700000000','1111111')
    //console.log('result2','result')

    //console.log(this.$store.state)
    //测试通过异步action获取异步获取到vuex的state中
    //this.$store.dispatch('getBaseCategoryList')

    //测试针对mock接口的vuex代码
    this.$store.dispatch('getFloors')
    this.$store.dispatch('getBanners')

    //通过异步action获取数据到vuex的state中
    this.$store.dispatch('getBaseCategoryList')
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>

</style>
