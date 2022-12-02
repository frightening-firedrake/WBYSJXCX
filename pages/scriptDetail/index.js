// pages/scriptDetail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollInto:'',
    error:'',
    shareMode:false,
    base_file_url: app.globalData.baseUrl,
    businessScriptDetail: app.globalData.baseUrl + app.globalData.urlData.businessScriptDetail,
    businessScriptChangePrice: app.globalData.baseUrl + app.globalData.urlData.businessScriptChangePrice,
    businessScriptPut: app.globalData.baseUrl + app.globalData.urlData.businessScriptPut,
    script_detail:{},
    // 剧本详情修改价格用
    script_detail_Price:{
      script_code: '',
      user_code: '',
      price: '',//价格
      discount: '',//折扣
      store_id: '',
    },
    typeItems: [{
        value: 0,
        name: '否'
      },
      {
        value: 1,
        name: '是'
      }
    ],
    script_code: '',
    // 下架弹窗
    dialogDownShow:false,
    // 上架与修改价格
    dialogShow:false,
    dialog_title:"",
    down_buttons: [{
      text: '取消',
      extClass: "cancle_btn"
    },
    {
      text: '确认',
      extClass: ""
    }
    ],
    // 修改价格时候的表单验证
    rules: [
      {
        name: 'price',
        // rules: [{required: true, message: '请输入价格'}, {min: 0, message: '请输入大于0的数字'}],
        rules: { validator: function(rule, value, param, models) {
          if (!value) {
            return '请输入价格'
          }
          if(isNaN(value)){
            return '请输入数字'
          }
          if(value<0){
            return '请输入大于0数字'
          }
        }},
      },{
        name: 'discount',
        rules: { validator: function(rule, value, param, models) {
          if (!value) {
            return '请输入折扣'
          }
          if(isNaN(value)){
            return '请输入数字'
          }
          if(value<0||value>1){
            return '请输入0到1的数字'
          }
        }},
      // },{
      //   name: 'script_code',
      //   rules: [{required: true}],
      // },{
      //   name: 'user_code',
      //   rules: [{required: true}],
      // },{
      //   name: 'store_id',
      //   rules: [{required: true}],
      }
    ],
    more:true,
    score:3,
  },
  onScoreChange(e) {
    const { score } = e.detail;
    this.setData({
      score,
    });
  },
  dialogHide(){
    this.setData({
      dialogShow: false,
    })
  },
  // 上架按钮点击弹窗
  buttonShowDialog(){
    this.setData({
      dialogShow: true,
      dialog_title:'上架剧本',
      ['script_detail_Price.price']: this.data.script_detail.publish_price,
      ['script_detail_Price.discount']: this.data.script_detail.discount,
      ['script_detail_Price.script_code']: this.data.script_detail.script_code,
      ['script_detail_Price.store_id']: app.globalData.storeId,
      ['script_detail_Price.user_code']: app.globalData.userCode,
    })
  },
  // 下架按钮点击弹窗
  buttonShowDialogDown(){
    this.setData({
      dialogDownShow: true,
    })
  },
  //下架弹框 俩按钮事件
  tapDialogDownButton(e) {
    if(e.detail.index==1){
      // console.log("确认")
      this.up_down_script(this.data.script_detail.script_code,0)
    }
    this.setData({
      dialogDownShow: false
    })
  },
  //编辑价格事件弹出
  editChange(e) {
    console.log(e)
    let script_data = e.currentTarget.dataset.scriptinfo
    this.setData({
      dialogShow: true,
      dialog_title:'修改价格',
      ['script_detail_Price.price']: script_data.publish_price,
      ['script_detail_Price.discount']: script_data.discount,
      ['script_detail_Price.script_code']: script_data.script_code,
      ['script_detail_Price.store_id']: app.globalData.storeId,
      ['script_detail_Price.user_code']: app.globalData.userCode,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options)
    // console.log(app.globalData)
    
    this.setData({
      script_code: options.id
    })
    // 判断进入方式为分享页面
    if(options.type=='share'){
      // wx.hideHomeButton()
      // script_detail
      const {id,store_id}=options
      this.setData({
        shareMode: true
      })
      app.globalData.storeId=store_id

      // this.data.script_detail=JSON.parse(options.script_detail)
      // console.log(this.data.script_detail)
      this.getScriptDetailOnShare(id,store_id)
    }else{
      this.setData({
        shareMode: false
      })
      this.getScriptDetail()
    }
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
  onShareAppMessage() {
    return {
      title: this.data.script_detail.script_name,
      // path: '/pages/scriptDetail/index?id='+this.data.script_code+'&store_id='+app.globalData.storeId+'&type=share&script_detail='+JSON.stringify(this.data.script_detail),
      path: '/pages/detailsSharing/index?id='+this.data.script_code+'&store_id='+app.globalData.storeId+'&type=share',
    }
  },
  // 分享朋友圈
  // onShareTimeline(){

  // },
  //获取剧本详情
  getScriptDetail() {
    wx.request({
      url: this.data.businessScriptDetail,
      method: 'POST',
      data: {
        script_code: this.data.script_code,
        store_id:app.globalData.storeId
      },
      header: {
        token: app.globalData.token
      },
      success: (res) => {
        wx.hideLoading()
 
        if (res.data.code === 200) {
          this.setData({
            script_detail: res.data.data
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
  // 分享模式的剧本详情获取
  getScriptDetailOnShare(id,store_id){
    wx.request({
      url: this.data.businessScriptDetail,
      method: 'POST',
      data: {
        script_code: id,
        store_id:store_id
      },
      header: {
        token: app.globalData.token
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.code === 200) {
          this.setData({
            script_detail: res.data.data
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
  //上下架剧本
  up_down_script(script_code,status){
    let params = {
      script_code:script_code,
      user_code: app.globalData.userCode,
      status: status,
      store_id: app.globalData.storeId,
    }
    wx.request({
      url: this.data.businessScriptPut,
      method: 'POST',
      data: params,
      header: {
        token: app.globalData.token
      },
      success: (res) => {
        wx.hideLoading()
        // console.log('剧本', res)
        if (res.data.status) {
          // this.setData({
          //   "script_detail.status":status
          // })
          this.getScriptDetail()
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
  // 同步修改表单字段数据
  formInputChange(e) {
    // console.log('同步中')
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`script_detail_Price.${field}`]: e.detail.value
    })
  },
  // 增加表单验证象price和discount
  check_change_price(){
    this.selectComponent('#form_change_price').validate((valid, errors) => {
      // console.log('valid', valid, errors)
      if (!valid) {
        console.log("验证失败")
          const firstError = Object.keys(errors)
          if (firstError.length) {
            this.setData({
              error: errors[firstError[0]].message
            })
          }
      } else {
        // console.log("验证成功")
          this.save_change_price()
      }
    })
  },
  //保存修改价格
  save_change_price() {
    console.log(this.data.script_detail_Price)
    // return
    wx.request({
      url: this.data.businessScriptChangePrice,
      method: 'POST',
      data: this.data.script_detail_Price,
      header: {
        token: app.globalData.token
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.status) {
          this.setData({
            dialogShow: false,
          //   ['script_detail.publish_price']: this.data.script_detail_Price.price,
          //   ['script_detail.discount']: this.data.script_detail_Price.discount,
          //   // 这里有bug小数保留有问题
          //   ['script_detail.discounted_price']: this.data.script_detail_Price.discount*this.data.script_detail_Price.price,
          })
          // console.log(this)
          // this.getData()
          this.up_down_script(this.data.script_detail.script_code,1)
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
  // 查看更多
  readmore(){
    // console.log('查看更多')
    this.setData({
      more:!this.data.more
    })
  },
  // 返回首页
  onGoHome() {
    wx.reLaunch({
      url: '/pages/login/index',
    });
  },
  // 上下滚动的两种方式
  pagescroll(e){
    if(e.detail.deltaY>0){
      this.setData({
        scrollInto:'banner'
      })
    }else{
      this.setData({
        scrollInto:'details'
      })
    }
  },
  binddragend(e){
    console.log(e.detail.velocity.y,'binddragend')
    if(e.detail.velocity.y>0.2){
      this.setData({
        scrollInto:'details'
      })
    }else if(e.detail.velocity.y<-0.2){
      this.setData({
        scrollInto:'banner'
      })
    }
  },
  // 导航
  location(e){
    // console.log(e.currentTarget.dataset)
    const {title,address,latitude,longitude}=e.currentTarget.dataset
    wx.openLocation({
      latitude:Number(latitude),
      longitude:Number(longitude),
      name:title,
      address:address,
      scale: 18
    })
  }
})