// pages/classic/classic.js
import { ClassicModel, } from "../../models/classic";
import { LikeModel } from "../../models/like";

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null, //期刊数据
    latest: true,  // 最新期刊
    first: false,  // 第一期期刊
    likeCount: 0,  //喜欢的数量
    likeStatus: false //喜欢的状态
  },

  onLike(event) {
    let { behavior } = event.detail
    let { id, type } = this.data.classic
    // console.log(behavior);
    likeModel.like(behavior, id, type)
    // .then(res => {
    //   console.log(res);
    // })
  },
  /*   async onNext() {
      const { index } = this.data.classic
      let classic = await classicModel.getNext(index)
      // console.log(classic);
      this.setData({
        classic,
        latest: classicModel.isLatest(classic.index),
        first: classicModel.isFirst(classic.index)
      })
    }, 
      async onPrevious() {
      const { index } = this.data.classic
      let classic = await classicModel.getPrevious(index)
      // console.log(classic);
      this.setData({
        classic,
        latest: classicModel.isLatest(classic.index),
        first: classicModel.isFirst(classic.index)
      })
    },
    */
  onNext() {
    this._updateClassic(`next`)
  },
  onPrevious() {
    this._updateClassic(`previous`)
  },
  async _updateClassic(nextOrPrevious) {
    const { index } = this.data.classic
    let classic = await classicModel.getClassic(index, nextOrPrevious)
    this._getLikeStatus(classic.id, classic.type)
    console.log(classic);
    this.setData({
      classic,
      latest: classicModel.isLatest(classic.index),
      first: classicModel.isFirst(classic.index)
    })
  },
  async _getLikeStatus(arrt_id, type) {
    let { fav_nums, like_status } = await likeModel.getClassicLikeStatus(arrt_id, type)
    console.log(data);
    this.setData({ likeCount: fav_nums, likeStatus: like_status })

  },

  // 获取最新期刊数据,保存到storage中
  async getLatest() {
    let classic = await classicModel.getLatest()
    // console.log(classic);
    classicModel._setLastestIndex(classic.index)
    //! 这里不要使用请求更新点赞状态,减少请求次数,使用现有的数据进行更新
    // this._getLikeStatus(classic.fav_nums,classic.like_status)
    this.setData({
      // ...classic,
      classic,
      likeCount: classic.fav_nums,
      likeStatus: classic.like_status
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLatest();
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