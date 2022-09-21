// pages/hostManagement/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:null,
    base_file_url: app.globalData.baseUrl,
      businessAddHost: app.globalData.baseUrl + app.globalData.urlData.businessAddHost,
    host_data:{
      name:'',
      mobile_phone:'',
      store_id: app.globalData.storeId,
      user_code: app.globalData.userCode,
      is_edit:false,
      
   
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('detail_data', function (data) {
      that.setData({
        ['host_data.mobile_phone']:data.mobile_phone,
        ['host_data.name']: data.name,
        ['host_data.is_edit']: true,
        ['host_data.id']: data.id,
        // imgurl: that.data.base_file_url + data.avatar,
      })
      wx.downloadFile({
        url:that.data.base_file_url + data.avatar, //
        success(res) {
          if (res.statusCode === 200) {
            console.log(res.tempFilePath, 'res.tempFilePath')
            let tempFilePaths = res.tempFilePath
            that.setData({
              imgurl: tempFilePaths
            })
          }
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  
  //选择图片 放到data中
  uploadImg() {
    let that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res)
        let tempFilePaths = res.tempFiles
        console.log(tempFilePaths, 'tempFilePaths')
        that.setData({
          imgurl: tempFilePaths[0].tempFilePath
        })
      }
    })
  },


  save_host(e){

    // let host_data=e.detail.value
    this.setData({
      ['host_data.mobile_phone']:e.detail.value.mobile_phone,
      ['host_data.name']:e.detail.value.name,
      ['host_data.store_id']:app.globalData.storeId,
      ['host_data.user_code']: app.globalData.userCode,
    })
    console.log(this.data.host_data,'data.host_data')
    wx.uploadFile({
      url: this.data.businessAddHost, //上传文件的接口地址
      filePath: this.data.imgurl,
      name: 'avatar',
      formData: {
        'data': JSON.stringify(this.data.host_data)
      },
      success(res) {
        wx.navigateTo({
          url: '../hostManagement/index',
          success: function (res) {}
        })
      },
      fail: function (res) {
        console.log(res, 'res')
        wx.showToast({

          title: '上传失败，请重新上传',

          icon: 'none',

          duration: 2000

        })
      }
    })
  },
})