// 分页行为
const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false
  },
  methods: {
    // 更新更多数据
    setMoreData(newArray) {
      const { dataArray } = this.data
      const tempArray = [...dataArray, ...newArray]
      this.setData({ dataArray: tempArray })
    },
    // 起始记录数
    getCurrentStart() {
      return this.data.dataArray.length
    },
    setTotal(total) {
      this.data.total = total
      if(total === 0) {
        this.setData({noneResult: true})
      }
    },
    // 是否加载更多
    hasMore() {
      const { dataArray, total } = this.data
      if (dataArray.length >= total) {
        return false
      } else {
        return true
      }
    },
    // 初始化数据
    initialize() {
      this.setData({
        dataArray: [],
        noneResult: false
      })
      this.data.total = null
    }

  }
})

export { paginationBev }