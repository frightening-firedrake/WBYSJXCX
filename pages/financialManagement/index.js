// pages/financialManagement/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessStoreList: app.globalData.baseUrl + app.globalData.urlData.businessStoreList,
    businessFinaceList: app.globalData.baseUrl + app.globalData.urlData.businessFinaceList,
    store_list:[],
    financial_list:[],
    startDate: '2022-07-16',
    endDate: '2022-07-27',
    storeValue: '',
    storeAccounts: ["门店一", "门店二", "门店三"],
    filterShow: false,
    storeShow: false,
    queryJson:{
      user_code:'',
      page:1,
      page_size:56,
      store_id:null,
      phone_number:null,
      define_time:[]
      }
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
    this.getBusinessStoreList()
    this.getFinanciaList(1)
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
  bindStartDateChange(detail) {
    this.setData({
      startDate:detail.detail.value
    })
  },
  bindEndChange(detail) {
    this.setData({
      endDate:detail.detail.value
    })
  },
  filterBtn(){
    console.log(this.data.filterShow)
    this.setData({
      filterShow: !this.data.filterShow
    })
  },
  selectStore(){
    this.setData({
      storeShow: !this.data.storeShow
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
              store_list: res.data.data
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
    //获取财务列表
    getFinanciaList(page){
    
      wx.showLoading({
        title: '加载中',
      })
      let queryJson = this.data.queryJson
      queryJson.user_code = app.globalData.userCode
      queryJson.page = page
      this.setData({
        queryJson: queryJson
      })
      wx.request({
        url: this.data.businessFinaceList,
        method: 'POST',
        data:queryJson,
        header:{
          token:app.globalData.token
        },
        success:(res)=>{
          wx.hideLoading()
          console.log('剧本',res)
          if(res.data.code === 200){
            this.setData({
              financial_list: res.data.data
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
    //侧边筛选选择门店
    change_store(e){

      let store_data=e.currentTarget.dataset.store;
      
      this.setData(
        {
         ['queryJson.store_id']:store_data.store_id,
  
        }
      )
      this.setData(
        {       storeValue:store_data.title}
      )
  

    },
    //侧边过滤
    financia_filter(){
      this.setData({
        ['queryJson.define_time']:[this.data.startDate,this.data.endDate]
      })
     this.getFinanciaList(1)
      this.setData({
        filterShow: false
      })
    },
  lower(e){
    console.log(e)
  }
})