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
    loading: false
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
      if(this._isLocked) return
      if (this.hasMore()) {
        this._locked()
        const { books } = await bookModel.search(this.getCurrentStart(), keyword)
        if (books) {
          this.setMoreData(books)
          this._unLocked
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
      this._closeResult()
    },
    // 取消搜索
    onCancel() {
      this.triggerEvent('cancle')
    },
    // 搜索
    async onConfirm(e) {
      const q = e.detail.value || e.detail.text
      this.setData({ keyword:q })
      this._showResult(q)
      this.initialize()
      const { books, total } = await bookModel.search(0, q)
      if (books) {
        this.setMoreData(books)
        this.setTotal(total)
        keywordModel.addToHistory(q)
      }
    },
    // 是否加锁
    _isLocked() {
      return this.data.loading ? true : false
    },
    // 加锁
    _locked() {
      this.data.loading = true
    },
    // 解锁
    _unLocked() {
      this.data.loading = false
    },
    // 显示搜索结果
    _showResult() {
      this.setData({ searching: true })
    },
    // 关闭搜索
    _closeResult() {
      this.setData({ searching: false,keyword: '' })
    }
  }
})
