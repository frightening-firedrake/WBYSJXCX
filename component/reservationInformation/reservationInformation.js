// component/scriptInfo.js
var amapFile = require('../../libs/amap-wx.js'); //如：..­/..­/libs/amap-wx.js
var myAmapFun = new amapFile.AMapWX({
  key: 'c39dd4f912bbc5c0347cceb174fe1c22'
});
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order:{
      type:Object,
      value:{}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // latitude: '',
    // longitude: '',
    // locale:'太原市小店区体育路晋阳街口西北角北美N1西侧君威国际B座15层1302',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    makePhoneCall(e){
      let{phonenumber}=e.currentTarget.dataset;
      if(phonenumber){
        wx.makePhoneCall({
          phoneNumber:phonenumber
        })
      }
    },
    navigation(e){
      let{locale}=e.currentTarget.dataset;
      if(locale){
        // var that = this;
        myAmapFun.getInputtips({
          keywords: locale,
          success: function (data) {
            console.log(data, '地址解析')
            if (data && data.tips) {
              let latitude = data.tips[0].location.split(',')[1]
              let longitude = data.tips[0].location.split(',')[0]
              console.log(latitude, longitude)
              // that.setData({
              //   latitude: latitude,
              //   longitude: longitude,
              // })
              wx.openLocation({
                latitude:Number(latitude),
                longitude:Number(longitude),
                name:locale,
                scale: 18
              })
            }
          }
        })
        // 开始导航想做个导航奈何我不会(lll￢ω￢)先试试吧
        console.log('开始导航')
        // wx.getLocation({
        //   type: 'gcj02', //返回可以用于 wx.openLocation 的经纬度
        //   success (res) {
        //     const latitude = res.latitude
        //     const longitude = res.longitude
        //     wx.openLocation({
        //       latitude,
        //       longitude,
        //       name:locale,
        //       scale: 18
        //     })
        //   }
        // })
        
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  ready: function (options) {
    
  }
})
