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
        reancyNum:5,
        name:'张浩月',
        babyImg:'/images/zhy1.jpg'
      },
      {
        integral: 895,
        reancyNum: 2,
        name: '李嘉祺',
        babyImg: '/images/zhy2.jpg'
      },
      {
        integral: 780,
        reancyNum: 1,
        name: '刘小毛',
        color:'#FEF3E8',
        babyImg: '/images/zhy3.jpg'
      },
      {
        integral: 770,
        reancyNum: 5,
        name: '李元杰',
        babyImg: '/images/zhy4.jpg'
      },
      {
        integral: 680,
        reancyNum: 3,
        name: '张可强',
        babyImg: '/images/zhy5.jpg'
      },
      {
        integral: 530,
        reancyNum: 5,
        name: '王思浩',
        babyImg: '/images/zhy6.jpg'
      }
    ],
    list2: [
      {
        integral: 1020,
        reancyNum: 6,
        name: '张浩月',
        babyImg: '/images/zhy1.jpg'
      },
      {
        integral: 960,
        reancyNum: 2,
        name: '王思浩',
        babyImg: '/images/zhy2.jpg'
      },
      {
        integral: 780,
        reancyNum: 1,
        name: '刘小毛',
        color: '#FEF3E8',
        babyImg: '/images/lxm.png'
      },
      {
        integral: 860,
        reancyNum: 5,
        name: '黄蛰桥',
        babyImg: '/images/zhy4.jpg'
      },
      {
        integral: 660,
        reancyNum: 1,
        name: '黄浩丞',
        babyImg: '/images/zhy5.jpg'
      },
      {
        integral: 530,
        reancyNum: 1,
        name: '黄浩丞',
        babyImg: '/images/zhy6.jpg'
      },
      {
        integral: 490,
        reancyNum: 2,
        name: '曹卜洵',
        babyImg: '/images/icon09.png'
      },
      {
        integral: 400,
        reancyNum: 5,
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
    this.setData({
      time: e.detail.value
    })

    if (e.detail.value.split('-')[1] % 2 == 0) {
      this.setData({
        list: this.data.list1
      })
    } else {
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
    this.setData({
      time: time
    })

    if (time.split('-')[1] % 2 == 0){
      this.setData({
        list:this.data.list1
      })
    }else{
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