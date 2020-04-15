var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    list1:[
      {
        name:'小葫芦妈妈登录',
        num:10
      },
      {
        name: '发送到发多少',
        num: 10
      }
    ],
    list2: [
      {
        name: '每天签到（登录)',
        num: 10
      }
    ],
    list:[],
    img:''
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    this.setData({
      time: time,
      img: wx.getStorageSync('childImg')
    })
    if (time.split('-')[1] % 2 == 0) {
      this.setData({
        list: this.data.list1
      })
    } else {
      this.setData({
        list: this.data.list2
      })
    }
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