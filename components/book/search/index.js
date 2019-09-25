// components/search/index.js
import { KeywordModel } from "../../../models/keyword";
import { BookModel } from "../../../models/book";
import { paginationBev } from "../../behaviors/pagination";


const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    keyword: '',
    loading: false,
    loadingCenter: false
  },
  attached() {
    this.updataHistory()
  },
  detached() {
    this.setData({ searching: false })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async loadMore() {
      let { keyword } = this.data
      if (!keyword) return;
      // console.log(this._isLocked());
      if (this.isLocked()) return
      if (this.hasMore()) {
        this.locked()
        try {
          const { books } = await bookModel.search(this.getCurrentStart(), keyword)
          if (books) {
            this.setMoreData(books)
            this.unLocked()
          }
        } catch (error) {
          // 防止死锁
          this.unLocked()
        }
      }

    },
    async updataHistory() {
      const historyWords = keywordModel.getHistory()
      const { hot: hotWords } = await keywordModel.getHot();
      this.setData({ historyWords, hotWords })
    },
    // 删除搜索结果
    onDelete() {
      // this.initialize()
      this._closeResult()
    },
    // 取消搜索
    onCancel() {
      // this.initialize()
      this.triggerEvent('cancle')
    },
    // 搜索
    async onConfirm(e) {
      const q = e.detail.value || e.detail.text
      this.setData({ keyword: q })
      this._showResult()
      this._showLoadingCenter()
      const { books, total } = await bookModel.search(0, q)
      if (books) {
        this.setMoreData(books)
        this.setTotal(total)
        if(q) {
          keywordModel.addToHistory(q)
        }
        this._hideLoadingCenter()
      }
    },
    // 显示中间的loading
    _showLoadingCenter() {
      this.setData({loadingCenter: true})
    },
    _hideLoadingCenter() {
      this.setData({loadingCenter: false})
    },
    // 显示搜索结果
    _showResult() {
      this.setData({ searching: true })
    },
    // 关闭搜索
    _closeResult() {
      this.setData({ searching: false, keyword: '' })
    }
    
  }
})
