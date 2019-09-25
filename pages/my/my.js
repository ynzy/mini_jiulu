// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    authorized: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()

  },
  // 用户认证
  userAuthorized() {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            lang: 'zh_CN',
            success: (data) => {
              console.log(data);
              this.setData({authorized: true, userInfo:data.userInfo})
            },
          });
        } else { 
          
        }
      },
    });
  },
  // 获取用户信息
  onGetUserInfo(event) {
    const {userInfo} = event.detail
    // console.log(userInfo);
    if(userInfo) {
      this.setData({userInfo,authorized: true})
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})