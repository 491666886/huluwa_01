//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    img:''
  },
  jfDetailed() {
    wx.navigateTo({
      url: '/pages/My/integralInfo/integralInfo',
    })
  },
  task(){
    let _this = this
    util.post(app.globalData.src + '/gourdbaby/gourdChildUser/findUserIntegralRoles.action',
      {
        
      }).then(res =>{
        if(res.data.status == 200){
          _this.setData({
            list: res.data.t
          })
        }
      })
  },
  goMoney(){
    wx.showToast({
      title: '功能开发中~',
      icon: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.task()
    this.setData({
      img: wx.getStorageSync('childImg')
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