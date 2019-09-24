// components/search/index.js
import { KeywordModel } from "../../../models/keyword";
import { BookModel } from "../../../models/book";
const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    keyword: ''
  },
  attached() {
    this.updataHistory()
  },
  detached() {
    this.setData({searching:false})

  },
  /**
   * 组件的方法列表
   */
  methods: {
    async updataHistory() {
      const historyWords = keywordModel.getHistory()
      const { hot: hotWords } = await keywordModel.getHot();
      this.setData({ historyWords,hotWords })
    },
    // 删除搜索结果
    onDelete() {
      console.log(1);
      
      this.setData({searching:false,keyword: ''})
    },
    // 取消搜索
    onCancel() {
      this.triggerEvent('cancle')
    },
    // 搜索
    async onConfirm(e) {
      const { value } = e.detail
      this.setData({searching:true,keyword: value})
      const {books: dataArray} = await bookModel.search(0,value)
      // console.log(dataArray);
      if(dataArray) {
        keywordModel.addToHistory(value)
        this.setData({dataArray})
      }
    }
  }
})
