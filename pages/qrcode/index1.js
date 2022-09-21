// pages/qrcode/index.js
const app = getApp()
// let drawQrcode = require("../../utils/weapp-qrcode.js")
import QRCode from '../../utils/weapp.qrcode.esm.js'
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    createQrcode() {
      var that = this;
      const query = wx.createSelectorQuery()
      query.select('#qrcode')
        .fields({
          node: true,
          size: true
        })
        .exec((res) => {
          var canvas = res[0].node
     
          // 调用方法drawQrcode生成二维码
          QRCode({
            canvas: canvas,
            canvasId: 'qrcode',
            width: that.createRpx2px(300),
            padding: 10,
            background: '#ffffff',
            foreground: '#000000',
            text: that.data.qrCodeLink,
          })
     
          // 获取临时路径（得到之后，想干嘛就干嘛了）
          wx.canvasToTempFilePath({
            canvasId: 'qrcode',
            canvas: canvas,
            x: 0,
            y: 0,
            width: that.createRpx2px(300),
            height: that.createRpx2px(300),
            destWidth: that.createRpx2px(300),
            destHeight: that.createRpx2px(300),
            success(res) {
              // console.log('二维码临时路径：', res.tempFilePath)
              that.setData({
                qrcodePath: res.tempFilePath
              })
              console.log('二维码临时路径：', that.data.qrcodePath)
            },
            fail(res) {
              console.error(res)
            }
          })
        })
    },
     createRpx2px (rpx) {
                return wx.getSystemInfoSync().windowWidth / 750 * rpx
                },
   
    
  },
  ready:function () {
  }

})
