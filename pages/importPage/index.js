// pages/importPage/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_file_url: app.globalData.baseUrl,
    ScriptList: app.globalData.baseUrl + app.globalData.urlData.scriptImportList,
    scriptConfigList: app.globalData.baseUrl + app.globalData.urlData.scriptConfigList,
    scriptImport: app.globalData.baseUrl + app.globalData.urlData.scriptImport,
    filterShow: false,
    script_list: [],
    subject_list: [],
    duration_list: [],
    person_list: [],
    difficulty_list: [],
    //导入剧本
    import_script_data: {
      store_id: '',
      user_code: '',
      script_list: []
    },
    queryJson: {
      store_id: '',
      page_size: 10,
      page: 1,
      query_name: '',
      script_person: '',
      script_difficulty: '',
      subject_type: '',
      duration: '',
      user_code: ''
    },
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
    console.log(55)
    this.getScriptList()
    this.getConfigList()
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        selected: 2
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
  },
  lower(e) {
    //下拉加载下一页 变化page就行
    this.setData({
      ['queryJson.page']: this.data.queryJson.page + 1
    })
    this.getScriptList()
  },
  //导入剧本
  import_script() {
    let choose_script_id_list = []
    for (let j = 0, lenJ = this.data.script_list.length; j < lenJ; ++j) {
      if (this.data.script_list[j].checked) {
        choose_script_id_list.push(this.data.script_list[j].script_code)
      }
    }
    //组装数据
    this.data.import_script_data.store_id = app.globalData.storeId
    this.data.import_script_data.user_code = app.globalData.userCode
    this.data.import_script_data.script_list = choose_script_id_list
    console.log(this.data.import_script_data)
    wx.request({
      url: this.data.scriptImport,
      method: 'POST',
      data: this.data.import_script_data,
      header: {
        token: app.globalData.token
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.status) {
          wx.reLaunch({
            url: '../scriptList/index'
          })
          wx.showToast({
            title: '导入成功',
            icon: 'success',
            duration: 2000
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
  //选择剧本加底色
  script_choose(item) {
    let script_detail = item.currentTarget.dataset.item
    for (let j = 0, lenJ = this.data.script_list.length; j < lenJ; ++j) {
      if (script_detail.script_code == this.data.script_list[j].script_code) {
        this.data.script_list[j].checked = !script_detail.checked
      }
    }
    this.setData({
      script_list: this.data.script_list
    })

  },
  getScriptList() {

    wx.showLoading({
      title: '加载中',
    })
    let queryJson = this.data.queryJson
    queryJson.store_id = app.globalData.storeId
    queryJson.user_code = app.globalData.userCode
    // queryJson.page = page
    this.setData({
      queryJson: queryJson
    })
    wx.request({
      url: this.data.ScriptList,
      method: 'POST',
      data: queryJson,
      header: {
        token: app.globalData.token
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.status) {
          let script_list = res.data.data
          for (let j = 0, lenJ = script_list.length; j < lenJ; ++j) {

            script_list[j].checked = false

          }
          this.setData({
            script_list: this.data.script_list.concat(script_list)
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
      script_list: [],
      ['queryJson.page']: 1
    })
    this.getScriptList()
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
  this.getScriptList()
  this.getConfigList()
  this.setData({
    filterShow: false
  })
},

  name_filter(e) {
    console.log(e)
    this.setData({
      script_list: [],
    })
    this.getScriptList()
  },
  //每输入一个字符就执行一次 
  //解决办法将view 改为button type 为submit
  input_name(e) {
    console.log(e, 'eeeee')
    this.setData({

      ['queryJson.query_name']: e.detail.value
    })
  },

})