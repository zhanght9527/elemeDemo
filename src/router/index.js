import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: goods
    },
    {
      path: '*',
      redirect: '/goods'
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: seller
    }
  ]
})
