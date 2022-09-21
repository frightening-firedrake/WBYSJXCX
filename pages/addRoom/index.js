// pages/roomManagement/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_edit: false, //是否是在编辑页面还是添加页面
    imgurl: null,
    base_file_url: app.globalData.baseUrl,
    businessCreateRoom: app.globalData.baseUrl + app.globalData.urlData.businessCreateRoom,
    //上传房间的数据
    room_data: {
      name: '',
      room_person: '',
      name_number: '',
      detail: '',
      store_id: '',
      is_edit: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('detai_data', function (data) {
      let tmp_data = {
        id:data.id,
        name: data.room_name,
        room_person: data.room_people,
        name_number: data.room_code,
        detail: data.room_detail,
        store_id: data.store_id,
        is_edit: true
      }
      that.setData({
        room_data: tmp_data,
        imgurl: that.data.base_file_url + data.path,
      })
      wx.downloadFile({
        url:that.data.base_file_url + data.path, //
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

    //  if (this.data.room_data){

    //  }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(options) {

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
  //选择图片 放到data中
  upload() {
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
  //将图片数据一起打包发送过去
  save_room(e) {
    let room_data = {}
    //如果是编辑的时候 先将已有的照片下载到本地
    console.log( e.detail.value)
    var imgurl=''
    if (this.data.room_data.is_edit) {
      room_data = e.detail.value
      room_data['is_edit'] = true
      room_data['id'] =  this.data.room_data.id
      room_data['store_id'] = app.globalData.storeId
  
    } else {
      room_data = e.detail.value
      room_data['store_id'] = app.globalData.storeId
      room_data['is_edit'] = false
      this.setData({
        room_data: room_data
      })
    }


    wx.uploadFile({
      url: this.data.businessCreateRoom, //上传文件的接口地址
      filePath: this.data.imgurl,
      name: 'room_cover',
      formData: {
        'data': JSON.stringify(room_data)
      },
      success(res) {
        wx.navigateTo({
          url: '../roomManagement/index',
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

  }
})