<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,$index) in goods" class="menu-item" :class="{'current' : currentIndex == $index}" @click="selectMenu($index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now"><span class="sign">￥</span>{{food.price}}</span>
                  <s v-show="food.oldPrice" class="old"><span class="sign">￥</span>{{food.oldPrice}}&nbsp;</s>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  components: {
    shopcart,
    cartcontrol
  }
}
</script>

style <style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .goods
    display flex
    position absolute
    top 3.48rem
    bottom 0.92rem
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 1.6rem
      width 1.6rem
      background #f3f5f7
      .menu-item
        display table
        height 1.08rem
        width 1.12rem
        line-height 0.28rem
        padding 0 0.24rem
        &.current
          position relative
          margin-top -1px
          z-index 10
          background white
          .text
            font-weight 700
            border-none()
        .text
          display table-cell
          vertical-align middle
          width 1.12rem
          border-1px(rgba(7,17,27,0.1))
          font-size 12px
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 2px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
    .foods-wrapper
      flex 1
      .food-list
        .title
          padding-left 0.28rem
          height 0.52rem
          line-height 0.52rem
          border-left 2px solid #d9dde1
          font-size 12px
          color rgb(147,153,159)
          background #f3f5f7
        .food-item
          display flex
          margin 0.36rem
          padding-bottom 0.36rem
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
            margin-bottom 0
          .icon
            flex 0 0 1.35rem
            height 1.15rem
            width 1.15rem
            border-radius 0.01rem
            img 
              height 1.15rem
              width 1.15rem
              vertical-align top 
          .content
            flex 1
            font-size 0
            .name
              font-size 14px
              line-height 14px
              color rgb(7,17,27)
              margin-bottom 0.14rem
            .desc, .extra
              font-size 10px
              line-height 14px
              color rgb(147,153,159)
              margin-bottom 0.08rem
            .extra
              span 
                font-size 10px
                margin-right 0.24rem
            .price
              .now
                font-weight 700
                line-height 24px
                margin-right 0.1rem
                font-size 14px
                color rgb(240,20,20)
              .old
                font-weight 700
                line-height 24px
                font-size 10px
                color rgb(147,153,159)
              .sign
                font-size 10px
                font-weight normal
            .cartcontrol-wrapper
              position absolute
              right 0
              bottom 0.12rem
</style>