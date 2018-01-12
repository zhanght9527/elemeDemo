<template>
  <div class="seller" ref="sellerWrapper">
    <div class="seller-content">
      <div class="info">
        <div class="title">
          <div class="left">
            <div class="name">{{seller.name}}</div>
            <div class="star-wrapper">
              <star :size="36" :score="seller.score"></star>
              <span class="ratingCount">({{seller.ratingCount}})</span>
              <span class="sellCount">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="right">
            <div class="collect" @click="collectflag=!collectflag">
              <span class="ele-favorite" :class="{'active':collectflag}"></span>
              <span class="text">{{collectflag?'已收藏':'收藏'}}</span>
            </div>
          </div>
        </div>
        <div class="remark">
          <div>
            <div class="reTitle">起送价</div>
            <div class="reCont">
              <span class="reText">{{seller.minPrice}}</span>
              <span class="yuan">元</span>
            </div>
          </div>
          <div class="middle">
            <div class="reTitle">商家配送</div>
            <div class="reCont">
              <span class="reText">{{seller.deliveryPrice}}</span>
              <span class="yuan">元</span>
            </div>
          </div>
          <div>
            <div class="reTitle">平均配送时间</div>
            <div class="reCont">
              <span class="reText">{{seller.deliveryTime}}</span>
              <span class="yuan">分钟</span>
            </div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="notice">
        <div class="announ">
          <div class="title">公告与活动</div>
          <div class="text">{{seller.bulletin}}</div>
        </div>
        <div class="supports">
          <ul>
            <li v-for="item in seller.supports" class="supportsLi">
              <span class="supportCont">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.description}}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="sellerPic">
        <div class="title">商家实景</div>
        <div class="img-wrapper" ref="picsWrapper">
          <div ref="picList" class="picList">
            <img v-for="pic in seller.pics" :src="pic" width="120" height="90">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from './../star/star'
import BScroll from 'better-scroll'
import split from '../split/split'
const ERR_OK = 0
export default {
  data () {
    return {
      collectflag: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.sellerWrapper, {
        click: true
      })
    })
  },
  watch: {
    seller: '_initPicScroll'
  },
  methods: {
    _initPicScroll () {
      if (this.seller) {
        if (this.picsScroll) {
          return
        }
        const PIC_WIDTH = 120
        const MARGIN = 6
        let picLen = this.seller.pics.length
        this.$refs.picList.style.width = PIC_WIDTH * picLen + MARGIN * (picLen - 1) + 'px'
        console.log(this.$refs.picList)
        this.picsScroll = new BScroll(this.$refs.picsWrapper, {
          scrollX: true
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .seller
    position absolute
    top 3.48rem
    bottom 0
    left 0
    width 100%
    overflow hidden
  .seller-content
    font-size 0
    .info
      padding 18px 0 0
      .title
        margin 0 0.36rem
        padding-bottom 18px
        display flex
        justify-content space-between
        border-1px(rgba(7,17,27,0.1))
        .left
          .name
            font-size 14px
            color rgb(7,17,27)
            line-height 14px
            margin-bottom 8px
          .star-wrapper
            display flex
            span
              font-size 10px
              color rgb(77,85,93)
              line-height 15px
              &.ratingCount
                margin-left 0.16rem
              &.sellCount
                margin-left 0.24rem
        .right
          .collect
            display flex
            flex-flow column
            width 50px
            justify-content center
            .ele-favorite
              color grey
              font-size 24px
              line-height 24px
              text-align center
              &.active
                color rgb(240,20,20)
            .text
              font-size 10px
              color rgb(77,85,93)
              line-height 10px
              margin-top 4px
              text-align center
      .remark
        display flex
        &>div
          display flex
          justify-content center
          align-items center
          flex-flow column
          margin 18px 0
          flex 1
          &.middle
            border-left 0.5px solid rgba(7,17,27,0.1)
            border-right 0.5px solid rgba(7,17,27,0.1)
          .reTitle
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
          .reCont
            margin-top 4px
            .reText
              font-size 24px
              font-weight 200
              color rgb(7,17,27)
              line-height 24px
            .yuan
              font-size 12px
              font-weight 200
              color rgb(7,17,27)
              line-height 24px
    .notice
      padding 18px 0.36rem 0
      .announ
        .title
          font-size 14px
          color rgb(7,17,27)
          line-height 14px
        .text
          padding 8px 0.24rem 16px
          font-size 12px
          font-weight 200
          color rgb(240,20,20)
          line-height 24px
          text-align justify
          border-1px(rgba(7,17,27,0.1))
      .supports
        .supportsLi
          padding 18px 0.24rem
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          .supportCont
            font-size 12px
            font-weight 200
            color rgb(7,17,27)
            line-height 18px
            display flex
            align-items center
            .icon
              display inline-block
              vertical-align top
              width 16px
              height 16px
              background-size 16px 16px
              background-repeat no-repeat
              margin-right 0.12rem
              &.decrease
                bg-image('../goods/decrease_3')
              &.discount
                bg-image('../goods/discount_3')
              &.guarantee
                bg-image('../goods/guarantee_3')
              &.invoice
                bg-image('../goods/invoice_3')
              &.special
                bg-image('../goods/special_3')
    .sellerPic
      padding 18px 0 18px 0.36rem
      .title
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
        margin-bottom 12px
      .img-wrapper
        img
          vertical-align top
          margin-right 6px
</style>
