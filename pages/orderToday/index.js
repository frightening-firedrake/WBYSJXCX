// pages/test3/index.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    totalHeight:0,
    headList: [
      { title: 'ID' },
      { title: '预约人' },
      { title: '预约电话' },
      { title: '预约门店' },
      { title: '预约剧本' },
      { title: '预约模式' },
      { title: '预约时间' }
    ],
    list: [
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    },
    {
      id:'1',
      name:'张三',
      phone:'12345678922',
      store:'门店1',
      scriptName:'08:30:43',
      type:'18:01:56',
      time:'30:43',
    }
 
  ]
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success:(res)=> {
        this.setData({
          // totalHeight: (res.windowHeight * 2) - 240
          totalHeight: res.windowHeight - 120
        })
      }
    })
  },
  // 触底事件
  handleScrollToLower(e){
      if(e.detail.direction == 'bottom') {
        console.log('scroll-view触底事件在这里处理加载下一页数据')
      }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
 
  // }
})