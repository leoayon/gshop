/*
包含多个基于state的getter计算属性的对象
reduce方法：如果数组只有一个元素（无论位置如何）且未提供 initialValue，
           或者提供了 initialValue 但数组为空，则将返回该单个值，而不调用 callbackFn
           cartFoods初始值为空数组，执行reduce方法后，totalCount为0
 */

export default {
  // 购物车总数量
  totalCount (state) {
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count
    }, 0)
  },
  // 购物车总价格
  totalPrice (state) {
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count * food.price
    }, 0)
  },
  // 好评数量
  positiveCount (state) {
    return state.shopRatings.reduce((preTotal, shopRating) => {
      return preTotal + (shopRating.rateType === 0 ? 1 : 0)
    }, 0)
  }
}