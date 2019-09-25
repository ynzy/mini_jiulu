// pages/my/my.js
import { BookModel } from "../../models/book";
import { ClassicModel, } from "../../models/classic";

const bookModel = new BookModel()
const classicModel = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    authorized: false,
    bookCount: 0,
    classics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  async getMyFavor() {
    let classics = await classicModel.getMyFavor()
    this.setData({classics})
  },
  async getMyBookCount() {
    const {count} = await bookModel.getMyBookCount()
    this.setData({bookCount:count})
  },
  // 用户认证
  userAuthorized() {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            lang: 'zh_CN',
            success: (data) => {
              // console.log(data);
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
  onPreviewTap: function(event) {
    // wx.navigateTo({
    //   url: '/pages/classic-detail/index?cid=' + event.detail.cid + '&type=' + event.detail.type
    // })
    const classic = event.detail
    wx.navigateTo({
      url: `/pages/classic-detail/index?classic=${JSON.stringify(classic)}`
    })
  },
  onJumpToAbout(event) {
    /* wx.navigateTo({
      url: '/pages/about/about',
    }); */
  },
  onStudy() {
    /* wx.navigateTo({
      url: '/pages/course/course',
    }) */
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