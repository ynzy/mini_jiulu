// pages/book-detail/book-detail.js
import { BookModel } from "../../models/book";
const bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null, // 详情
    comments: [], // 短评
    likeStatus: false, //点赞状态
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const { bid } = options
    // this.initData(bid)
    this.getDetail(bid)
    this.getComments(bid)
    this.getLikeStatus(bid)
  },
/*   async initData(bid) {
    const book = await bookModel.getDetail(bid)
    const {comments} = await bookModel.getComments(bid)
    const {like_status,fav_nums} = await bookModel.getLikeStatus(bid)
    console.log({book,comments,like_status,fav_nums});
    this.setData({
      book,
      comments,
      likeStatus: like_status,
      likeCount: fav_nums
    })
  }, */
  async getDetail(bid) {
    const book = await bookModel.getDetail(bid)
    console.log(book);
    this.setData({book})
  },
  async getComments(bid) {
    const {comments} = await bookModel.getComments(bid)
    console.log(comments);
    this.setData({comments: comments})
  },
  async getLikeStatus(bid) {
    const {like_status,fav_nums} = await bookModel.getLikeStatus(bid)
    console.log(like_status,fav_nums);
    this.setData({
      likeStatus: like_status,
      likeCount: fav_nums
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