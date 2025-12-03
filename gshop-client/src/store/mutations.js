/*
vuex 的 mutations 模块
*/
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOPGOODS,
  RECEIVE_SHOPRATINGS,
  RECEIVE_SHOPINFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },
  [RECEIVE_SHOPGOODS] (state, {shopGoods}) {
    state.shopGoods = shopGoods
  },
  [RECEIVE_SHOPRATINGS] (state, {shopRatings}) {
    state.shopRatings = shopRatings
  },
  [RECEIVE_SHOPINFO] (state, {shopInfo}) {
    state.shopInfo = shopInfo
  },
  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if(!food.count) { // 第一次增加
      // 新增属性，这种方式没有数据绑定，需要用Vue.set
      // food.count = 1
      // Vue.set(对象，属性名， 属性值)，在组件中可以使用this.$set(对象，属性名，属性值)
      Vue.set(food, 'count', 1)
      // 将food添加到cartFoods中
      state.cartFoods.push(food)
    }else {
      food.count ++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, {food}) {
    if(food.count) { // 大于零的情况才减少
      food.count --
      if(food.count === 0) {
        // 将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART] (state) {
    // 将food中的count置为0
    state.cartFoods.forEach(food => {
      food.count = 0
    })
    // 移除cartFoods中的所有food
    state.cartFoods = []
  },
  [RECEIVE_SEARCH_SHOPS] (state, {searchShops}) {
    state.searchShops = searchShops
  }
}