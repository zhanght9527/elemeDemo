<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="ele-shopping_cart"></span>
          </div>
        </div>
        <div class="price">￥4</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    }
  }
}
</script>

<style lang="stylus" scoped>
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 0.96rem
    .content
      display flex
      background #141d27
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -0.2rem
          margin 0 0.24rem
          padding 0.12rem
          width 1.12rem
          height 1.12rem
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background rgb(43,52,60)
            text-align center
            .ele-shopping_cart
              line-height 0.88rem
              font-size 24px
              color #80858a
        .price
          display inline-block
          vertical-align top
          margin-top 0.24rem
          line-height 24px
          padding-right 0.24rem
          box-sizing border-box
          border-right 1px sollid rgba(255,255,255,0.1)
          font-size 16px
          font-weight 700
          color rgba(255,255,255,0.4)
        .desc
          display inline-block
          vertical-align top
          line-height 24px
          margin 0.24rem 0 0 0.24rem
          font-size 10px
          color rgba(255,255,255,0.4)
      .content-right
        flex 0 0 2.1rem
        width 2.1rem
</style>
