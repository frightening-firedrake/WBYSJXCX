// component/scriptInfo.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'拼场信息'
    },
    order:{
      type:Object,
      value:{}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    base_file_url: app.globalData.baseUrl,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
