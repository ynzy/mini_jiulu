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

  async getClassic(index, nextOrPrevious) {
    // 缓存中寻找 or API 写入到缓存中
    // key 代表期刊,也能代表是哪一期期刊
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    // 如果没有缓存
    if (!classic) {
      let data = await this.request({
        url: `/classic/${index}/${nextOrPrevious}`
      })
      wx.setStorageSync(this._getKey(data.index), data)
      return data
      // 如果有缓存
    } else {
      return classic
    }
  }
  /* getPrevious(index) {
    return this.request({
      url: `/classic/${index}/previous`
    })
  }
  getNext(index) {
    return this.request({
      url: `/classic/${index}/next`
    })
  } */
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
  _getKey(index) {
    let key = `classic-${index}`
    return key
  }

}

export {
  ClassicModel
}