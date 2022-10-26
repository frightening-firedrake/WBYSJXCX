// pages/setScriptTime/index.js
const date = new Date()
    const hours = []
    const minutes = []
    const hours_s = []
    const minutes_s = []
    for (let i = 1; i <= 23; i++) { 
      hours.push(i)
    }
    for (let i = 1; i <= 60; i++) { 
      minutes.push(i)
    }
    for (let i = 1; i <= 23; i++) { 
      hours_s.push(i)
    }
    for (let i = 1; i <= 60; i++) { 
      minutes_s.push(i)
    }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowCalendar:'block',
    scrolly: null, //让子组件滚动到指定位置
    isshowCalendar: 'none', //是否显示日历
    startDate: '',
    hours: hours,
    hour: 3,
    minutes: minutes,
    minute: 2,
    hours_s: hours_s,
    hours_: 7,
    minutes_s: minutes_s,
    minutes_: 9,
    value: [9999, 1, 1],
    showDialog: false,
    showTimeDialog: false,
    timesItems:[
      {name: '9：00-12：30', value:'9：00-12：30'},
      {name: '12：00-12：30', value:'12：00-12：30'},
      {name: '14：00-14：30', value:'14：00-14：30'},
      {name: '12：00-12：30', value:'12：00-12：30'},
      {name: '14：00-14：30', value:'14：00-14：30'},
      {name: '12：00-12：30', value:'12：00-12：30'},
      {name: '14：00-14：30', value:'14：00-14：30'},
      {name: '14：00-14：30', value:'14：00-14：30'},
      {name: '14：00-14：30', value:'14：00-14：30'},
      {name: '14：00-14：30', value:'14：00-14：30'}
    ],
      items: [
      { name: '中国', value: '中国' },
      { name: '美国', value: '美国' },
      { name: '巴西', value: '巴西' },
      { name: '日本', value: '日本' },
      { name: '英国', value: '英国' },
      { name: '法国', value: '法国' },
      { name: '韩国', value: '韩国' },
      { name: '俄罗斯', value: '俄罗斯' },]
  },
  bindisshowCalendar: function () {
    this.setData({
      isshowCalendar: 'none'
    })
  }, 
  free: function (e) {
    var that = this
    let currentMonth = new Date().getMonth()
    that.setData({
      isshowCalendar: 'block',
      scrolly: 100 + currentMonth * 222
    })
  },
  finshedSelect: function (e) {
    /**
     * 
     * 1.日历组件点击了完成按钮，触发该回调函数，从e中取出日历中取到的两个时间
     * 2.利用两个时间做自己的逻辑
     *      如筛选一定时间内的点餐订单
     *  
     * 
     */
    var that = this
    console.log('从日历组件中拿到的两端时间戳', e.detail)
    //在日历组件中笔者对两个时间戳做了排序的处理，即：
    //  无论用户是正选时间如月5月20号到5月21号,
    //  还是反选时间如5月21号到5月50号
    //  在这里拿到的永远是 start时间戳 > end时间戳
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
    this.getTime()
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
  // onShareAppMessage() {

  // },
  getTime(){
    console.log(this.data.years)
  },
  bindChange(e) { 
    // console.log(e);
    const val = e.detail.value
    console.log(val)
    this.setData({ 
      hour: this.data.hours[val[3]],
      minute: this.data.minutes[val[5]],
      hours_: this.data.hours_s[val[7]],
      minutes_: this.data.minutes_s[val[9]],
    })
  },
  freetoBack(){
    this.setData({
      showDialog: false
    });
  },
  freeBack(){
    this.setData({
      showDialog: false
    });
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  addTime(){
    this.setData({
      showTimeDialog: false
    });
  },
  clearTimeDialog(){
    this.setData({
      showTimeDialog: false
    });
  },
  toggleTimeDialog(){
    this.setData({
      showTimeDialog: !this.data.showTimeDialog
    })
  },
})