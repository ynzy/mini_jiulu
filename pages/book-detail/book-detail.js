// pages/book-detail/book-detail.js
import { BookModel } from "../../models/book";
import { LikeModel } from "../../models/like";

const bookModel = new BookModel();
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null, // 详情
    comments: [], // 短评
    likeStatus: false, //点赞状态
    likeCount: 0,
    posting: false  // 打开短评状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const { bid } = options
    
    this.initData(bid)
    /*     this.getDetail(bid)
        this.getComments(bid)
        this.getLikeStatus(bid) */
    // this.getInitData(bid)
  },
  async initData(bid) {
    wx.showLoading({
      title: '加载数据中...',
      mask: true,
    });
    const book = await bookModel.getDetail(bid)
    const { comments } = await bookModel.getComments(bid)
    const { like_status, fav_nums } = await bookModel.getLikeStatus(bid)
    console.log({ book, comments, like_status, fav_nums });
    this.setData({
      book,
      comments,
      likeStatus: like_status,
      likeCount: fav_nums
    })
    wx.hideLoading();
  },
  /* getInitData(bid) {
    wx.showLoading({
      title: '加载数据中...',
      mask: true,
    });
    const book =  bookModel.getDetail(bid)
    const comments  =  bookModel.getComments(bid)
    const likeStatus =  bookModel.getLikeStatus(bid)
    Promise.all([book,comments,likeStatus])
    .then(res=> {
      console.log(res);
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading();
    })
  }, */
  /* async getDetail(bid) {
    const book = await bookModel.getDetail(bid)
    // console.log(book);
    this.setData({ book })
  },
  async getComments(bid) {
    const { comments } = await bookModel.getComments(bid)
    // console.log(comments);
    this.setData({ comments: comments })
  },
  async getLikeStatus(bid) {
    const { like_status, fav_nums } = await bookModel.getLikeStatus(bid)
    // console.log(like_status, fav_nums);
    this.setData({
      likeStatus: like_status,
      likeCount: fav_nums
    })
  }, */
  onLike(event) {
    let { behavior } = event.detail
    let { id, type } = this.data.book
    // console.log(behavior);
    likeModel.like(behavior, id, 400)
  },
  // 评论
  onFakePost() {
    this.setData({ posting: true })
  },
  // 取消评论
  onCancel() {
    this.setData({ posting: false })
  },
  async onPost(e) {
    const { comments, book } = this.data
    // 标签点击和文本框输入的文字获取
    const content = e.detail.text || e.detail.value
    if (!content) return
    if (content.length > 12) {
      wx.showToast({
        title: '短评最多12个字'
      });
      return
    }
    let r = await bookModel.postComments(book.id, content)
    if (r) {
      wx.showToast({
        title: '+1'
      });
      comments.unshift({
        content,
        nums: 1
      })
      this.setData({ comments })
      this.onCancel()
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})