<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tabItem">商品</router-link>
      <router-link to="/ratings" class="tabItem">评论</router-link>
      <router-link to="/seller" class="tabItem">商家</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import header from './components/header/header'
const ERR_OK = 0
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = response.data
        console.log(this.seller)
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus" scoped>
  @import './common/stylus/mixin'
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tabItem
        flex: 1
        text-align: center
        font-size: 14px
        color: rgb(77,85,93)
        &.router-link-active
          color: rgb(240,20,20)
</style>

