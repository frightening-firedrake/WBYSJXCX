// pages/script/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error:"",
    base_file_url: app.globalData.baseUrl,
    businessScriptList: app.globalData.baseUrl + app.globalData.urlData.businessScriptList,
    scriptConfigList: app.globalData.baseUrl + app.globalData.urlData.scriptConfigList,
    businessScriptChangePrice: app.globalData.baseUrl + app.globalData.urlData.businessScriptChangePrice,
    businessScriptPut: app.globalData.baseUrl + app.globalData.urlData.businessScriptPut,
    filterShow: false,
    otherRange1: [{
      name: '设置预约时间',
      value: '../setScriptTime/index',
      link: true
    }, {
      name: '评价管理',
      value: '../evaluationManagement/index',
      link: true
    }, {
      name: '店长评价',
      value: '../storeManagerEvaluation/index',
      link: true
    }, {
      name: '上架',
      value: '1',
      link: false
    }, {
      name: '下架',
      value: '0',
      link: false
    }, {
      name: '收付款',
      value: '../payments/index',
      query: true,
      link: true
    }, {
      name: '取消',
      value: '3',
      link: false
    }],
    otherRange2: [
      {
      name: '设置预约时间',
      value: '../setScriptTime/index',
      link: true
    }, {
      name: '评价管理',
      value: '../evaluationManagement/index',
      link: true
    }, {
      name: '店长评价',
      value: '../storeManagerEvaluation/index',
      link: true
    }, {
      name: '上架',
      value: '1',
      link: false
    }, {
      name: '下架',
      value: '0',
      link: false
    }, {
      name: '取消',
      value: '3',
      link: false
    }],
    storItems: [{
        value: 'CHN',
        name: '全部',
        checked: 'true'
      },
      {
        value: 'CHN',
        name: '推荐'
      },
      {
        value: 'BRA',
        name: '最新'
      },
      {
        value: 'JPN',
        name: '热门'
      }
    ],
    pageIndex: 0,
    dialogDeleteShow: false,
    dialogDownShow: false,
    subject_list: [],
    duration_list: [],
    person_list: [],
    difficulty_list: [],
    delete_buttons: [{
        text: '取消',
        extClass: "cancle_btn"
      },
      {
        text: '确认',
        extClass: ""
      }
    ],
    down_buttons: [{
      text: '取消',
      extClass: "cancle_btn"
    },
    {
      text: '确认',
      extClass: ""
    }
  ],
    slideButtons: [
      {
        text: '上架',
        
        extClass: 'put_li',
        src:'/assets/icon/shangjia.svg',
        status: 1,
      },
      {
        text: '删除',
        type: 'warn',
        extClass: 'delete_li',
        status: -1,
        src:'/assets/icon/shanchu.svg',
      },

    ],
    slideButtons1: [
      {
        text: '下架',
        extClass: 'down_li',
        type: "down",
        src:'/assets/icon/xiajia.svg',
        status: 0,
      },
      {
        text: '删除',
        type: 'warn',
        extClass: 'delete_li',
        src:'/assets/icon/shanchu.svg',

        status: -1,
      },

    ],
    script_detail: {
      script_code: '',
      user_code: '',
      price: '',
      discount: '',
      store_id: '',
    }, //点击的剧本详情，为修改价格准备
    total: null,
    dialog_title:"",
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
    dataList: [],
    dialogShow: false,
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
    ]
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
    this.setData({
      dataList: [],
    })
    this.getData()
    this.getConfigList()
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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
  filterBtn() {
    console.log(this.data.filterShow)
    this.setData({
      filterShow: !this.data.filterShow
    })
    // wx.hideTabBar
  },
  name_filter(e) {
    this.setData({
      dataList: [],
    })
    this.getData()
  },
  //每输入一个字符就执行一次 
  //解决办法将view 改为button type 为submit
  input_name(e) {
    console.log(e, 'eeeee')
    this.setData({

      ['queryJson.query_name']: e.detail.value
    })
  },
  otherChange(e) {
    console.log(e, e.detail.value)

    let name = e.currentTarget.dataset.status === '1' ? 'otherRange1' : 'otherRange2'
    if (this.data[name][e.detail.value].link) {
      if (this.data[name][e.detail.value].query) {
        wx.navigateTo({
          url: this.data[name][Number(e.detail.value)].value + '?scriptCode=' + e.currentTarget.dataset.scriptcode + '&scriptName=' + encodeURIComponent(e.currentTarget.dataset.scriptname),
        })
      } else {
        wx.navigateTo({
          url: this.data[name][Number(e.detail.value)].value,
        })
      }
    } else {
      this.up_down_script( e.currentTarget.dataset.scriptcode, this.data[name][Number(e.detail.value)].value)
   
    }
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
        console.log('剧本', res)
        if (res.data.status) {
          this.setData({
            dataList: []
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
  //滚动到底部加载下一页
  lower(e) {
    this.setData({
      ['queryJson.page']: this.data.queryJson.page + 1
    })
    // if(this.data.total<=this.data.queryJson.page_size){
    // this.setData({
    //   dataList: []
    // })
    // }
    //重新请求数据
    this.getData()
  },
  //获取列表信息
  getData() {

    wx.showLoading({
      title: '加载中',
    })
    //先弄为空 ? 再拉下一页就为空了


    let queryJson = this.data.queryJson
    queryJson.store_id = app.globalData.storeId
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
            dataList: this.data.dataList.concat(res.data.data),
            total: res.data.total
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
  //获取侧边筛选
  getConfigList(page) {
    wx.showLoading({
      title: '加载中',
    })
    let queryJson = {
      user_code: app.globalData.userCode
    }
    wx.request({
      url: this.data.scriptConfigList,
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
            subject_list: res.data.data.subject_list,
            duration_list: res.data.data.duration_list,
            person_list: res.data.data.person_list,
            difficulty_list: res.data.data.difficulty_list,
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

  //侧边选中
  checkboxChange(e) {
    console.log(e)
    //字段
    let filed = e.target.dataset.filed
    //选中的值
    let value = e.detail.value
    //字段对应的对象
    let object_list = e.target.dataset.object
    //构成过滤参数
    this.setData({
      [`queryJson.${filed}`]: value
    })
    //字段与对象的映射关系
    let object_map = {
      'subject_list': this.data.subject_list,
      'duration_list': this.data.duration_list,
      'difficulty_list': this.data.difficulty_list,
    }
    //checked控制 选中的样式
    for (let j = 0, lenJ = object_map[`${object_list}`].length; j < lenJ; ++j) {
      if (object_map[`${object_list}`][j].name == value) {
        object_map[`${object_list}`][j].checked = true
      } else {
        object_map[`${object_list}`][j].checked = false
      }


    }
    //将选中的样式赋值
    this.setData({
      [`${object_list}`]: object_map[`${object_list}`]
    })

  },
  //侧边过滤 点击确定
  start_filter() {

    this.setData({
      dataList: [],
      ['queryJson.page']: 1
    })
    this.getData()
    this.setData({
      filterShow: false
    })
  },
//侧边过滤 点击重置
reset_filter() {

  this.setData({
    dataList: [],
    ['queryJson.page']: 1,
    ['queryJson.script_difficulty']: '',
    ['queryJson.subject_type']: '',
    ['queryJson.duration']: '',
  })
  this.getData()
  this.getConfigList()
  this.setData({
    filterShow: false
  })
},
  //删除弹框 俩按钮事件
  tapDialogButton(e) {
    this.setData({
      dialogDeleteShow: false
    })
    if(e.detail.index==1){
      console.log("确认删除")
    }
  },
  //下架弹框 俩按钮事件
  tapDialogDownButton(e) {
    // if(e.detail.index==0){
    //   console.log("取消")
    // }
    if(e.detail.index==1){
      // console.log("确认")
      this.up_down_script(this.data.script_detail.script_code,0)
    }
    this.setData({
      dialogDownShow: false
    })
  },
  //编辑事件
  editChange(e) {
    console.log(e)
    let script_data = e.currentTarget.dataset.scriptinfo
    this.setData({
      dialogShow: true,
      dialog_title:'修改价格',
      ['script_detail.price']: script_data.publish_price,
      ['script_detail.discount']: script_data.discount,
      ['script_detail.script_code']: script_data.script_code,
      ['script_detail.store_id']: app.globalData.storeId,
      ['script_detail.user_code']: app.globalData.userCode,
    })
  },
  // 同步修改表单字段数据
  formInputChange(e) {
    // console.log('同步中')
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`script_detail.${field}`]: e.detail.value
    })
  },
  //保存修改价格
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
  save_change_price() {
    // console.log(this.data.script_detail)
    // return
    wx.request({
      url: this.data.businessScriptChangePrice,
      method: 'POST',
      data: this.data.script_detail,
      header: {
        token: app.globalData.token
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.status) {
          this.setData({
            dialogShow: false,
            dataList: []
          })
          this.getData()
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

  //左滑 按钮事件
  slideButtonTap(e) {
    console.log('slide button tap', e)
    let index = e.detail.index
    let name = e.currentTarget.dataset.status === 1 ? 'slideButtons1' : 'slideButtons'
    // 下架：上架
    let script_data = e.currentTarget.dataset.data
    this.setData({
      ['script_detail.price']: script_data.publish_price,
      ['script_detail.discount']: script_data.discount,
      ['script_detail.script_code']: script_data.script_code,
      ['script_detail.store_id']: app.globalData.storeId,
      ['script_detail.user_code']: app.globalData.userCode,
      ['script_detail.script_name']: script_data.script_name,
    })
    console.log(this.data.script_detail,'script_detail')
    if (this.data[name][index].status === -1) {
      this.setData({
        dialogDeleteShow: true,

      })

    } else if (this.data[name][index].status === 1) {
      this.setData({
        dialogShow: true,
        dialog_title:'上架剧本'
      })

    } else {
      console.log('下架')
      this.setData({
        dialogDownShow: true,
      })
    }

  },


})