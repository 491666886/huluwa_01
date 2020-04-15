// pages/loginIns/retrievePassword/retrievePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch: true,
    time: 10,
    getmsg: "获取验证码",
    tineTo: true,
    code: ''
  },
  switchChange: function (e) {
    this.setData({
      switch: e.detail.value
    })
  },
  getCode() {
    let _this = this
    var timeNum = this.data.time
    var tineTo = this.data.tineTo
    var phone = this.data.phone
    if (tineTo){
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
    }
  },
  phone(e) {
    var phone = e.detail.value.replace(/\s+/g, '')
    this.setData({
      phone: phone
    })
  }, 
  code(e) {
    var code = e.detail.value.replace(/\s+/g, '')
    this.setData({
      code: code
    })
  },
  pasword(e) {
    var pasword = e.detail.value.replace(/\s+/g, '')
    this.setData({
      pasword: pasword
    })
  },
  login(){
    let _this = this
    if (this.data.switch) {
    }else{
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