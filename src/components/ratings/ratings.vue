<template>
  <div class="ratings">
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
    </div> 
  </div>
</template>

<script>
  import star from '../star/star'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'

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
</style>
