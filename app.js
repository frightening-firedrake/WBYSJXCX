// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    token: '',
    userCode: '',
    storeId: '',
    // baseUrl: 'https://wanbenya.9zdz.com',
    baseUrl: 'https://wanbenya.jyoujia.com:10333',

    urlData: {
      login: '/login/access-token',//登录
      getcode: '/getcode',//获取验证码
      businessStoreList: '/business-store-list',//商家店铺
      businessCreateStore: '/create-store',//录入店铺或修改店铺
      businessStoreDetail: '/business-store-detail',//商家店铺详情
      businessHome: '/business-home',//首页
      businessScriptList: '/business-script-list',//剧本列表
      businessScriptChangePrice: '/change-price',//修改剧本价格

      businessScriptPut: '/put-script',//上下架剧本
      
      
      businessScriptDetail: '/script-detail',//剧本详情

      businessRoomList: '/business-room',//商家房间
      businessCreateRoom: '/create-room',//录入房间
      businessDeleteRoom: '/delete-room',//录入房间
      
      businessMemberLevel: '/member-level',//会员等级
      AddMemberLevel: '/add-level',//添加会员等级
      
      businessMemberList: '/business-member',//会员列表
      businessMemberDetail: '/member-detail',//会员详情
      businessMemberChange: '/change-member',//修改会员信息
      
      businessFinaceList: '/business-finance',//财务管理列表
      
      businessHostList: '/business-host',//主持人管理
      businessAddHost: '/add-host',//添加主持人
      businessDeleteHost: '/delete-host',//删除主持人
      

   

      
      businessAppointmentList: '/business-appointment',//商家订单
      businessAppointmentDetail: '/appointment-detail',//商家订单详情
      scriptConfigList:'/get-script-config',//侧边筛选
      scriptImportList:'/script-filter',//导入剧本中的剧本列表
      scriptImport:'/import-script',//导入剧本
      
      // 约车
      businessCarpooling:'/business-carpooling',//店铺约车
      carpoolingRecord:'/carpooling-record',//约车记录
      recordDetail:'/record-detail',//约车记录详情
      getConfig:'/get-config',//获取订单/拼车 状态
      cancelAppointment:'/cancel-appointment',//拒绝接单
      acceptAppointment:'/accept-appointment',//接单
      addOffline:'/add-offline'//添加线下玩家
    }
  }
})
