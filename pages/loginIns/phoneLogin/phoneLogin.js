//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //switch: true,
    number:''
  },
  number(e) {
    var number = e.detail.value.replace(/\s+/g, '')
    this.setData({
      number: number
    })
  },
  switchChange: function (e) {
    this.setData({
      switch: e.detail.value
    })
  },
  getCode(){
    var phone = this.data.number
    //this.data.switch
    if (phone != '') {
      if (!(/^1[345678]\d{9}$/.test(phone))) {
        if (phone.length <= 11) {
          wx.showToast({
            title: '手机号有误',
            icon: 'none',
            duration: 2000
          })
        }
      }else{
        util.get(app.globalData.src + '/gourdbaby/login/getCode.action',
          {
            tel: phone
          }).then(res => {
            if (!res.data) {
              wx.showToast({
                title: '短信发送失败，请重新发送',
                icon: 'none'
              })
            } else {
              let seinid = res.data.split(',')[1]
              wx.navigateTo({
                url: '/pages/loginIns/codeLogin/codeLogin?seinid=' + seinid + '&phone=' + phone,
              })
            }
          })
      }
    } else {
      wx.showToast({
       // title: '请勾选同意用户协议及隐私政策',
        title: '手机号不允许为空',
        icon: 'none'
      })
    }
  },
  paswordLogin() {
    if (this.data.switch) {
      wx.navigateTo({
        url: '/pages/passwordLogin/passwordLogin',
      })
    } else {
      wx.showToast({
        title: '请勾选同意用户协议及隐私政策',
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