// components/classic/music/index.js
import { classicBeh } from "../classic-beh";

const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   * 播放音乐API
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  attached() {
    this._recoverStatus();
    this._monitorSwitch();
  },
  detached() {
    // mMgr.stop()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      const { src, title } = this.properties
      const { playing } = this.data
      mMgr.title = title
      // console.log(playing);
      this.setData({
        playing: !playing
      })
      if (!playing) {
        // 图片要切换
        mMgr.src = src
      } else {
        mMgr.pause()
      }
    },
    // 恢复音乐状态
    _recoverStatus() {
      const { src } = this.properties
      // 如果音乐是暂停状态
      if (mMgr.paused) {
        this.setData({ playing: false })
        return
      }
      // 如果当前音乐路径和传入的音乐路径相等
      if (mMgr.src == src) {
        this.setData({ playing: true })
      }
    },
    // 监听音乐总控开开关
    _monitorSwitch() {
      // 播放
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      // 暂停
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      // 停止
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      // 自然播放结束
      mMgr.onEnded(() => {
        this._recoverStatus()
      })

    }
  }
})
