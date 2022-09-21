Component({
  data: {
    selected: 0,
    color: "#333333",
    // selectedColor: "#4e6eff",
    selectedColor: "#7089FF",
    backgroundColor: "#eff6f9",
    list: [
      {
        pagePath: "../index/index",
        text: "首页",
        iconPath: "../assets/img/home-icon.png",
        selectedIconPath: "../assets/img/home-icon1.png"
      },
      {
        pagePath: "../scriptList/index",
        text: "剧本",
        iconPath: "../assets/img/jb-con.png",
        selectedIconPath: "../assets/img/jb-con1.png"
      },
      {
        pagePath: "../importPage/index",
        // text: "导入剧本",
        text: "",
        iconPath: "../assets/img/add-icon2.png",
        selectedIconPath: "../assets/img/add-icon2.png"
      },
      {
        pagePath: "../order/index",
        text: "订单",
        iconPath: "../assets/img/order-icon.png",
        selectedIconPath: "../assets/img/order-icon1.png"
      },
      {
        pagePath: "../myPage/index",
        text: "我的",
        iconPath: "../assets/img/personal-icon.png",
        selectedIconPath: "../assets/img/personal-icon1.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const datatab = e.currentTarget.dataset
      // console.log('导航',datatab)
      const url = datatab.path
      // let { selected } = this.data;
      if (this.data.selected === datatab.index) return;
      // this.setData({
      //   selected: datatab.index
      // })
      wx.switchTab({url})
    }
  }
})