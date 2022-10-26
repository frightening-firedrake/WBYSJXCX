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
    storeId: '',
    logo:'',
    storeTitle:"请选择门店",
    storePickerVisible:false,
    userInfo: {},
    hasUserInfo: false,

  }, 
  // onShareAppMessage (res) {
    
  // },
  // 这生命周期把我整的都吐了
  pageLifetimes: {
    show: function() {
      console.log('组件show')
      this.getBusinessStoreList();
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
//   ready: function (options) {
//  this.getBusinessStoreList();

//   },
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
      let logo
      this.data.storeRangeList.forEach((v)=>{
        if(v.store_id==event.detail.value[0]){
          logo=app.globalData.baseUrl+v.store_cover
        }
      })
      this.setData(
        {   
          storeTitle:event.detail.label[0],
          storeId: event.detail.value[0],
          logo:logo
        }
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
             // 判断全局店铺id有的话通过id过滤title没有取数组第一项
            if(app.globalData.storeId){
              let shop=res.data.data.filter((v)=>{
                return v.store_id==app.globalData.storeId
              })
              console.log(shop)
              this.data.storeTitle=shop[0].title
              this.data.logo=app.globalData.baseUrl+shop[0].store_cover

            }else{
              this.data.storeTitle=res.data.data[0].title
              this.data.logo=res.data.data[0].store_cover
            }
            console.log(res.data)
            console.log(this)
            console.log(app.globalData.storeId)
            console.log('魔镜告诉我店铺id是多少',this.data.storeTitle)
            this.setData({
              storeRangeList: res.data.data,
              storeTitle: this.data.storeTitle,
              logo: this.data.logo
            })
            // console.log('店铺ID获取前',app.globalData.storeId)
            app.globalData.storeId =app.globalData.storeId|| res.data.data[0].store_id
            this.setData({
              storeId: app.globalData.storeId,
            })
            // console.log('店铺ID获取修改',app.globalData.storeId)
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
