var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list1:[
      {
        integral:900,
        reancyNum:28,
        name:'张浩月',
        babyImg:'/images/login.png'
      },
      {
        integral: 895,
        reancyNum: 22,
        name: '李嘉祺',
        babyImg: '/images/cfa.jpg'
      },
      {
        integral: 780,
        reancyNum: 21,
        name: '张欣源',
        babyImg: '/images/examine.png'
      },
      {
        integral: 770,
        reancyNum: 25,
        name: '李元杰',
        babyImg: '/images/cs.jpg'
      },
      {
        integral: 680,
        reancyNum: 18,
        name: '张可强',
        babyImg: '/images/icon06.png'
      },
      {
        integral: 530,
        reancyNum: 16,
        name: '王思浩',
        babyImg: '/images/icon08.png'
      }
    ],
    list2: [
      {
        integral: 1020,
        reancyNum: 36,
        name: '张浩月',
        babyImg: '/images/login.png'
      },
      {
        integral: 960,
        reancyNum: 26,
        name: '王思浩',
        babyImg: '/images/examine.png'
      },
      {
        integral: 950,
        reancyNum: 24,
        name: '李柏克',
        babyImg: '/images/cfa.jpg'
      },
      {
        integral: 860,
        reancyNum: 45,
        name: '黄蛰桥',
        babyImg: '/images/cs.jpg'
      },
      {
        integral: 660,
        reancyNum: 19,
        name: '黄浩丞',
        babyImg: '/images/icon06.png'
      },
      {
        integral: 530,
        reancyNum: 18,
        name: '黄浩丞',
        babyImg: '/images/icon08.png'
      },
      {
        integral: 490,
        reancyNum: 12,
        name: '曹卜洵',
        babyImg: '/images/icon09.png'
      },
      {
        integral: 400,
        reancyNum: 10,
        name: '李浩逸',
        babyImg: '/images/icon03.png'
      }
    ]
  },
  // 排名规则
  Rule(){
    wx.navigateTo({
      url: '/pages/My/rankingRules/rankingRules',
    })
  },
  bindDateChange: function (e) {
    console.log(e.detail.value.split('-'))
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })

    if (e.detail.value.split('-')[1] % 2 == 0) {
      console.log('ss')
      this.setData({
        list: this.data.list1
      })
    } else {
      console.log('eee')
      this.setData({
        list: this.data.list2
      })
    }
    this.setData({
      oneImg: this.data.list[0].babyImg,
      oneJf: this.data.list[0].integral,
      oneJznum: this.data.list[0].reancyNum,
      oneJName: this.data.list[0].name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    console.log(time.split('-')[1])
    this.setData({
      time: time
    })
    console.log(this.data.time)
    // console.log((time.split('-')[1] % 2 == 0) ? "偶数" : "奇数")

    if (time.split('-')[1] % 2 == 0){
      console.log('ss')
      this.setData({
        list:this.data.list1
      })
    }else{
      console.log('eee')
      this.setData({
        list: this.data.list2
      })
    }
    this.setData({
      oneImg: this.data.list[0].babyImg,
      oneJf: this.data.list[0].integral,
      oneJznum: this.data.list[0].reancyNum,
      oneJName: this.data.list[0].name
    })
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
  onShareAppMessage: function () {

  }
})