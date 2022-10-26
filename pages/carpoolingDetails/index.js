// pages/carpoolingDetails/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_file_url: app.globalData.baseUrl,
    businessHostList: app.globalData.baseUrl + app.globalData.urlData.businessHostList,
    recordDetail:app.globalData.baseUrl + app.globalData.urlData.recordDetail,
    cancelAppointment:app.globalData.baseUrl + app.globalData.urlData.cancelAppointment,
    acceptAppointment:app.globalData.baseUrl + app.globalData.urlData.acceptAppointment, 
    addOffline:app.globalData.baseUrl + app.globalData.urlData.addOffline,
    dialogShowAddPlay:false,
    dialogShowRefuse:false,
    buttonsD: [{text: '取消'}, {text: '确定'}],
    refuseTitle:'不接单',
    reason:'生意火爆，暂无空场',
    schoolboy:0,
    schoolgirl:0,
    schoolboyMax:0,
    schoolgirlMax:0,
    sub_count:0,
    lockVisible:false,
    DMVisible:false,
    DMValue:'',
    DMLabel:'',
    DMList: [
      { label: '张三1', value: '张三1' },
      { label: '张三2', value: '张三2' },
      { label: '张三3', value: '张三3' },
    ],
    dateVisible:false,
    date:'',
    start:'',
    end:'',
    timeVisible1:false,
    timeVisible2:false,
    time1:'',
    time2:'',
    queryJson:{
      user_code:'',
      appointment_id:''
    },
    detaildata:{},
    Tipsuccess1:false,
    Tipsuccess2:false,
    Tiperror1:false,
    Tiperror2:false,
    Tiperror2Text:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置接单锁车日期
    let date=new Date()
    // let day=date.toLocaleDateString()
    // let dayF=day.split("/").join('-')
    let day=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()

    this.setData({
      'queryJson.appointment_id':options.id,
      date:day
    })
    // 大概需要建立WebSocket链接
    this.getRecordDetail()
    this.getBusinessHostList()
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
  openAddPlayer(){
    // console.log(this.data.detaildata.status)
    this.setData({
      dialogShowAddPlay:true
    })
  },
  tapDialogButtonAdd(e) {
    if(e.detail.index==1){
      // Message.success({
      //   offset: [20, 32],
      //   duration: 5000,
      //   content: '退款成功，用户将在24小时内收到退款',
      // });
      this.addOfflinePlayer()
    }
    this.setData({
      dialogShowAddPlay: false,
    })
  },
  // 注意同步女生人数最大值
  schoolboyChange(e){
    const { value } = e.detail;
    this.setData({
      schoolboy:value,
      schoolgirlMax:this.data.sub_count-value
    });
  },
  schoolgirlChange(e){
    const { value } = e.detail;
    this.setData({
      schoolgirl:value,
      schoolboyMax:this.data.sub_count-value
    });
  },
  delPlayer(){
    console.log('长按删除')
  },
  // 带上id去详情页
  toReservationInformation(e){
    let id=e.currentTarget.dataset.id
    let page='/pages/reservationInformation/index';
    wx.navigateTo({
      url: page+'?id='+id,
    })
  },
  openRefuse(e){
    console.log(e)
    let title=e.currentTarget.dataset.title
    this.setData({
      refuseTitle:title,
      reason:'生意火爆，暂无空场',
      dialogShowRefuse:true
    })
  },
  formInputChange(e){
    // const {field} = e.currentTarget.dataset
    this.setData({
        // [`formData.${field}`]: e.detail.value
        reason:e.detail.value,
    })
  },
  tapDialogButtonRefuse(e){
    if(e.detail.index==1){
      // console.log(this.data.reason)
      if(this.data.refuseTitle=='不接单'){
        this.setCancelAppointment()
      }else{
        console.log('我要流车')
        // this.setCancelAppointment()
      }
    }
    this.setData({
      dialogShowRefuse: false,
    })
  },
  receiving(){
    console.log('接单了')
  },
  // 锁车
  lock(){
    this.setData({
      lockVisible:true
    })
  },
  closeLock(){
    this.setData({
      lockVisible:false
    })
  },
  onLockVisibleChange(e) {
    this.setData({
      lockVisible: e.detail.visible,
    });
  },
  // 主持人and其他
  showDMVisible(){
    this.setData({
      DMVisible:true
    })
  },
  onDMPickerChange(e){
    this.setData({
      DMValue:e.detail.value[0],
      DMLabel:e.detail.label[0],
    })
  },
  showDateVisible(){
    this.setData({
      dateVisible:true
    })
  },
  showTimeVisible1(){
    this.setData({
      timeVisible1:true
    })
  },
  showTimeVisible2(){
    this.setData({
      timeVisible2:true
    })
  },
  onDateConfirm(e){
    const {value}=e.detail
    this.setData({
      date:value
    })
  },
  onTime1Confirm(e){
    const {value}=e.detail
    this.setData({
      time1:value
    })
  },
  onTime2Confirm(e){
    const {value}=e.detail
    this.setData({
      time2:value
    })
  },
  // 获取记录详情
  getRecordDetail(){
    wx.showLoading({
      title: '加载中',
    })
    let queryJson = this.data.queryJson
    // queryJson.store_id = app.globalData.storeId
    queryJson.user_code = app.globalData.userCode
    // queryJson.page = page
    //默认全部 根据状态过滤订单
    // if(this.data.orderState==='0'){
    //   queryJson.status=null
    // }else{
      // queryJson.status=this.data.orderState
    // }
  

    wx.request({
      url: this.data.recordDetail,
      method: 'POST',
      data:queryJson,
      header:{
        token:app.globalData.token
      },
      success:(res)=>{
        wx.hideLoading()
        console.log('拼场信息',res)
        if(res.data.status){
          this.setData({
            detaildata:res.data.data,
            sub_count:res.data.data.sub_count||0,
            schoolboyMax:res.data.data.sub_count||0,
            schoolgirlMax:res.data.data.sub_count||0,
          })
          // 调用设置标题方法
          this.setTitle(res.data.data.status)
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
  // 拒绝接单
  setCancelAppointment(){
    wx.showLoading({
      title: '加载中',
    })
    let queryJson = {}
    queryJson.user_code = app.globalData.userCode
    queryJson.appointment_id = this.data.queryJson.appointment_id
    queryJson.cancel_cause = this.data.reason
    wx.request({
      url: this.data.cancelAppointment,
      method: 'POST',
      data:queryJson,
      header:{
        token:app.globalData.token
      },
      success:(res)=>{
        wx.hideLoading()
        if(res.data.status){
          this.setData({
            Tiperror2:true,
            'detaildata.status':5,
            Tiperror2Text:queryJson.cancel_cause
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
  // 接单
  setAcceptAppointment(){
    wx.showLoading({
      title: '加载中',
    })
    let queryJson = {}
    queryJson.user_code = app.globalData.userCode
    queryJson.appointment_id = this.data.queryJson.appointment_id
    wx.request({
      url: this.data.acceptAppointment,
      method: 'POST',
      data:queryJson,
      header:{
        token:app.globalData.token
      },
      success:(res)=>{
        wx.hideLoading()
        if(res.data.status){
          this.setData({
            Tipsuccess1:true,
            'detaildata.status':1
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
  // 添加线下玩家
  addOfflinePlayer(){
    wx.showLoading({
      title: '加载中',
    })
    let queryJson = {}
    queryJson.user_code = app.globalData.userCode
    queryJson.appointment_id = this.data.queryJson.appointment_id
    queryJson.male = this.data.schoolboy
    queryJson.female = this.data.schoolgirl
    wx.request({
      url: this.data.addOffline,
      method: 'POST',
      data:queryJson,
      header:{
        token:app.globalData.token
      },
      success:(res)=>{
        wx.hideLoading()
        if(res.data.status){
          // 修改人数与添加按钮状态
          // this.setData({
          //   'detaildata.sub_count':''
          // })
          // 太麻烦了我决定刷新数据
          this.getRecordDetail()
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
  // 获取主持人列表
  getBusinessHostList(){
    let params={
      user_code: app.globalData.userCode,
      store_id:app.globalData.storeId,
      page:1,
      page_size:20,
      phone_number:''
    }
    wx.request({
      url: this.data.businessHostList,
      method: 'POST',
      data:params,
      header:{
        token:app.globalData.token
      },
      //使用箭头函数 不然会报 Cannot read property 'setData' of undefined
      success: (res) => {
      
        wx.hideLoading()
        if(res.data.code === 200){
          res.data.data.forEach((v)=>{
            v.label=v.name
            v.value=v.id
          })
          this.setData({
            DMList: res.data.data
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
  // 设置标题的方法
  setTitle(status){
    // status
    // 0         待接单      拼车中
    // 1         已接单      拼车中
    // 2         待锁车      拼车中
    // 3         已锁车      已锁车
    // 4         流车        已流车
    // 5         拼车失败    已流车
    switch (status) {
      case 0:
        wx.setNavigationBarTitle({
          title: '拼车中'
        })
        break;
      case 1:
        wx.setNavigationBarTitle({
          title: '拼车中'
        })
        break;
      case 2:
        wx.setNavigationBarTitle({
          title: '拼车中'
        })
        break;
      case 3:
        wx.setNavigationBarTitle({
          title: '已锁车'
        })
        break;
      case 4:
        wx.setNavigationBarTitle({
          title: '已流车'
        })
        break;
      case 5:
        wx.setNavigationBarTitle({
          title: '已流车'
        })
        break;
    
      default:
        wx.setNavigationBarTitle({
          title: '拼车中'
        })
        break;
    }
  }
})