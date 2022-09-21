// index.js
// 获取应用实例
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
let chart = null
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  // var option = 
  // chart.setOption(option);
  return chart;
}
Page({
  data: {
    businessHome: app.globalData.baseUrl + app.globalData.urlData.businessHome,
    businessStoreList: app.globalData.baseUrl + app.globalData.urlData.businessStoreList,
    ec: {
      onInit: initChart
    },
    echartsOptions:{
      title: {
        show: false
      },
      legend: {
        data: ['订单', '金额'],
        top: 0,
        left: 'center',
        z: 100
      },
      grid: {
        containLabel: true,
        top: 50,
        right:'5%',
        bottom:'10%',
        left:'5%'
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        name: '订单',
        type: 'line',
        smooth: true,
        data: []
      }, {
        name: '金额',
        type: 'line',
        smooth: true,
        data: []
      }]
    },
    informationData:{},
    motto: 'Hello World',
    pickerShow:false,
    storeDate:0,
    storeRangeList:[
      {
        store_id: '555',
        title: '门店'
      },
      {
        store_id: '5055',
        title: '门店'
      }
    ],
    storeIndex: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  }, 
  onShareAppMessage (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  onShow(){
    this.getBusinessStoreList()
    // this.getData()
    // this.getTabBar().init();
  },
  onReady(){
    
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showPicker(){
    this.setData({
      pickerShow: true
    })
  },
  closePicker(){
    this.setData({
      pickerShow: false
    })
  },
  onLoad() {
   
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //选择店铺事件，查看该店铺下的信息，每次选择店铺 从新请求一下数据
  bindStoreChange(event){
    let choose_store_index=event.detail.value
    this.setData(
   {   storeIndex:choose_store_index}
    )
    //修改全局store_id 
    app.globalData.storeId =this.data.storeRangeList[this.data.storeIndex].store_id
    //重新获取数据 
    this.getData()
  },
  // 点击确定按钮
  StoreIsChange(){
    this.setData({
      pickerShow: false
    })
    //重新获取数据 
    this.getData()
  },
  //获取首页信息
  getData(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: this.data.businessHome,
      method: 'POST',
      data:{
        user_code: app.globalData.userCode,
        store_id: app.globalData.storeId// 如果不传这个表示所有店铺总和
      },
      header:{
        token:app.globalData.token
      },
      success:(res)=>{
        wx.hideLoading()
        console.log('首页',res)
        if(res.data.code === 200){
          this.setData({
            informationData: res.data.data
          })
          setTimeout(()=>{
            let options = this.data.echartsOptions
            options.series[0].data = res.data.data.week_order_count
            options.series[1].data = res.data.data.week_amount_count
            this.setData({
              echartsOptions: options
            })
            chart.setOption(this.data.echartsOptions);
            },500)
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
  //获取门店列表
  getBusinessStoreList(){
    
    wx.request({
      url: this.data.businessStoreList,
      method: 'POST',
      data:{
        user_code: app.globalData.userCode
      },
      header:{
        token:app.globalData.token
      },
      //使用箭头函数 不然会报 Cannot read property 'setData' of undefined
      success: (res) => {
      
        wx.hideLoading()
        console.log('门店',res)
        if(res.data.code === 200){
          this.setData({
            storeRangeList: res.data.data
          })
          app.globalData.storeId = res.data.data[0].store_id
          this.getData()
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
