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
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect @select="selectRating" @toggle="toggleContent" :select-type='selectType' :only-content='onlyContent' :desc='desc' :ratings='food.ratings'></ratingselect>
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li class="rating-item" v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings">
                  <div class="top-wrapper">
                    <div class="time">{{rating.rateTime | formatDate}}</div>
                    <div class="user">
                      <span class="name">{{rating.username}}</span>
                      <img class="avatar" :src="rating.avatar">
                    </div>
                  </div>
                  <p class="text">
                    <span :class="{'ele-thumb_up':rating.rateType===0,'ele-thumb_down':rating.rateType===1}"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontral from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import Vue from 'vue'
import {formatDate} from 'common/js/date'

const ALL = 2

export default {
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
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
      this.selectType = ALL
      this.onlyContent = false
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
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    selectRating (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd  hh:mm')
    }
  },
  components: {
    cartcontral,
    split,
    ratingselect
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
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
    .info
      padding 0.36rem
      font-size 0
      .title
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
      .text
        padding 0.12rem 0.16rem 0
        font-size 12px
        color rgb(77,85,93)
        line-height 24px
        text-align justify
    .rating
      padding-top 0.36rem
      font-size 0
      .title
        line-height .28rem
        margin-left 0.36rem
        font-size 14px
        color rgb(7,17,27)
      .rating-wrapper
        padding 0 0.36rem
        .rating-item
          border-1px(rgba(7,17,27,0.1))
          padding 0.32rem 0
          .top-wrapper
            display flex
            justify-content space-between
            font-size 10px
            line-height 12px
            color rgb(147,153,159)
            .user
              font-size 0
              .name
                font-size 10px
                line-height 12px
                margin-right 0.12rem
              .avatar
                height 12px
                vertical-align top
                border-radius 50%
          .text
            margin-top 0.12rem
            font-size 12px
            line-height 16px
            span 
              display inline-block
              line-height 16px
              &.ele-thumb_up
                color rgb(0,160,220)
                vertical-align middle
              &.ele-thumb_down
                color rgb(147,153,159)
                vertical-align middle
</style>
