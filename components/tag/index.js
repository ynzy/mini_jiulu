// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    //! 启用插槽
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  //! 外部样式类
  externalClasses: ['tag-class'],
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
     this.triggerEvent('tapping', {
       text: this.properties.text
     })
      
    }
  }
})
