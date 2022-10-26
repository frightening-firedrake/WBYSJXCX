// pages/login/index.js.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginUrl: app.globalData.baseUrl + app.globalData.urlData.login,
    getcode: app.globalData.baseUrl + app.globalData.urlData.getcode,
    formData: {
      phone: '15392518888',
      verification_code: '123456'
    },
    isAgree:true,
    times: 60,
    timesShow: false,
    rules: [{
        name: 'phone',
        rules: [{required: true, message: '请输入手机号'}, {mobile: true, message: '手机号格式不对'}],
    },{
        name: 'verification_code',
        rules: {required: true, validator: function(rule, value, param, modeels) {
          if (!value) {
            return '请输入验证码'
          }else if( value.length !== 6 ) {
            return '验证码输入错误'
          }
        }},
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },
  formInputChange(e){
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  checkboxIsAgreeChange(e){
    console.log(555,e)
    this.setData({
      isAgree: e.detail.value[0]
    })
  },
  getVCode(e){
    this.getvCodeRequest()
  },
  getvCodeRequest(){
    if(this.data.formData.phone===''){
      this.setData({
        error: '请输入手机号'
      })
      return
    } else if(!this.isPhoneAvailable(this.data.formData.phone)) {
      this.setData({
        error: '手机号格式不对'
      })
      return
    }
    this.setData({
      timesShow: true
    })
    this.getTimes()
    wx.request({
      url: this.data.getcode,
      method: 'POST',
      data:{
        phone: this.data.formData.phone
      },
      success (res) {
        if(res.data.code === 200){
          wx.showToast({
            title: '验证码发送成功',
            icon: 'success'
          })
        }else {
          this.setData({
            error: res.data.msg
          })
        }
      }
    })
  },
  isPhoneAvailable(str){  
    var myreg=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;  
    if (!myreg.test(str)) {  
        return false;  
    } else {  
        return true;  
    }  
  },
  getTimes(){
    let time = setInterval(()=>{
      this.setData({
        times: this.data.times-1
      })
      if(this.data.times===0){
        this.setData({
          times: 60,
          timesShow: false
        })
        clearInterval(time)
      }
    },1000)
  },
  //点击登录
  loginBtn(){
    this.selectComponent('#loginForm').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
            this.setData({
              error: errors[firstError[0]].message
            })
          }
      } else {
        console.log(this.data.isAgree)
        if(this.data.isAgree){
          this.loginRequest()
        } else {
          this.setData({
              error: '请阅读并勾选同意《用户协议》和《隐私政策》'
          })
        }
      }
    })
  },
  loginRequest(){
    console.log(this.data.formData)
    wx.request({
      url: this.data.loginUrl,
      method: 'POST',
      data: this.data.formData,
      success (res) {
        if(res.data.code === 200){
          app.globalData.token=res.data.data.access_token
          app.globalData.userCode=res.data.data.user_id
          wx.switchTab({
            url: '/pages/index/index'
          })
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'error',
            duration: 2000
          })
        }
      },
      fail(){
        wx.showToast({
          title: '网络连接错误，请稍后重试',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },
})