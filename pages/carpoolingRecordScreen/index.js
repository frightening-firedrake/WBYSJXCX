// pages/carpoolingRecordScreen/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderState: '0',
    base_file_url: app.globalData.baseUrl,
    dataList:[],
    future_success:{},
    carpoolingRecord:  app.globalData.baseUrl + app.globalData.urlData.carpoolingRecord,
    getConfig:  app.globalData.baseUrl + app.globalData.urlData.getConfig,
    queryJson: {
      store_id: '',
      status:'',
      user_code: '',
      appointment_time:[],
      phone_number:'',
      script_code:'',
    },
    tabState:"1",
    calendarVisible: false,
    filterShow: false,
    dataXDS:'',
    dataXDE:'',
    dataYYS:'',
    dataYYE:'',
    dateVisible1: false,
    dateVisible2: false,
    dateVisible3: false,
    dateVisible4: false,
    start1:'',
    start2:'',
    start3:'',
    start4:'',
    end1:'',
    end2:'',
    end3:'',
    end4:'',
    status:'全部',
    statusId:'',
    statusVisible: false,
    statusList:[
      // {
      //   label:'拼车中',
      //   value:0,
      // },
      // {
      //   label:'拼车成功',
      //   value:1,
      // },
      // {
      //   label:'拼车失败',
      //   value:2,
      // },
      // {
      //   label:'已锁车',
      //   value:3,
      // },
      // {
      //   label:'流车',
      //   value:4,
      // },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      'queryJson.script_code':options.id,
      'queryJson.status':options.status,
      'queryJson.appointment_time':[options.dataXDS,options.dataXDE]
    })
    this.getRecordList(1)
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

  // }
  //获取约车记录
  getRecordList(page){

    wx.showLoading({
      title: '加载中',
    })
    let queryJson = this.data.queryJson
    queryJson.store_id = app.globalData.storeId
    queryJson.user_code = app.globalData.userCode
    // queryJson.page = page
    //默认全部 根据状态过滤订单
    // if(this.data.orderState==='0'){
    //   queryJson.status=null
    // }else{
    //   queryJson.status=this.data.orderState
    // }
  

    wx.request({
      url: this.data.carpoolingRecord,
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
            dataList: res.data.data.carpooling_record,
            future_success:res.data.data.future_success,
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
})