<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" class="star-item" :class="itemClass" track-by='$index'></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin'
  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
  &.star-24
    height 10px
    .star-item  
      width 0.2rem
      height 10px
      margin-right 0.05rem
      background-size 0.2rem 0.2rem
      vertical-align middle 
      &:last-child
        margin-right 0
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
  &.star-36
    height 15px
    .star-item  
      width 0.3rem
      height 15px
      margin-right 0.1rem
      background-size 0.3rem 0.3rem
      vertical-align middle 
      &:last-child
        margin-right 0
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
  &.star-48
    height 20px
    .star-item  
      width 0.4rem
      height 20px
      margin-right 0.2rem
      background-size 0.4rem 0.4rem
      vertical-align middle 
      &:last-child
        margin-right 0
      &.on
        bg-image('star48_on')
      &.half
        bg-image('star48_half')
      &.off
        bg-image('star48_off')
</style>