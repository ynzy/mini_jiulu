// components/epsolde/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {//期刊号
      type: Number,
      /**
       * ! 数据监听器
       * ! 千万不要在observer中修改自身属性(可能引起无限递归)
       * newVal（新值）,
       * oldVal（旧值
       * changedPath（路径
       * 为了便于维护，简洁，也可以在methods中定义方法，
       * 然后在observer中引用方法名称,如下
       */
      /* observer(newVal, oldVal, changePath) {
        newVal < 10 && this.setData({ _index: '0' + newVal })
      } */
      observer: 'compute'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
    year: 0, // 年
    month: '', // 月
    _index: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    compute(newVal, oldVal, changePath) {
      let _index = newVal < 10 ? `0${newVal}` : newVal
      // 这里的index已经处理,但是显示到页面时还是原数据
      // 原因:attached生命周期,页面渲染时,index的值是原数据,已经显示,所以更改后的数据没有生效
      // console.log(_index);
      this.setData({ _index })

    }
  },
  //! 组件生命周期
  lifetimes: {
    attached() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      this.setData({
        year,
        month: this.data.months[month]
      })
    }
  },
})
