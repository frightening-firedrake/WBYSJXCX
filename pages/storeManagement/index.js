// pages/storeManagement/index.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_file_url: app.globalData.baseUrl,

    businessStoreList: app.globalData.baseUrl + app.globalData.urlData.businessStoreList,
    store_list:[],
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
this.getStoreList()
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
  // onShareAppMessage() {

  // },
  
  slideButtonTap(e) {
    console.log(e,'e')
    console.log('slide button tap', e.detail)
  },
  //获取店铺
  getStoreList(){
    
    wx.request({
      url: this.data.businessStoreList,
      method: 'POST',
      data:{
        user_code: app.globalData.userCode
      },
      header:{
        token:app.globalData.token
      },
      //使用箭头函数 不然会报 Cannot read property 'setData' of undefined
      success: (res) => {
      
        wx.hideLoading()
        console.log('门店',res)
        if(res.data.code === 200){
          this.setData({
            store_list: res.data.data
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
  
  lower(){
    
  }
})