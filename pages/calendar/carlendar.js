Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrolly:{
      type:[Number,String],
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lastYear: null, //记录上一年
    days:['日' , '一' , '二' , '三' , '四' , '五' , '六' ],
    choose_week_day:'',
    monthList:[],
    setWhere:1 , //记录设置开始和结束的状态 1开始,2结束
    currentMonth: null , //记录选择时间的当前月份
    tampStart:null, //开始时间戳
    tampEnd:null, //开始时间戳
    currentTime:null,
    timeStr: null ,//按下的时候将获取时间字符串与wxml页面字符串做匹配
    oldList: null , //保存当年月份列表
  },
  /**
   * 组件的方法列表
   */

  methods: {
    choose_day:function(e){
console.log(e)
let week_index=e.currentTarget.dataset.day
this.setData({
  choose_week_day:week_index
})
    },
    showPre:function(){
      var that = this
      that.showMore('unshift',that)
    },
    showNext:function(){

    },
    isShow:function(){
      var that = this
      this.setData({
        setWhere:1 , //记录设置开始和结束的状态 1开始,2结束
        tampStart:null, //开始时间戳
        tampEnd:null, //开始时间戳
        startTime:null, //flag开始时间
        endTime:null, //flag结束时间
        timeStr:null,
        monthList: this.data.oldList
      })
      this.triggerEvent('isshowCalendar' , {})
      console.log('隐藏日历')
    },
    selcet:function(e){
      var that = this
      let monthNum = e.currentTarget.dataset.month + 1
      let dayNum = e.currentTarget.dataset.index + 1
      let yearNum = e.currentTarget.dataset.year
     
      that.setData({
        timeStr:yearNum + '-' + (monthNum+1) + '-' + dayNum
      })
      console.log(that.data.timeStr)

      /**
       * 设置开始索引和结束索引
       *  1.当无结束时则设置开始
       *  2.当有开始索引时则设置结束
       */
      if(that.data.setWhere === 1){//设置开始
        if(that.data.endTime !== null){
          that.setData({
            endTime:null, //清空酒店选择时间
            tampEnd:null, //清空结束时间戳
          })
        }
        that.data.setWhere = 2 //将状态改为设置结束
        that.setData({
          tampStart:new Date(yearNum,monthNum,dayNum).getTime(), //开始时间戳
          startTime: yearNum + '-' + (monthNum+1) + '-' + dayNum 
        })
      }else if(that.data.setWhere === 2){//设置结束
        //判断正反与否
        if(new Date(yearNum,monthNum,dayNum).getTime() < that.data.tampStart){//反向选择时间
          that.setData({
            tampEnd: new Date(new Date(that.data.tampStart).getFullYear() , new Date(that.data.tampStart).getMonth() , new Date(that.data.tampStart).getDate(),23,59,59).getTime(),
            tampStart:new Date(yearNum,monthNum,dayNum,0,0,0).getTime(),
            endTime: yearNum + '-' + (monthNum+1) + '-' + dayNum
          })
        }else{
          that.setData({//正向选择时间
            tampEnd:new Date(yearNum,monthNum,dayNum,23,59,59).getTime(),
            endTime: yearNum + '-' + (monthNum+1)  + '-' + dayNum
          })
        }
        that.data.setWhere = 1 //将状态改为设置开始
      }
    },
    finshed:function(){
      var that = this
      if(that.data.tampStart == null || that.data.tampEnd == null ){
        wx.showToast({
          title: '请先选择日期',
          icon:'none'
        })
      }else{
        //处理时间戳
        let start = new Date(new Date(that.data.tampStart).getFullYear(), new Date(that.data.tampStart).getMonth()+1, new Date(that.data.tampStart).getDate(),0,0,0 ).getTime()

        let end = new Date(new Date(that.data.tampEnd).getFullYear(), new Date(that.data.tampEnd).getMonth()+1, new Date(that.data.tampEnd).getDate(),23,59,59 ).getTime()
          that.triggerEvent('sendTamp',{
            start:start,
            end:end
          })
      }
    },
    showMore:function(type,that){
      let newmonthList = []
      let nowTime = new Date()
      let month = nowTime.getMonth()+1
      let date = nowTime.getDate()
      let year
      if(type==='unshift'){
        year = nowTime.getFullYear()-1
      }else if(type==='push'){
        year = nowTime.getFullYear()+1
      }else if(type === ''){
        year = nowTime.getFullYear()
      }

      for(let i=0;i<=11;i++){
        // console.log(i)
        let content = {}//创建月份主体，藏着每个月和单月的每一天
        content.month = i+1
        content.year = year
        content.dates =  new Date(year,i+1,-1).getDate()+1 //这个月共有多少天
        content.startDay = new Date(year,i,1).getDay() //这个月是从周几开始的
        newmonthList.push(content)
      }
      var list
      if(type==='unshift'){
        if(that.data.lastYear === year){
          console.log('不再加载')
          return
        }else{
          list = that.data.monthList
          list.unshift(...newmonthList)
          that.setData({
            monthList: list,
            lastYear:year
          })
        }
        return
      }else if(type==='push'){
        list = that.data.monthList
        list.push(...newmonthList)
        that.setData({
          monthList: list
        })
        return
      }else if(type === ''){
        that.setData({
          monthList:newmonthList,
          currentTime: year + '-' + month + '-' + date
        })
      }

      console.log(JSON.stringify(this.data.monthList),'monthList')
    }
  },
  attached:function(){
    var that = this
    that.showMore('',that)
      that.setData({
        oldList: that.data.monthList,
      })
  }
})
