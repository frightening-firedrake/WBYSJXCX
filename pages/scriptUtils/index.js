// pages/storeManagement/index.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_file_url: app.globalData.baseUrl,
    businessHostList: app.globalData.baseUrl + app.globalData.urlData.businessHostList,
    businessDeleteHost: app.globalData.baseUrl + app.globalData.urlData.businessDeleteHost,
   link_list:[
    {
      name: '收款码',
      value: '../payments/index',
      query: true,
      link: true
    },
    {
      name: '房间设置',
      value: '../roomSettings/index',
      query: true,
      link: true
    },
    {
      name: '设置预约时间',
      value: '../setScriptTime/index',
      link: true
    }, 
    {
      name: '评价管理',
      value: '../evaluationManagement/index',
      link: true
    }, 
    {
      name: '店长评价',
      value: '../storeManagerEvaluation/index',
      link: true
    },
    
   ],
   script_data:{},
   roomNumber:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options,'op')
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.on('set_room', (data)=> {
    //   this.setData({
    //     roomNumber:data,
    //   })
    // })
    this.setData({
      ['script_data.script_code']:options.id,
      ['script_data.script_name']: decodeURIComponent(options.name),
      roomNumber:options.room_number,
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
  // onShareAppMessage() {

  // },
  detail_add_router(e){
   let link =e.currentTarget.dataset.link
   console.log(link)
   wx.navigateTo({
    url:link+`?scriptCode=${this.data.script_data.script_code}&scriptName=${this.data.script_data.script_name}&roomNumber=${this.data.roomNumber}`,
    success: function (res) {}
  })
  },
  lower(){
    
  },
  setRoomNumber(roomNumber){
    this.setData({
      roomNumber:roomNumber
    })
  },
})