// pages/book/book.js
import { BookModel } from "../../models/book";
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotList();
  },
  async getHotList() {
    let books = await bookModel.getHotList()
    // console.log(books);
    this.setData({ books })
  },
  openDetail(e) {
    const { bid } = e.target.dataset
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bid=${bid}`
    });
  },
  // 搜索
  onSearching() {
    this.setData({
      searching: !this.data.searching
    })
  },
  // 取消搜索
  onCanael() {
    this.setData({
      searching: !this.data.searching
    })
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