<template>
  <div>
    <transition name="leftMove">
      <div class="food" v-show="showFlag" ref="food">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="ele-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}</span> 
            </div>
            <div class="price">
              <span class="new"><span class="moneyIcon">￥</span>{{food.price}}</span>
              <s class="old" v-show="food.oldPrice"><span class="moneyIcon">￥</span>{{food.oldPrice}}</s>
            </div>
            <div class="cartcontral-wrapper">
              <cartcontral :food="food"></cartcontral>
            </div>
            <transition name="fade">
              <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
            </transition>
            </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontral from '../cartcontrol/cartcontrol'
import Vue from 'vue'
export default {
  data () {
    return {
      showFlag: false
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (event) {
      if (!event._constructed) {
        return
      }
      Vue.set(this.food, 'count', 1)
      this.$root.eventHub.$emit('cart.add', event.target)
    }
  },
  components: {
    cartcontral
  }
}
</script>

<style lang="stylus" scoped>
  .food
    position fixed
    top 0
    left 0
    bottom 0.96rem
    z-index 30
    width 100%
    background #ffffff
    transition all 0.25s linear
    &.leftMove-enter,&.leftMove-leave-active
      transform translate3d(100%, 0, 0)
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img 
        width 100%
        height 100%
        position absolute
        top 0
        left 0
      .back
        position absolute
        top 0.2rem
        left 0
        font-size 0
        .ele-arrow_lift
          color white
          font-size 20px
          display inline-block
          padding 0.2rem
    .content
      position relative
      font-size 0
      padding 0.36rem
      .title
        line-height 14px
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
      .detail
        font-size 10px
        line-height 10px
        color rgb(147,153,159)
        margin 0.16rem 0 0.36rem
        .sell-count
          margin-right 0.15rem
      .price
        font-size 0
        font-weight 700
        line-height 24px
        color rgb(240,20,20)
        .new
          font-size 14px
          margin-right 0.15rem
          .moneyIcon
            font-size 10px
            font-weight normal
        .old
          font-size 10px
          font-weight 700
          color rgb(147,153,159)
          .moneyIcon
            font-weight normal
      .cartcontral-wrapper
        position absolute
        bottom 0.24rem
        right 0.24rem
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        opacity: 1
        transition all 0.2s
        &.fade-enter,&.fade-leave-active
          opacity 0
          z-index -1
</style>
