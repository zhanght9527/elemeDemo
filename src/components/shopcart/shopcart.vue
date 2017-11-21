<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highLight':totalCount > 0}">
            <span class="ele-shopping_cart" :class="{'highLight':totalCount > 0}"></span>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highLight':totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default () {
        return [{
          count: 2,
          price: 10
        }]
      }
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
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
      color rgba(255,255,255,0.4)
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
            &.highLight
              background rgb(0,160,220)
            .ele-shopping_cart
              line-height 0.88rem
              font-size 24px
              color #80858a
              &.highLight
                color white
          .num
            position absolute
            top 0
            right 0
            width 0.48rem
            height 0.32rem
            line-height 0.32rem
            text-align center
            border-radius 0.32rem
            font-size 9px
            font-weight 700
            color white
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.2)
            background rgb(240,20,20)
        .price
          display inline-block
          vertical-align top
          margin-top 0.24rem
          line-height 24px
          padding-right 0.24rem
          box-sizing border-box
          border-right 1px solid rgba(255,255,255,0.1)
          font-size 16px
          font-weight 700      
          &.highLight
            color #ffffff 
        .desc
          display inline-block
          vertical-align top
          line-height 24px
          margin 0.24rem 0 0 0.24rem
          font-size 10px
      .content-right
        flex 0 0 2.1rem
        width 2.1rem
        .pay
          height 0.96rem
          line-height 0.96rem
          text-align center
          font-size 12px
          font-weight 700
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #ffffff
</style>
