// pages/storeManagement/index.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_file_url: app.globalData.baseUrl,
    queryJson: {
      store_id: '',
      page_size:20,
      page: 1,
      user_code:'',
      phone_number:''
    },
    businessMemberList: app.globalData.baseUrl + app.globalData.urlData.businessMemberList,
    member_list:[],
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
this.getBusinessMemberList()
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
    console.log('slide button tap', e.detail)
  },
  //获取店铺会员
  getBusinessMemberList(){
    let params={
      user_code: app.globalData.userCode,
      store_id:app.globalData.storeId,
      page:1,
      page_size:20,
      phone_number:''
    }
    wx.request({
      url: this.data.businessMemberList,
      method: 'POST',
      data:params,
      header:{
        token:app.globalData.token
      },
      //使用箭头函数 不然会报 Cannot read property 'setData' of undefined
      success: (res) => {
      
        wx.hideLoading()
        console.log('门店',res)
        if(res.data.code === 200){
          this.setData({
            member_list: res.data.data
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
  levelsLinkTo(){
    wx.navigateTo({
      url: '../memberLevels/index',
    })
  },
  lower(){
    
  }
})