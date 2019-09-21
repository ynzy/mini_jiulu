// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: `images/like.png`,
    noSrc: `images/like@dis.png`
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {

      /* let like = this.properties.like
      let count = this.properties.count */
      let {
        like,
        count
      } = this.properties
      count = like ? count - 1 : count + 1
      this.setData({
        like: !like,
        count
      })
      //! 自定义事件
      // 如果like为真,点赞操作,否则取消点赞
      let behavior = like ? 'cancel' : 'like'
      /**
       * ! 激活事件并附带behavior状态
       * 参数1: 自定义事件
       * 参数2: 自己定义的属性,传递出去的参数
       * 参数3: 触发事件,内置事件,一般不会使用
       */

      this.triggerEvent('like', {
        behavior
      }, {})
    }
  }
})