// pages/nav/onAccess/onAccess.js
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {
      videourl: '',
      classname: '3年2班',
      watchnum: '25',
      curriculum: '美术课',
      people: '31/32',
      teacher:'张兰'

    },
    dynamicList: '1234',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  videoId: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/nav/videodetail/videodetail",
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: id })
      }
    })
  },
  gxList() {
    let _this = this;
    util.get(app.globalData.src + '/gourdbaby/gourdChildUser/findVideoByChildCard.action', {
      childCard: 2,
      pageNo: 1,
      pageSize: 10,
    }).then(function(res) {
      if (res.data.status == 200) {

        let time = res.data.t.map(item => {
          return util.nowTime(item.videoDuration)
        })
        let arr2 = res.data.t.map(item => {
          return item.createTime.split(' ')[0];
        })
        _this.setData({
          dynamicList: res.data.t,
          time: time,
          arr2: arr2
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
  
  
    this.gxList()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})