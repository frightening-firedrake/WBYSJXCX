// pages/orderDetail/index.js
const app = getApp()
import Message from 'tdesign-miniprogram/message/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_file_url: app.globalData.baseUrl,
    businessAppointmentDetail: app.globalData.baseUrl + app.globalData.urlData.businessAppointmentDetail,
    order_detail_id: '', //主页面传递过来的订单id
    order_detail: {}, //接口请求回来的订单详情
    dialogShowTK:false,
    dialogShowTKN:false,
    buttonsTK: [{text: '取消'}, {text: '确定'}],
    priceTK:'',
    reason:'',
  },
  openDialogTK: function () {
      this.setData({
        dialogShowTK: true
      })
  },
  tapDialogButtonTK(e) {
    if(e.detail.index==1){
      Message.success({
        offset: [20, 32],
        duration: 5000,
        content: '退款成功，用户将在24小时内收到退款',
      });
    }
    this.setData({
      dialogShowTK: false,
    })
  },
  // 同步修改表单字段数据
  formInputChange(e) {
    console.log('同步中')
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      field: e.detail.value
    })
  },
  onChangeTKFS(e){
    console.log(e.detail.value)
    if(e.detail.value=='all'){
      this.setData({
        priceTK:''
      })
    }
  },
  openDialogTKN: function () {
    this.setData({
      dialogShowTKN: true
    })
  },
  tapDialogButtonTKN(e) {
    if(e.detail.index==1){
      // Message.success({
      //   offset: [20, 32],
      //   duration: 5000,
      //   content: '退款成功，用户将在24小时内收到退款',
      // });
    }
    this.setData({
      dialogShowTKN: false,
    })
  },
  phoneCall(e){
    let phonenumber=e.currentTarget.dataset.phonenumber
    if(phonenumber){
      wx.makePhoneCall({
        phoneNumber: phonenumber
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options,'options')
    this.setData({
      order_detail_id: options.id
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
this.getbusinessAppointmentDetail()
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
  //获取订单详情
  getbusinessAppointmentDetail() {
    wx.request({
      url: this.data.businessAppointmentDetail,
      method: 'POST',
      data: {
        appointment_id: this.data.order_detail_id,
        user_code: app.globalData.userCode
      },
      header: {
        token: app.globalData.token
      },
      success: (res) => {
        wx.hideLoading()

        if (res.data.code === 200) {
          this.setData({
            order_detail: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'error',
            duration: 2000
          })
        }
      },
      fail() {
        wx.hideLoading()
        wx.showToast({
          title: '网络连接错误，请稍后重试',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },
}
)