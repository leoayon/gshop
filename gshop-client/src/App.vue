<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    mounted () {
      // 异步获取address 可以直接dispatch分发一个action，也可以先映射action，在调用action
      // this.$store.dispatch('getAddress')
      this.getAddress()
      this.getUserInfo()
    },
    methods: {
      ...mapActions(['getAddress', 'getUserInfo'])
    },
    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background-color #f5f5f5
</style>