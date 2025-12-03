<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="(shopGood, index) in shopGoods" :key="index"
              :class="{current: index === currentIndex}" @click="changeMenuItem(index)">
            <span class="text bottom-border-1px border-1px">
              <img class="icon" :src="shopGood.icon" v-if="shopGood.icon">
              {{shopGood.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(shopGood, index) in shopGoods" :key="index">
            <h1 class="title">{{shopGood.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px border-1px"
                  v-for="(food, index) in shopGood.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  export default {
    data () {
      return {
        scrollY: 0, // 右侧滑动时的y轴坐标（滑动过程中实时变化）
        tops: [], // 右侧所有的分类li的top值组成的数组（列表第一次显示后就不再变化）
        food: {} // 需要显示的单个食物对象
      }
    },
    mounted () {
      this.$store.dispatch('getShopGoods', () => { // 数据更新后执行
        this.$nextTick(() => { // 食物列表界面更新后执行
          this._initScroll()
          this._initTops()
        })
      })
    },
    computed: {
      ...mapState(['shopGoods']),
      // 计算得到当前分类的下标，初始化时和相关属性发生变化时才调用此方法
      currentIndex () {
        // 得到条件数据
        const {scrollY , tops} = this
        // 根据条件数据计算得到结果
        const curIndex = tops.findIndex((top, index) => {
          return scrollY >= top && scrollY < tops[index+1]
        })
        return curIndex
      }
    },
    methods: {
      // 初始化滚动，函数名前加_表示是非事件回调函数
      _initScroll () {
        new BScroll('.menu-wrapper', {
          click: true
        })
        // 1. probeType 为 0，在任何时候都不派发 scroll 事件，
        // 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
        // 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
        // 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
        this.foodsScroll = new BScroll('.foods-wrapper', {
          probeType: 2, // 2表示因为惯性的滑动不会触发
          click: true
        })
        // 给右侧列表绑定scroll监听
        this.foodsScroll.on('scroll', ({x, y}) => {
          // console.log(x, y)
          this.scrollY = Math.abs(y)
        })
        // 给右侧列表绑定滚动结束的监听
        this.foodsScroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })
      },
      // 初始化tops, 函数名前加_表示是非事件回调函数
      _initTops () {
        // 1.初始化tops
        const tops = []
        let top = 0
        tops.push(top)
        // 2.收集数据
        // const lis = this.$refs.foodsUl.getElementsByClassName('.food-list-hook')
        const lis = this.$refs.foodsUl.children
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        // console.log(tops)
        // 3.更新data中的tops
        this.tops = tops
      },
      changeMenuItem (index) {
        // 根据点击的index得到目标位置的scrollY
        const scrollY = this.tops[index]
        // 立即更新scrollY(让点击的分类项成为当前分类)
        this.scrollY = scrollY
        // 平滑滑动右侧列表，不传时间参数表示没有滑动效果
        this.foodsScroll.scrollTo(0, -scrollY, 300)
      },
      // 显示点击的food
      showFood (food) {
        // 更新food数据
        this.food = food
        // 显示food组件（在父组件里调用子组件里定义的方法）
        this.$refs.food.toggleShowFood()
      }
    },
    components: {
      CartControl,
      Food,
      ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>