// pages/order/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error:'',
    orderState: '0',
    base_file_url: app.globalData.baseUrl,
    dataList:[],
    future_success:{},
    // carpoolingRecord:  app.globalData.baseUrl + app.globalData.urlData.businessAppointmentList,
    carpoolingRecord:  app.globalData.baseUrl + app.globalData.urlData.carpoolingRecord,
    getConfig:  app.globalData.baseUrl + app.globalData.urlData.getConfig,
    queryJson: {
      store_id: '',
      
      // page_size:20,
      // page: 1,
      status:'',

      user_code: '',
      appointment_time:[],
      phone_number:'',
      // script_code:'',
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
      'queryJson.script_code':options.id
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
    this.getRecordList(1)
    this.getConfigList()
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
    this.getRecordList(1)
  },
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
  getConfigList(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: this.data.getConfig,
      method: 'POST',
      data:{
        sign:0
      },
      header:{
        token:app.globalData.token
      },
      success:(res)=>{
        console.log(res)
        wx.hideLoading()
        if(res.data.status){
          res.data.data.forEach((v)=>{
            v.label=v.name;
            v.value=v.id;
          })
          res.data.data.unshift({label:'全部',value:null})
          this.setData({
            statusList: res.data.data,
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
    // this.getRecordList(1)
  },
  changeTabState(e){
    this.setData({
      tabState: e.currentTarget.dataset.index
    })
    console.log('切换tab')
  },

  selectedDay(e){
    let year=e.detail.year;
    let month=e.detail.month;
    let day=e.detail.day;
    console.log('selectedDay',`${year}-${month}-${day}`)
    this.data.queryJson.appointment_time=[`${year}-${month}-${day}`]
    this.getRecordList()
  },
  filterBtn() {
    // wx.navigateTo({
    //   url: '../carpoolingRecordSearch/index?id='+this.data.queryJson.script_code,
    // })
    // console.log(this.data.filterShow)
    this.setData({
      filterShow: !this.data.filterShow
    })
    // wx.hideTabBar
  },
  name_filter(e) {
    this.setData({
      dataList: [],
      ['queryJson.page']: 1,
      ['queryJson.query_name']: e.detail.value,
    })
    this.getData()
  },
  //每输入一个字符就执行一次 
  //解决办法将view 改为button type 为submit
  input_name(e) {
    console.log(e, 'eeeee')
    this.setData({
      ['queryJson.query_name']: e.detail.value
    })
  },
  showDate1(){
    this.setData({
      dateVisible1:true
    })
  },
  showDate2(){
    this.setData({
      dateVisible2:true
    })
  },
  showDate3(){
    this.setData({
      dateVisible3:true
    })
  },
  showDate4(){
    this.setData({
      dateVisible4:true
    })
  },
  onDateConfirm1(e){
    console.log(e.detail.value)
    this.setData({
      dataXDS:e.detail.value,
    })
  },
  onDateConfirm2(e){
    this.setData({
      dataXDE:e.detail.value,
    })
  },
  onDateConfirm3(e){
    this.setData({
      dataYYS:e.detail.value,
    })
  },
  onDateConfirm4(e){
    this.setData({
      dataYYE:e.detail.value,
    })
  },
  start_filter(){
    // console.log('点击了筛选按钮')
    // 控制时间吗？没人说先不管了
    // if(this.data.dataXDS&&!this.data.dataXDE){

    // }
    // if(this.data.dataXDE&&!this.data.dataXDS){
      
    // }
    wx.navigateTo({
      url: '../carpoolingRecordScreen/index?id='+this.data.queryJson.script_code+'&status='+this.data.statusId+'&dataXDS='+this.data.dataXDS+'&dataXDE='+this.data.dataXDE,
    })
  },
  showStatus(){
    this.setData({
      statusVisible:true
    })
  },
  onStatusPickerChange(e){
    this.setData({
      status:e.detail.label[0],
      statusId:e.detail.value[0]
    })
    // console.log(e.detail.value[0])
    // console.log(this.data.statusId)
  },
  // 跳转去搜索页
  toSearch(){
    wx.navigateTo({
      url: '../carpoolingRecordSearch/index?id='+this.data.queryJson.script_code,
    })
  }
})