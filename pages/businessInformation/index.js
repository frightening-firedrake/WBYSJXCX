// pages/businessInformation/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      businessStoreDetail: app.globalData.baseUrl + app.globalData.urlData.businessStoreDetail,
      base_file_url: app.globalData.baseUrl,
      businessCreateStore: app.globalData.baseUrl + app.globalData.urlData.businessCreateStore,
        date: '',
        error:'',
        typeItems: [
          {value: '0', name: '基本推荐',checked:true},
          {value: '1', name: '场所照片',checked:false},
          {value: '2', name: '活动推荐',checked:false}
        ],
        selectType: '0',
        address:'',
        store_data:{
          address:'',//地址
          introduction:'',//介绍
          consumption:'',//人均
          phone:'',//电话
          business_hours:'',//营业时间
          title:''//名称
        },
        store_id:'',
        logoImgurl: null,
        logoImgurls:[],
        recommendImgList0:[
          // {
            // url: 'http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0',
          // }
        ],//基本推荐图片列表——页面显示用的
        cacheRecommendImgList0:[],//基本推荐图片列表——传参用这个值
        recommendImgList1:[],//场所照片列表
        cacheRecommendImgList1:[],//场所照片列表——传参用这个值
        recommendImgList2:[],//活动推荐列表
        cacheRecommendImgList2:[],//活动推荐列表——传参用这个值
        files: [
          // {
          //   url: 'http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0',
          // }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     this.setData({
       store_id:options.id,
       selectFile: this.selectFile.bind(this),
       uplaodFile: this.uplaodFile.bind(this)
     })
     console.log('555',this.data.uplaodFile)
     this.getBusinessStoreDetail()
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

    // },
    //选择图片 放到data中
    upload() {
      let that = this
      wx.chooseMedia({
        count: 1,
        mediaType: ['image','video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
          console.log(res)
          let tempFilePaths = res.tempFiles
          console.log(tempFilePaths, 'tempFilePaths')
          that.setData({
            logoImgurl: tempFilePaths[0].tempFilePath
          })
        }
      })
    },
    uploadError(e) {
        console.log('upload error', e.detail)
    },
    uploadSuccess(e) {
        console.log('upload success', e.detail)
    },
    uploadLogoSuccess(e) {
      console.log('upload logo success', e.detail)
      // logo上传成功并得到地址
      that.setData({
        logoImgurl: e.detail.urls[0]
      })
    },
    deleLogo(e){
      console.log(e)
      // 图片删除事件需要处理数据
      // console.log(this.data.logoImgurls)
    },
    selectFile(files) {
        console.log('files', files)
        // 返回false可以阻止某次文件上传
        let arr = this.data['recommendImgList'+this.data.selectType]
        for(let i = 0;i<files.tempFilePaths.length;i++){
          arr.push({
            url: files.tempFilePaths[i]
          })
        }
        this.setData({
          ['cacheRecommendImgList'+this.data.selectType]:arr
        })
        console.log(this.data.cacheRecommendImgList0)
    },
    uplaodFile(files) {
        console.log('upload files', files)
        console.log(files)
        // 文件上传的函数，返回一个promise
        return new Promise((resolve, reject) => {
            // 成功
            setTimeout(() => {
              resolve({
                urls: files.tempFilePaths
              })
            }, 1000);
            setTimeout(() => {
                reject('some error')
            }, 1000)
        })
    },
    bindTimeChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    binddeleteImg(e){
      let arr = this.data['cacheRecommendImgList'+this.data.selectType].splice(e.detail.index,1)
      this.setData({
        ['cacheRecommendImgList'+this.data.selectType]:arr
      })
      console.log('555',this.data['cacheRecommendImgList'+this.data.selectType])
    },
    radioChange(e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
      const items = this.data.typeItems
      for (let i = 0, len = items.length; i < len; ++i) {
        items[i].checked = items[i].value === e.detail.value
      }
      this.setData({
        items,
        selectType:e.detail.value,
        ['recommendImgList'+e.detail.value]:this.data['cacheRecommendImgList'+e.detail.value]
      })
    },
    getAddress:function(e){
     console.log(e,'e')
      console.log(e.detail.address)    
      this.setData({
     address:e.detail.address
      })
    },
      //获取门店详情
  getBusinessStoreDetail(){

    wx.request({
      url: this.data.businessStoreDetail,
      method: 'POST',
      data:{
        store_id:this.data.store_id
      },
      header:{
        token:app.globalData.token
      },
      //使用箭头函数 不然会报 Cannot read property 'setData' of undefined
      success: (res) => {
      
        wx.hideLoading()
        console.log('门店',res)
        if(res.data.code === 200){
          this.setData({
            store_data: res.data.data,
            // logoImgurl:this.data.base_file_url+res.data.data.store_cover
          
          })
          wx.downloadFile({
            url:this.data.base_file_url+res.data.data.store_cover, //
            success:(res) =>{
              if (res.statusCode === 200) {
                console.log(res.tempFilePath, 'res.tempFilePath')
                let tempFilePaths = res.tempFilePath
                this.data.logoImgurls.push({url:tempFilePaths})
                this.setData({
                  logoImgurl: tempFilePaths,
                  logoImgurls:this.data.logoImgurls
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'error',
            duration: 2000
          })
        }
      },
     
      fail(){
        wx.hideLoading()
        wx.showToast({
          title: '网络连接错误，请稍后重试',
          icon: 'error',
          duration: 2000
        })
      }
    })
  
  },
  //编辑保存店铺
  edit_store(e){
    
    let edit_store_params= e.detail.value
    edit_store_params['store_id']=this.data.store_data.store_id
    edit_store_params['address']=this.data.address
    edit_store_params['user_code']= app.globalData.userCode
    console.log( edit_store_params)
    wx.uploadFile({
      url: this.data.businessCreateStore, //上传文件的接口地址
      filePath: this.data.logoImgurl,
      name: 'logo',
      formData: {
        'data': JSON.stringify(edit_store_params)
      },
      success(res) {
        // wx.navigateTo({
        //   url: '../storeManagement/index',
        //   success: function (res) {}
        // })
        wx.navigateBack({
          delta: 1
        })
      },
      fail: function (res) {
        console.log(res, 'res')
        wx.showToast({

          title: '上传失败，请重新上传',

          icon: 'none',

          duration: 2000

        })
      }
    })
  },
})