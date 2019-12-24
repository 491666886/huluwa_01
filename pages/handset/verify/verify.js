
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:60,
    getmsg: "发送验证码",
    tineTo: true,
    phone:'',
    code:''
  },
  phoneIpt(e){
    // console.log(e.detail.value.replace(/\s+/g, ''))
    this.setData({
      phone: e.detail.value.replace(/\s+/g, '')
    })
  },
  codeIpt(e){
    this.setData({
      code: e.detail.value.replace(/\s+/g, '')
    })
  },
  nexClid(){
    let code = this.data.code
    let _this = this
    console.log(code.length)
    if (code.length == 0){
      wx.showToast({
        title: '请输入验证码',
        icon:'none'
      })
    }else{

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
          console.log(res.data.resultCode)
          if (res.data.resultCode == 200){
            wx.setStorageSync("cardchrc", '1')
            wx.reLaunch({
              url: '/pages/index/index'
            })

          }else{
            wx.showToast({
              title: '验证码有误',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  timeCld:function() {
    let _this = this
    var timeNum = this.data.time
    var tineTo = this.data.tineTo
    let phone = this.data.phone
    console.log(phone)
    if (!(/^1[345678]\d{9}$/.test(phone))) {
      if (phone.length <= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      if (tineTo){

        wx.request({
          url: app.globalData.src + '/gourdbaby/login/getCode.action',
          data: {
            tel: phone
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            console.log(res.data.split(','))
            let seinid = res.data.split(',')[1]
            _this.setData({
              seinid: seinid
            })
            if (!res.data){
              wx.showToast({
                title: '短信发送失败，请重新发送',
                icon:'none'
              })
            }
          }
        })
        _this.setData({
          tineTo: false
        })

        var inter = setInterval(function () {
          timeNum--
          _this.setData({
            getmsg: timeNum + 's重新发送'
          })
          if (timeNum == 0){
            clearInterval(inter)
            _this.setData({
              getmsg: '发送验证码',
              tineTo: true
            })
          }
          // console.log(timeNum)
        }, 1000)
      }
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