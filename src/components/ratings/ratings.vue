<template>
  <div class="ratings" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :select-type='selectType' :only-content='onlyContent' :desc='desc' :ratings='ratings'></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28">
            </div>
            <div class="content">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <span class="rateTime">{{rating.rateTime | formatDate}}</span>
              </div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">
                {{rating.text}}
              </div>
              <div class="recommend">
                <span class="icon ele-thumb_up" v-if="rating.recommend.length"></span>
                <span class="dish" v-for="dish in rating.recommend">{{dish}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'
  import BScroll from 'better-scroll'
  import {formatDate} from 'common/js/date'

  const ALL = 2
  const ERR_OK = 0
  
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
        }
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingsWrapper, {
            click: true
          })
        })
      })
    },
    data () {
      return {
        ratings: [],
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
    methods: {
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
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd  hh:mm')
      }
    },
    components: {
      star,
      ratingselect,
      split
    }
  }
</script>

<style lang="stylus" scoped>
  .ratings
    position absolute
    top 3.48rem
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 2.74rem
        padding 4px 0 6px
        width 2.74rem
        border-right 1px solid rgba(7,17,27,0.1)
        text-align center
        .score
          font-size 24px
          color rgb(255,153,0)
          line-height 28px
          margin-bottom 6px
        .title
          line-height 12px
          font-size 12px
          color rgb(7,17,27)
          margin-bottom 8px
        .rank
          font-size 10px
          line-height 10px
          color rgb(147,153,159)
      .overview-right
        flex 1
        padding-left 0.48rem
        font-size 0
        .score-wrapper
          font-size 0
          display flex
          margin-bottom 8px
          align-items center
          &:last-child
            margin-bottom 0
          &:first-child
            margin-top 3px
          .title
            font-size 12px
            line-height 18px
            color rgb(7,17,27)
            margin-right 0.24rem
          .time
            font-size 12px
            color rgb(147,153,159)
            line-height 18px
          .score
            font-size 12px
            color rgb(250,153,0)
            line-height 18px
            margin-left 12px
    .rating-wrapper
      li
        display flex
        margin 18px 0.36rem 0
        border-bottom 0.5px solid rgba(7,17,27,0.1)
        .avatar
          margin-right 0.24rem
          font-size 0
          img
            vertical-align top
        .content
          flex 1
          .user
            font-size 0
            display flex
            justify-content space-between
            .name
              font-size 10px
              color rgb(7,17,27)
              line-height 12px
            .rateTime
              font-size 10px
              color rgb(147,153,159)
              font-weight 200
              line-height 12px
          .star-wrapper
            font-size 0
            display flex
            margin 4px 0 6px
            .deliveryTime
              font-size 10px
              font-weight 200
              color rgb(147,153,159)
              line-height 12px
              margin-left 0.12rem
          .text
            font-size 12px
            color rgb(7,17,27)
            line-height 18px
            margin-bottom 8px
          .recommend
            font-size 0
            margin-bottom 5px
            .icon
              font-size 12px
              color rgb(0,160,220)
              line-height 16px
              margin-right 0.16rem
            .dish
              font-size 9px
              color rgb(147,153,159)
              line-height 16px
              border 0.5px solid rgba(7,17,27,0.1)
              padding 0 0.12rem
              margin-right 0.16rem
              margin-bottom 5px
              display inline-block
</style>
