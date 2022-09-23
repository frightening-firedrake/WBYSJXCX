// index.js
// 获取应用实例
const app = getApp()

Component({
  data: {
    businessHome: app.globalData.baseUrl + app.globalData.urlData.businessHome,
    businessStoreList: app.globalData.baseUrl + app.globalData.urlData.businessStoreList,
 
    informationData:{},
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
    storeTitle:"请选择门店",
    storePickerVisible:false,
    userInfo: {},
    hasUserInfo: false,

  }, 
  onShareAppMessage (res) {
    
  },
  onShow(){
    this.getBusinessStoreList()

  },
  onReady(){
    
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  ready: function (options) {
 this.getBusinessStoreList();

  },
  methods:{
    showStorePicker(){
      this.setData({
        storePickerVisible:!this.data.storePickerVisible
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
    onStorePickerChange(event){
      // console.log(event)
      this.setData(
        {   storeTitle:event.detail.label[0]}
         )
      
      //修改全局store_id 
      app.globalData.storeId =event.detail.value[0]
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
          res.data.data.forEach((v)=>{
            v.label=v.title
            v.value=v.store_id
          })
          wx.hideLoading()
          console.log('门店',res)
          if(res.data.code === 200){
            this.setData({
              storeRangeList: res.data.data,
              storeTitle: res.data.data[0].title
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
  },


})
