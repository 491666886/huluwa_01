//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //switch: true,
    time: 60,
    getmsg: "重新获取",
    tineTo: true,
    code:''
  },
  getCode() {
    let _this = this
    var timeNum = this.data.time
    var tineTo = this.data.tineTo
    var phone = this.data.phone
    if (tineTo) {

      util.get(app.globalData.src + '/gourdbaby/login/getCode.action',
        {
          tel: phone
        }).then(res => {
          let seinid = res.data.split(',')[1]
          if (!res.data) {
            wx.showToast({
              title: '短信发送失败，请重新发送',
              icon: 'none'
            })
          }else{
            _this.daoTime()
            _this.setData({
              seinid: seinid
            })
          }
        })
    }
  },
  daoTime(){
    let _this = this
    var timeNum = this.data.time
    var tineTo = this.data.tineTo
    var phone = this.data.phone
    _this.setData({
      tineTo: false
    })
    var inter = setInterval(function () {
      timeNum--
      _this.setData({
        getmsg: timeNum + 's重新发送'
      })
      if (timeNum == 0) {
        clearInterval(inter)
        _this.setData({
          getmsg: '重新获取',
          tineTo: true
        })
      }
    }, 1000)
  },
  switchChange: function (e) {
    this.setData({
      switch: e.detail.value
    })
  },
  code(e) {
    var code = e.detail.value.replace(/\s+/g, '')
    this.setData({
      code: code
    })
  },
  login() {
    let code = this.data.code
    let _this = this
    //this.data.switch
    if (code != '') {
      if (code.length == 0) {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none'
        })
      } else {
        wx.request({
          url: app.globalData.src + '/gourdbaby/login/checkCode.action',
          data: {
            code: code,
            sessionId: _this.data.seinid
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success(res) {
            if (res.data.resultCode == 200) {
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
            } else {
              wx.showToast({
                title: '验证码有误',
                icon: 'none'
              })
            }
          }
        })
      }
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
    this.daoTime()
    this.getCode()
    this.setData({
      seinid: options.seinid,
      phone: options.phone
    })
    wx.setStorageSync('phone', options.phone)
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