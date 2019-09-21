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


}

export {
  ClassicModel
}