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

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      const { src, title } = this.properties
      const { playing } = this.data
      mMgr.title = title
      console.log(playing);
      this.setData({
        playing: !playing
      })
      if (!playing) {
        // 图片要切换
        mMgr.src = src
      } else {
        mMgr.pause()
      }

    }
  }
})
