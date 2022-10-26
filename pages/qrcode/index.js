import drawQrcode from '../../utils/weapp.qrcode.js'

// Component({

Page({
  data: {
    payment_data:'',
    storeTitle:'',
    logo:'',
    imageResource: '../../assets/img/logo.png',
    price:'',
    inputValue: ''
  },
  changeText(text) {
    if (!this.data.inputValue) {
      wx.showModal({
        title: '提示',
        content: '请先输入要转换的内容！',
        showCancel: false
      })
      return
    }
    this.setData({
      text: this.data.inputValue
    })
    this.draw()
  },
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  draw() {
    drawQrcode({
      width: 187,
      height: 187,
      x: 0,
      y: 0,
      canvasId: 'myQrcode',
      // ctx: wx.createCanvasContext('myQrcode'),
      typeNumber: 10,
      text: this.data.payment_data,
      // image: {
      //   imageResource: '../../assets/img/logo.png',
      //   dx: 70,
      //   dy: 70,
      //   dWidth: 60,
      //   dHeight: 60
      // },
      callback(e) {
        console.log('e: ', e)
      }
    })
  },
  repaint() {
    // 设置二维码起始位置 x,y
    drawQrcode({
      width: 187,
      height: 187,
      x: 0,
      y: 0,
      canvasId: 'myQrcode',
      typeNumber: 10,
      text: this.payment_data,
      callback(e) {
        console.log('e: ', e)
      }
    })
  },
  download() {
    // 导出图片
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 300,
      destWidth: 300,
      destHeight: 300,
      canvasId: 'myQrcode',
      success(res) {
        console.log('图片的临时路径为：', res.tempFilePath)
        let tempFilePath = res.tempFilePath
        // 保存图片，获取地址
        // wx.saveFile({
        //   tempFilePath,
        //   success (res) {
        //     const savedFilePath = res.savedFilePath
        //     console.log('savedFilePath', savedFilePath)
        //   }
        // })

        // 保存到相册
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  },
  getBase64Data() {
    // 获取二维码 base64 格式
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 300,
      destWidth: 300,
      destHeight: 300,
      canvasId: 'myQrcode',
      success(res) {
        console.log('图片的临时路径为：', res.tempFilePath)
        let tempFilePath = res.tempFilePath
        // 获取 base64
        wx.getFileSystemManager().readFile({
          filePath: tempFilePath,
          encoding: 'base64',
          success: function (res) {
            console.log('[base64 data is]', res)
            wx.showToast({
              title: '获取成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            wx.showToast({
              title: '获取失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  },
  // ready:function () {


  // },
  onLoad(options) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('payment_data', function (data) {
      console.log(data)
      let payment_data=JSON.parse(JSON.stringify(data));
      delete payment_data.storeTitle
      delete payment_data.logo
      that.setData({
        payment_data:JSON.stringify(payment_data),
        storeTitle:data.storeTitle,
        logo:data.logo,
        price:data.price
      })

      that.draw()

    })
  }

})