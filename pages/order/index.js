// pages/order/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderState: '0',
    base_file_url: app.globalData.baseUrl,
    dataList:[],
    businessAppointmentList:  app.globalData.baseUrl + app.globalData.urlData.businessAppointmentList,
    queryJson: {
      store_id: '',
      page_size:20,
      page: 1,
      status:null,
      user_code: ''
    },
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
    this.getOrderList(1)
    // if(typeof this.getTabBar === 'function' && this.getTabBar()){
    //   this.getTabBar().setData({
    //     selected: 3
    //   })
    // }
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
  changeState(e) {
    console.log(e)
    this.setData({
      orderState: e.currentTarget.dataset.index
    })
    this.getOrderList(1)
  },
  //获取订单
  getOrderList(page){

    wx.showLoading({
      title: '加载中',
    })
    let queryJson = this.data.queryJson
    queryJson.store_id = app.globalData.storeId
    queryJson.user_code = app.globalData.userCode
    queryJson.page = page
    //默认全部 根据状态过滤订单
    if(this.data.orderState==='0'){
      queryJson.status=null
    }else{
      queryJson.status=this.data.orderState
    }
  

    wx.request({
      url: this.data.businessAppointmentList,
      method: 'POST',
      data:queryJson,
      header:{
        token:app.globalData.token
      },
      success:(res)=>{
        wx.hideLoading()
        console.log('剧本',res)
        if(res.data.status){
          this.setData({
            dataList: res.data.data
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
  lower(e){
    console.log('上拉到底部加载下一页')
  },
  shareOrderHandle(){
    wx.navigateTo({
      url: '../orderToday/index',
    })
  },
  searchScriptName(e){
    // this.setData({
    //   'queryJson.phone_number': e.detail.value
    // })
    // this.getOrderList(1)
  }
})