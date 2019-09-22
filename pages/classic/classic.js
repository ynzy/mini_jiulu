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
    latest: true,
    first: false
  },

  onLike(event) {
    let { behavior } = event.detail
    let { id, type } = this.data.classic
    console.log(behavior);
    likeModel.like(behavior, id, type).then(res => {
      console.log(res);
    })
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
    // console.log(classic);
    this.setData({
      classic,
      latest: classicModel.isLatest(classic.index),
      first: classicModel.isFirst(classic.index)
    })
  },


  // 获取最新期刊数据,保存到storage中
  async getLatest() {
    let classic = await classicModel.getLatest()
    console.log(classic);
    classicModel._setLastestIndex(classic.index)
    this.setData({ classic })

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