import {
  Http
} from "../utils/http-p";

class KeywordModel extends Http{
  key = 'q'
  maxLength = 10
  // 获取历史搜索
  getHistory() {
    const words = wx.getStorageSync(this.key);
    if (!words) {
      return []
    }
    return words
  }
  // 获取热门搜索
  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  // 添加历史搜索
  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      // 限制存储数量, 数组末尾数据删除,添加keyword
      if (words.length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words);
    }
  }
}

export { KeywordModel }