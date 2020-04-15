//获取应用实例
const app = getApp()
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //switch: true
  },
  zhpasword(){
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },
  number(e){
    var number = e.detail.value.replace(/\s+/g, '')
    this.setData({
      number: number
    })
  },
  password(e){
    var password = e.detail.value.replace(/\s+/g, '')
    this.setData({
      password: password
    })
  },
  switchChange: function (e) {
    this.setData({
      switch: e.detail.value
    })
  },
  login(){
    let phone = this.data.number
    let password = this.data.password
    wx.setStorageSync('phone', phone)
    //this.data.switch
    if (phone != null && password != null) {
      util.post(app.globalData.src + '/gourdbaby/login/userLoginftaction.action',
        {
          userTel: phone,
          password: password
        }).then(res => {
          console.log('res::-',res);
          if (res.data.resultCode == 200){
            //添加当前用户
            wx.setStorageSync("childList", res.data.resultData.childList)
            wx.setStorageSync("childList0", [wx.getStorageSync('childList')[0]]);
            wx.setStorageSync("childImg", wx.getStorageSync('childList')[0].childImg)

            //添加用户信息
            wx.setStorageSync("session_key", res.data.resultData.session_key)
            wx.setStorageSync("openid", res.data.resultData.openid)
            wx.setStorageSync("phone", res.data.resultData.phoneNumber)
            wx.setStorageSync("cardchrc", '1')
            wx.setStorageSync("nickName", res.data.resultData.userNickName)
            wx.setStorageSync("userId", res.data.resultData.userId)
            wx.setStorageSync("token", res.data.resultData.session_key)
            wx.setStorageSync("userImg", res.data.resultData.headImg)
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }else{
            wx.showToast({
              title: res.data.resultMsg,
              icon:'none'
            })
          }
        })
    } else {
      wx.showToast({
        // title: '请勾选同意用户协议及隐私政策',
        title: '手机号和密码不能为空',
        icon: 'none'
      })
    }
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