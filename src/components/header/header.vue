<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="ele-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="ele-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width='100%' height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,$index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                <span class="text">{{seller.supports[$index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="ele-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import star from '../star/star.vue'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    },
    methods: {
      closeDetail () {
        this.detailShow = false
      },
      showDetail () {
        this.detailShow = true
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '../../common/stylus/mixin'
  .header
    position relative
    font-size 0
    color #ffffff
    background rgba(7,17,27,0.5)
    overflow hidden
    .content-wrapper
      position relative
      padding 0.48rem 0.24rem 0.36rem 0.48rem
      display flex
      .avatar 
        border-radius 0.08rem
        display inline-block
        height 1.28rem
        width 1.28rem
        overflow hidden
        img
          height 1.28rem
          width 1.28rem
      .content
        display flex
        flex-direction column
        justify-content space-between
        padding 0.04rem 0
        margin-left 0.32rem
        .title
          display flex
          align-items center
          .brand
            display inline-block
            vertical-align top
            margin-right 0.1rem
            width 0.6rem
            height 0.36rem
            bg-image('brand')
            background-size 0.6rem 0.36rem
            background-repeat no-repeat
          .name
            font-size 16px
            font-weight bold
        .description
          font-size 12px
          font-weight 300
        .support
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            font-size 10px
            font-weight 300
            line-height 12px
      .support-count
        position absolute
        right 0.24rem
        bottom 0.3rem
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background rgba(0,0,0,0.2)
        text-align center
        .count
          vertical-align top 
          font-size 10px
        i 
          margin-left 1px
          line-height 24px
          font-size 10px
    .bulletin-wrapper
      font-size 10px
      height 0.56rem
      line-height 0.56rem
      padding 0 0.44rem 0 0.24rem
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      position relative
      background rgba(7,17,27,0.2)
      .bulletin-title
        display inline-block
        width 0.44rem
        height 0.24rem
        bg-image('bulletin')
        background-size 0.44rem 0.24rem
        background-repeat no-repeat
        vertical-align top 
        margin-top 0.18rem
      .bulletin-text
        vertical-align top 
        margin 0 4px
      i 
        position absolute
        font-size 10px
        right 0.24rem
        top 0.16rem
    .background
      position absolute
      top 0 
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .fade-enter-active, .fade-leave-active
      transition: 0.3s all ease
    .fade-enter, .fade-leave-active 
      opacity: 0
      background rgba(7,17,27,0)
      -webkit-backdrop-filter blur(0)
    .detail
      position fixed
      z-index 100
      height 100%
      width 100%
      top 0
      left 0
      overflow auto
      // filter blur(10px)
      background rgba(7,17,27,0.8)
      -webkit-backdrop-filter blur(10px)
      display flex
      flex-flow column
      min-height 100vh
      transition all 0.5s
      .detail-wrapper
        flex 1
        .detail-main
          font-size 12px
          // line-height 24px
          padding-top 1.28rem
          .name
            line-height 16px
            font-size 16px
            font-weight 700
            text-align center
          .star-wrapper
            margin-top 0.36rem
            text-align center
          .title
            display flex
            width 80%
            margin 0.56rem auto 0.48rem auto
            font-size 0
            .line
              flex 1
              position relative
              top -0.12rem
              border-bottom 1px solid rgba(255,255,255,0.2)
            .text
              padding 0 0.24rem
              font-weight 700
              font-size 14px
          .supports
            width 80%
            margin 0 auto
            .support-item
              padding 0 0.24rem
              margin-bottom 0.24rem
              &:last-child
                margin-bottom 0
              .icon
                display inline-block
                width 0.32rem
                height 0.32rem
                vertical-align top
                margin-right 0.12rem
                background-size 0.32rem 0.32rem
                background-repeat no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height 16px
                font-size 12px
          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 0.24rem
              line-height 0.48rem
              font-size 12px
      .detail-close
        width 0.64rem 
        height 0.64rem
        margin 1.28rem auto
        clear both
        font-size 0.64rem
</style>