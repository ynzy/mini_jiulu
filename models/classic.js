import {
  HTTP
} from "../utils/http";
class ClassicModel extends HTTP {
  // 获取最新一期
  getLatest() {
    return this.request({
      url: '/classic/latest'
    })
  }
  getPrevious(index) {
    return this.request({
      url: `/classic/${index}/previous`
    })
  }
  getNext(index) {
    return this.request({
      url: `/classic/${index}/next`
    })
  }
  // 判断当前期刊是不是第一个
  isFirst(index) {
    return index == 1 ? true : false;
  }
  // 判断当前期刊是不是最后一个
  // latestClassic latestIndex 
  // currentClassic currentIndex
  // 判断当前期刊和最后一期期刊index是否相等
  isLatest(index) {
    let latestIndex = this._getLastestIndex();
    return latestIndex === index ? true : false
  }
  _setLastestIndex(index) {
    wx.setStorageSync('latest', index);
  }
  _getLastestIndex() {
    return wx.getStorageSync('latest');
  }
}

export {
  ClassicModel
}