
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_file_url: app.globalData.baseUrl,

    businessRoomList: app.globalData.baseUrl + app.globalData.urlData.businessRoomList,
    businessDeleteRoom: app.globalData.baseUrl + app.globalData.urlData.businessDeleteRoom,
    
    room_list:[],
    slideButtons: [
        {
            text: '删除',
            type: 'warn'
        }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

    console.log(app.globalData.store_id,'app.globalData.store_id')
this.getBusinessRoomList()
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
  
  slideButtonTap(e) {
    console.log('slide button tap', e)
    let params={
      user_code: app.globalData.userCode,
      store_id:app.globalData.storeId,
      id:e.currentTarget.dataset.id
    }
    wx.request({
      url: this.data.businessDeleteRoom,
      method: 'POST',
      data:params,
      header:{
        token:app.globalData.token
      },
      //使用箭头函数 不然会报 Cannot read property 'setData' of undefined
      success: (res) => {
      
        wx.hideLoading()
        console.log('门店',res)
        if(res.data.status){
    
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'error',
            duration: 2000
          })
        }
      },
     
      fail(){
        wx.hideLoading()
        wx.showToast({
          title: '网络连接错误，请稍后重试',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },
  //获取店铺
  getBusinessRoomList(){
    let params={
      user_code: app.globalData.userCode,
      store_id:app.globalData.storeId
    }
    wx.request({
      url: this.data.businessRoomList,
      method: 'POST',
      data:params,
      header:{
        token:app.globalData.token
      },
      //使用箭头函数 不然会报 Cannot read property 'setData' of undefined
      success: (res) => {
      
        wx.hideLoading()
        console.log('门店',res)
        if(res.data.status){
          this.setData({
            room_list: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'error',
            duration: 2000
          })
        }
      },
     
      fail(){
        wx.hideLoading()
        wx.showToast({
          title: '网络连接错误，请稍后重试',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },
  //进入详情修改页
  detail_add_router(e){
    console.log(e,'e')

    wx.navigateTo({
        url: '../addRoom/index',
        events: {},
        success: function (res) {
          res.eventChannel.emit('detai_data',e.currentTarget.dataset.room)
        }
      })
  },
  lower(){
    
  }
})