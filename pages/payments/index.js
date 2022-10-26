// pages/payments/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessStoreList: app.globalData.baseUrl + app.globalData.urlData.businessStoreList,
    businessScriptList: app.globalData.baseUrl + app.globalData.urlData.businessScriptList,

    storeRangeList: [{
        store_id: '555',
        title: '门店'
      },
      {
        store_id: '5055',
        title: '门店'
      }
    ],
    payment_data:{
      store_id:'',//店铺id
      script_code:'',//剧本id
      price:'45',//价格
      desc:''//备注
    }
    ,
    dataList: [],
    storeDate: 0,
    storeIndex: 0,
    storeId: '',
    storeTitle:"请选择门店",
    storePickerVisible:false,
    ScriptIndex: 0,
    store_id: null,
    queryJson: {
      store_id: '',
      page_size: 20,
      page: 1,
      query_name: '',
      script_person: '',
      script_difficulty: '',
      subject_type: '',
      duration: '',
      user_code: ''
    },
    scriptName: ''
  },
  showStorePicker(){
    this.setData({
      storePickerVisible:!this.data.storePickerVisible
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('444',options)
    this.setData({
      scriptName: decodeURIComponent(options.scriptName),
      ['payment_data.script_code']:options.scriptCode,
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
    this.getBusinessStoreList()
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
  //获取店铺
  getBusinessStoreList() {

    wx.request({
      url: this.data.businessStoreList,
      method: 'POST',
      data: {
        user_code: app.globalData.userCode
      },
      header: {
        token: app.globalData.token
      },
      //使用箭头函数 不然会报 Cannot read property 'setData' of undefined
      success: (res) => {
        res.data.data.forEach((v)=>{
          v.label=v.title
          v.value=v.store_id
        })
        wx.hideLoading()
        console.log('门店', res)
        if (res.data.code === 200) {
          let shop=[];
          if(app.globalData.storeId){
            shop=res.data.data.filter((v)=>{
              return v.store_id==app.globalData.storeId
            })
            this.data.storeTitle=shop[0].title
          }else{
            this.data.storeTitle=res.data.data[0].title
          }
          this.setData({
            storeRangeList: res.data.data,
            storeTitle: this.data.storeTitle
          })
          app.globalData.storeId =app.globalData.storeId|| res.data.data[0].store_id
          this.setData({
            storeId: app.globalData.storeId,
            store_id: app.globalData.storeId,
            ['payment_data.store_id']: app.globalData.storeId,
          })


          this.getData()
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
  //选择店铺事件，查看该店铺下的信息，每次选择店铺 从新请求一下数据
  bindStoreChange(event) {
    let choose_store_index = event.detail.value
    this.setData({
      storeIndex: choose_store_index
    })
    this.getData()
  },
  onStorePickerChange(event){
    // console.log(event)
    this.setData(
      {   
        storeTitle:event.detail.label[0],
        storeId: event.detail.value[0],
        store_id: event.detail.value[0],
        ['payment_data.store_id']:event.detail.value[0],
      })
    
    //重新获取数据 
    this.getData()
  },
//选择剧本事件
  bindScriptChange(event) {
    let choose_store_index = event.detail.value
    console.log(choose_store_index,'choose_store_index')
    this.setData({
      ScriptIndex: choose_store_index
    })
    for (let j = 0, lenJ =this.data.dataList.length; j < lenJ; ++j) {
      console.log(j,'j')
      if(parseInt(choose_store_index)===j){
        let script_data=this.data.dataList[choose_store_index]
        let script_code=script_data.script_code
        let price=script_data.publish_price
        this.setData({
          ['payment_data.price']:price,
          ['payment_data.script_code']:script_code,
        })
      }
    }

  },
  
  //获取剧本
  getData() {

    wx.showLoading({
      title: '加载中',
    })
    //先弄为空 ? 再拉下一页就为空了


    let queryJson = this.data.queryJson
    queryJson.store_id = this.data.store_id
    queryJson.user_code = app.globalData.userCode
    this.setData({
      queryJson: queryJson
    })
    wx.request({
      url: this.data.businessScriptList,
      method: 'POST',
      data: queryJson,
      header: {
        token: app.globalData.token
      },
      success: (res) => {
        wx.hideLoading()
        console.log('剧本', res)
        if (res.data.code === 200) {
          
          this.setData({
            dataList: res.data.data,
            ['payment_data.script_code']: res.data.data[0].script_code,
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
  //保存跳转二维码页面
  submitForm(e) {
    let that =this
    that.data.payment_data.storeTitle=that.data.storeTitle
    let shop=that.data.storeRangeList.filter((v)=>{
        return v.store_id==that.data.storeId
      })
    that.data.payment_data.logo=app.globalData.baseUrl+shop[0].store_cover

    wx.navigateTo({
      url: '../qrcode/index',
      events: {},
      success: function (res) {
        res.eventChannel.emit('payment_data',that.data.payment_data)
      }
    })

  },

  //输入框事件
  formInputChange(e){
    const {filed} = e.currentTarget.dataset
    this.setData({
        [`payment_data.${filed}`]: e.detail.value
    })
  },
})