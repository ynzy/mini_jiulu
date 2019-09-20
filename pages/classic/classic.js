// pages/classic/classic.js
import { HTTP } from "../../utils/http";
let http = new HTTP()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.request({
      url: '/classic/latest'
    }).then(res => {
      console.log(res);
    }).catch(err=> {
      console.log(err);
    }).finally(()=> {
      console.log('1');
    })


    /* wx.request({
      url: 'http://bl.7yue.pro/v1/classic/latest',
      header: {
        appkey: 'RdshydjBvcYZhMZC'
      },
      success: (res) => {
        console.log(this.data.test);
        console.log(res);
      }
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
    /* let promise = new Promise((resolve,reject) => {
      wx.request({
        url: 'http://bl.7yue.pro/v1/classic/latest',
        header: {
          appkey: 'RdshydjBvcYZhMZC'
        },
        success: (res) => {
          resolve(res)
        }
      })
    })
    promise.then(res=> {
      console.log(res);
    }) */

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