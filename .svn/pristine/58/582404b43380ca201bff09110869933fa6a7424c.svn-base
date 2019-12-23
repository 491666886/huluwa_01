
//获取应用实例
const app = getApp()
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch: true
  },
  switchChange: function (e) {
    this.setData({
      switch: e.detail.value
    })
    console.log(this.data.switch)
  },

  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData) 

  },
  // 获取手机号
  getPhone(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  //登录
  doLogin: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    console.log(app.globalData.src)
    let src = app.globalData.src
    console.log(this.data.switch)
    if (this.data.switch){
      wx.login({
        success: function (res) {
          console.log(res)
          //获取登录的临时凭证
          var code = res.code;
          // 调用后端，获取微信的session_key,secret
          util.get('http://192.168.2.164:8088/gourdbaby/login/code2session.action', {
            code: code
          }).then(function (res) {
            console.log(res)
          })
        }
      })
    }else{
      wx.showToast({
        title: '请勾选同意用户协议及隐私政策',
        icon:'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // util.showModalPromisified({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    // })
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