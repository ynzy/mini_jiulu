// 优化http,promise封装

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

class Http {
  constructor() {
    this.baseRestUrl = config.api_blink_url
  }

  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: this.baseRestUrl + url,
      data,
      method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: res => {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data);
        } else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: err => {
        reject()
        this._show_error(1)
      }
    });
  }
  _show_error(error_code) {
    // 如果error_code不存在
    if (!error_code) {
      error_code = 1
    }
    // 增强健壮性判断,有一些error_code没有定义取不到值,
    // 取不到值默认为1
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip: tips[1],
      icon: 'none',
      duration: 2000
    })
  }

}


export { Http }