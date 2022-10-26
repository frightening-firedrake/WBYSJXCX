// miniprogram/pages/gao_de/gao_de.js
var amapFile = require('../../libs/amap-wx.js'); //如：..­/..­/libs/amap-wx.js
var myAmapFun = new amapFile.AMapWX({
  key: 'c39dd4f912bbc5c0347cceb174fe1c22'
});

Component({
  properties: {
    address: {
      type: String,
      value: ""
    }
  },
  /**           
   * 页面的初始数据
   */
  data: {
    tips: {},
    latitude: 0,
    longitude: 0,
    markers: [],
    distance: '',
    cost: '',
    polyline: [],
    formatted_address: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  ready: function (options) {

    var that = this;
    // that.bindInput({
    //  detail:{
    //   value:that.data.address
    //  }
    // })
    // console.log(that)
    // console.log(that.data.address)
    myAmapFun.getInputtips({
      keywords: that.data.address,
      location: '',
      success: function (data) {
        console.log(data, 'data')
        if (data && data.tips) {
          let latitude = data.tips[0].location.split(',')[1]
          let longitude = data.tips[0].location.split(',')[0]
          console.log(latitude, longitude)
          that.setData({
            latitude: latitude,
            longitude: longitude,

          })
          that.setData({
            markers: [{
              id: 1,
              latitude: latitude,
              longitude: longitude,
              width: 24,
              height: 34
            }]
          })
          console.log(that.data.markers, 'that.data.markers')
        }

      }
    })
    that.triggerEvent('getAddress', {
      address: that.data.address
    });
    //获取自己所在地址的定位
    // myAmapFun.getRegeo({
    //   success: function (data) {
    //     //成功回调
    //     console.log('---------')
    //     console.log(data[0])
    //     that.setData({
    //       latitude: data[0].latitude,
    //       longitude: data[0].longitude,
    //       // formatted_address:data[0].formatted_address,

    //     })
    //     //获取到的地址发送到父组件中
    //     that.triggerEvent('getAddress', {
    //       address: data[0].regeocodeData.formatted_address
    //     });
    //     // that.setData({
    //     //   markers: [{
    //     //     id: 1,
    //     //     latitude: data[0].latitude,
    //     //     longitude: data[0].longitude,
    //     //     width: 24,
    //     //     height: 34
    //     //   }]
    //     // })
    //   },
    //   fail: function (info) {
    //     //失败回调
    //     console.log(info)
    //   }
    // })



  },
  methods: {
    bindInput(e) {
      var that = this;
      var keywords = e.detail.value;
      console.log(keywords, 'ddd')
      myAmapFun.getInputtips({
        keywords: keywords,
        location: '',
        success: function (data) {
          console.log(data, 'data')
          if (data && data.tips) {
            that.setData({
              tips: data.tips

            })


          }

        }
      })
    },
    bindSearch: function (e) {
      var keywords = e.target.dataset.keywords;
      console.log(e,'e')
      let latitude = keywords.location.split(',')[1]
      let longitude = keywords.location.split(',')[0]

      this.setData({
        latitude: latitude,
        longitude: longitude,
        tips: {}
      })
      this.setData({
        markers: [{
          id: 1,
          latitude: latitude,
          longitude: longitude,
          width: 24,
          height: 34
        }]
      })
      this.triggerEvent('getAddress', {
        address:e.target.dataset.keywords.name
      });
    }

  }

})