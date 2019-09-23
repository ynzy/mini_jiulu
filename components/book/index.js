// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object
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
    /* 
    * 直接写在组件中进行跳转,降低了组件的通用性
    * 优点: 非常方便
    * 使用场景: 服务于当前的项目, 项目组件
    onTap() {
      const {id} = this.properties.book
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${id}`,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
    } */
  }
})
