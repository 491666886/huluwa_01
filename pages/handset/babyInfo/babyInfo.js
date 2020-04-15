
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listCot:[]
  },
  babyInfo(event){
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/handset/babyItemInfo/babyItemInfo?id=' + id
    })
  },
  listCot(){
    util.get(app.globalData.src + '/gourdbaby/child/getChildListByUserId.action', {
      userId: wx.getStorageSync('userId')
    }).then(res => {
      if (res.data.resultCode == 200){
        this.setData({
          listCot: res.data.resultData
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.listCot()
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