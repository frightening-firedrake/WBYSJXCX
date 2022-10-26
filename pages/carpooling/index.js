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
    businessCarpooling:  app.globalData.baseUrl + app.globalData.urlData.businessCarpooling,
    queryJson: {
      store_id: '',
      page_size:20,
      page: 1,
      status:0,
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
    this.setData({
      dataList:[]
    })
    this.getCarpoolingList(1)
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
    // 改变状态时清空dataList
    this.setData({
      dataList:[],
      orderState: e.currentTarget.dataset.index
    })
    this.getCarpoolingList(1)
  },
  //获取拼车列表
  getCarpoolingList(page){

    wx.showLoading({
      title: '加载中',
    })
    let queryJson = this.data.queryJson
    queryJson.store_id = app.globalData.storeId
    queryJson.user_code = app.globalData.userCode
    queryJson.page = page
    //默认全部 根据状态过滤订单
    // if(this.data.orderState==='0'){
    //   queryJson.status=null
    // }else{
      queryJson.status=this.data.orderState
    // }
  

    wx.request({
      url: this.data.businessCarpooling,
      method: 'POST',
      data:queryJson,
      header:{
        token:app.globalData.token
      },
      success:(res)=>{
        wx.hideLoading()
        console.log('拼车列表',res)
        if(res.data.status){
          this.setData({
            // dataList: res.data.data
            dataList: [...this.data.dataList,...res.data.data]
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

    this.getCarpoolingList(this.data.queryJson.page+1)
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
    // this.getCarpoolingList(1)
  }
})