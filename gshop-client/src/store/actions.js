/*
* vuex的actions模块
* */
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
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShops
} from '../api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    const {latitude, longitude} = state
    const geohash = longitude+ ',' + latitude
    const result = await reqAddress(geohash)
    if(result.code === 0) {
      const address = result.data.regeocode
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  // 异步获取食物分类列表
  async getCategorys ({commit}) {
    const result = await reqFoodCategorys()
    if(result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  // 异步获取商家列表
  async getShops ({commit, state}) {
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    if(result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 已经有数据，定义一个同步action
  recordUser ({commit}, userInfo) {
   commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 获取用户信息的异步action
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if(result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  // 异步登出
  async logout ({commit}) {
    const result = await reqLogout()
    if(result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  // 获取食品列表
  async getShopGoods ({commit}, callback) {
    const result = await reqShopGoods()
    if(result.code === 0) {
      const shopGoods = result.data
      commit(RECEIVE_SHOPGOODS, {shopGoods})
      // 数据更新了，通知一下组件
      callback && callback()
    }
  },
  // 获取用户评价列表
  async getShopRatings ({commit}, callback) {
    const result = await reqShopRatings()
    if(result.code === 0) {
      const shopRatings = result.data
      commit(RECEIVE_SHOPRATINGS, {shopRatings})
      callback && callback()
    }
  },
  // 获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if(result.code === 0) {
      const shopInfo = result.data
      commit(RECEIVE_SHOPINFO, {shopInfo})
    }
  },
  // 更新food.count的同步action
  updateFoodCount ({commit}, {isAdd, food}) {
    if(isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    }else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  // 清空购物车的同步action
  clearCart ({commit}) {
    commit(CLEAR_CART)
  },
  // 获取搜索列表
  async getSearchShops ({commit, state}, keyword) {
    const {latitude, longitude} = state
    const geohash = longitude+ ',' + latitude
    const result = await reqSearchShops(geohash, keyword)
    if(result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  }
}