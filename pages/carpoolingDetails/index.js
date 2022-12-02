// pages/carpoolingDetails/index.js
const app = getApp()
import Message from 'tdesign-miniprogram/message/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    players:'',
    playersId:'',
    error:'',
    base_file_url: app.globalData.baseUrl,
    businessHostList: app.globalData.baseUrl + app.globalData.urlData.businessHostList,//主持人
    businessRoomList: app.globalData.baseUrl + app.globalData.urlData.businessRoomList,//房间
    checkDate: app.globalData.baseUrl + app.globalData.urlData.checkDate,//校验时间段
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
    roomVisible:false,
    roomValue:'',
    roomLabel:'',
    roomList: [
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
    // 大概不需要建立WebSocket链接
    this.getRecordDetail()
    this.getBusinessHostList()
    this.getBusinessRoomList()
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
  // 踢出未付款玩家
  delPlayer(e){
    // console.log('长按删除',e.currentTarget.dataset)
    const {id}=e.currentTarget.dataset
    // console.log(id)
    this.setData({
      playersId:id,
      dialogShowDel:true
    })
  },
  tapDialogButtonDel(e){
    if(e.detail.index==1){
      console.log(this.data.playersId)
      // 调用删除接口
    }
    this.setData({
      dialogShowDel: false,
    })
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
        this.setCancelAppointment(5)
      }else{
        console.log('我要流车')
        this.setCancelAppointment(4)
      }
    }
    this.setData({
      dialogShowRefuse: false,
    })
  },
  // fuck接单换锁车真6
  receiving(){
    console.log('接单了')
    this.setData({
      lockVisible:true
    })
  },
  // 锁车
  lock(){
    console.log('锁车了')
    // console.log(this.data.detaildata.sub_count)
    if(this.data.detaildata.sub_count){
      Message.warning({
        context: this,
        offset: [20, 32],
        duration: 2000,
        content: '当拼车人数满足条件时可锁车',
      });
    }else{
      this.setData({
        dialogShowLock:true
      })
    }
  },
  tapDialogButtonLock(e){
    if(e.detail.index==1){
      console.log('锁车')
      // 调用锁车接口
    }
    this.setData({
      dialogShowLock: false,
    })
  },
  // 效验表单项
  lockOn(){
    // 主持人，房间，日期，时间
    const {DMLabel,DMValue,roomLabel,roomValue,date,time1}=this.data
    
    if(!roomLabel){
      this.setData({
        error: '请选择房间'
      })
      return
    }
    if(!date){
      this.setData({
        error: '请选择拼车日期'
      })
      return
    }
    if(!time1){
      this.setData({
        error: '请选择拼车开始时间'
      })
      return
    }
    if(!DMLabel){
      this.setData({
        error: '请选择主持人'
      })
      return
    }
    console.log('表单可提交')
    // console.log(DMValue,roomValue,date,time1)
    this.setAcceptAppointment(DMValue,roomValue,date,time1)
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
  // 房间
  showRoomVisible(){
    this.setData({
      roomVisible:true
    })
  },
  onDMPickerChange(e){
    this.setData({
      DMValue:e.detail.value[0],
      DMLabel:e.detail.label[0],
    })
  },
  onRoomPickerChange(e){
    this.setData({
      roomValue:e.detail.value[0],
      roomLabel:e.detail.label[0],
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
  setCancelAppointment(status){
    wx.showLoading({
      title: '加载中',
    })
    let queryJson = {}
    queryJson.user_code = app.globalData.userCode
    queryJson.appointment_id = this.data.queryJson.appointment_id
    queryJson.cancel_cause = this.data.reason
    queryJson.status=status
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
          // status 5拒绝 4流车
          if(status==5){
            this.setData({
              Tiperror2:true,
              'detaildata.status':5,
              Tiperror2Text:queryJson.cancel_cause
            })
          }else if(status==4){
            this.setData({
              Tiperror2:true,
              'detaildata.status':4,
              Tiperror2Text:queryJson.cancel_cause
            })
          }
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
  // 接单
  setAcceptAppointment(DMValue,roomValue,date,time1){
    wx.showLoading({
      title: '加载中',
    })
    let queryJson = {}
    queryJson.user_code = app.globalData.userCode
    queryJson.appointment_id = this.data.queryJson.appointment_id
    queryJson.dm_id = DMValue
    queryJson.appointment_date = date
    queryJson.appointment_time = time1
    queryJson.room_number = roomValue
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
            lockVisible:false,
            'detaildata.status':1
          })
          Message.success({
            context: this,
            offset: [20, 32],
            duration: 3000,
            content: '接单成功',
          });
          let that=this
          setTimeout(function(){
            that.getRecordDetail()
          },3000)
          // wx.navigateBack()
        } else {
          // wx.showToast({
          //   title: res.data.msg,
          //   icon: 'error',
          //   duration: 2000
          // })
          this.setData({
            error:res.data.msg
          })
          // Message.error({
          //   context: this,
          //   offset: [20, 32],
          //   duration: 2000,
          //   content: res.data.msg,
          // });
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
  setAcceptAppointment2(){
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
  // 获取房间列表
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
      success: (res) => {
        wx.hideLoading()
        if(res.data.status){
          res.data.data.forEach((v)=>{
            v.label=v.room_name
            v.value=v.room_code
          })
          this.setData({
            roomList: res.data.data
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
  },
  makePhoneCall(e){
    // let phone=
    // console.log(e.currentTarget.dataset.phone)
      let phonenumber=e.currentTarget.dataset.phone;
      if(phonenumber){
        wx.makePhoneCall({
          phoneNumber:phonenumber
        })
      }
  }
})