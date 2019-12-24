
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
    phone:''
  },
  phoneIpt(e){
    // console.log(e.detail.value.replace(/\s+/g, ''))
    this.setData({
      phone: e.detail.value.replace(/\s+/g, '')
    })
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
      console.log('验证成功')
      wx.request({
        url: app.globalData.src + '/gourdbaby/login/getCode.action', 
        data: {
          tel: phone
        },
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log(res.data)
        }
      })



      if (tineTo){
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
              getmsg: '发动验证码',
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