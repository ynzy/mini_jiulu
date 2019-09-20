import { config } from "../config";

const tips = {
  0: 'OK, 成功',
  1: '抱歉,出现一个错误',
  1005: '不正确的开发者appkey',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1006: '服务器内部错误',
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  3000: '该期内容不存在'
}
//添加事件结束
/* Promise.prototype.finally = function (callback) {
  return this.then(val=> {
        return  Promise.resolve(callback()).then(value=>val);
      },err => {
        return  Promise.resolve(callback()).then(()=>{throw err})
      }
  );
} */

class HTTP {
  constructor() {
    this.baseRestUrl = config.api_blink_url
  }
  request(params) {
    let url = this.baseRestUrl + params.url
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: params.method || 'GET',
        data: params.data,
        header: {
          'content-type': 'application/json',
          'appkey': config.appkey
        },
        success: res => {
          let code = res.statusCode.toString()
          if (code.startsWith('2')) {
            resolve(res.data)
          } else {
            let error_code = res.data.error_code
            this._show_error(error_code)
          }
        },
        fail: err => {
          reject(err)
          this._show_error(1)
        },
        complete: () => {
          //? 此处废弃,使用Promise.finally()处理此处功能
        }
      })
    })
  }

  _show_error(error_code) {
    if(!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }

}


export { HTTP }