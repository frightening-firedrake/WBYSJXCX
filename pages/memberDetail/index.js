// pages/memberManagement/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
        base_file_url: app.globalData.baseUrl,

    memberIndex: 0,
    memberCountries: ['砖石会员', '普通会员', '白金会员', '黄金会员'],
    businessMemberLevel: app.globalData.baseUrl + app.globalData.urlData.businessMemberLevel,
    businessMemberDetail: app.globalData.baseUrl + app.globalData.urlData.businessMemberDetail,
    businessMemberChange: app.globalData.baseUrl + app.globalData.urlData.businessMemberChange,
    member_detail: {
      name:'12'
    },
    member_detail_id: null,
    formData: {

    },
    level_list: [],
    rules: [{
      name: 'radio',
      rules: {
        required: false,
        message: '单选列表是必选项'
      },
    }, {
      name: 'checkbox',
      rules: {
        required: true,
        message: '多选列表是必选项'
      },
    }, {
      name: 'name',
      rules: {
        required: true,
        message: '请输入姓名'
      },
    }, {
      name: 'qq',
      rules: {
        required: true,
        message: 'qq必填'
      },
    }, {
      name: 'mobile',
      rules: [{
        required: true,
        message: 'mobile必填'
      }, {
        mobile: true,
        message: 'mobile格式不对'
      }],
    }, {
      name: 'vcode',
      rules: {
        required: true,
        message: '验证码必填'
      },
    }, {
      name: 'idcard',
      rules: {
        validator: function (rule, value, param, modeels) {
          if (!value || value.length !== 18) {
            return 'idcard格式不正确'
          }
        }
      },
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      member_detail_id: options.id
    })
    console.log(this.data.member_detail_id)

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
    this.getbusinessMemberLevel()
    this.getbusinessMemberDetail()
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
  //选择等级
  bindLevelChange(event) {
    let choose_store_index = event.detail.value
    this.setData({
      memberIndex: choose_store_index
    })
    this.setData({
      [`member_detail.member_level`]: this.data.level_list[choose_store_index].id
    })
  },
  //获取店铺会员详情
  getbusinessMemberDetail() {
    wx.request({
      url: this.data.businessMemberDetail,
      method: 'POST',
      data: {id:this.data.member_detail_id},
      header: {
        token: app.globalData.token
      },
      //使用箭头函数 不然会报 Cannot read property 'setData' of undefined
      success: (res) => {

        if (res.data.status) {
          this.setData({
            member_detail: res.data.data
          })

          //picker是按索引取值的 所以需要判断用户等级对应的索引 来给memberIndex赋值
          for (let j = 0, lenJ = this.data.level_list.length; j < lenJ; ++j) {
           
            if (res.data.data.member_level == this.data.level_list[j].id) {
              
              this.setData({
                memberIndex: j
              })
              break
            }
          }
    
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


  //获取店铺会员等级
  getbusinessMemberLevel() {
    let params = {
      user_code: app.globalData.userCode,
      store_id: app.globalData.storeId,

    }
    wx.request({
      url: this.data.businessMemberLevel,
      method: 'POST',
      data: params,
      header: {
        token: app.globalData.token
      },
      //使用箭头函数 不然会报 Cannot read property 'setData' of undefined
      success: (res) => {

        wx.hideLoading()

        if (res.data.status) {
          this.setData({
            level_list: res.data.data
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

  //修改会员信息
  submitForm(){

    this.data.member_detail['id']=this.data.member_detail_id
    wx.request({
      url: this.data.businessMemberChange,
      method: 'POST',
      data:    this.data.member_detail,
      header: {
        token: app.globalData.token
      },
      //使用箭头函数 不然会报 Cannot read property 'setData' of undefined
      success: (res) => {
        if (res.data.status) {
          this.getbusinessMemberDetail()
          wx.navigateTo({
            url: '../memberManagement/index',
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
   //等级名称输入
   formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`member_detail.${field}`]: e.detail.value
    })

  },
})