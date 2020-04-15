// pages/handset/replacePhone/replacePhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:''
  },

  next(){
    var mobile  = this.data.phone
    let that = this
     if (mobile == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return false
    }
    else if (mobile.length != 11) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      wx.showToast({
        title: '修改成功',
        icon: 'none',
        duration: 1500,
        success:function(){
        }
      })
    }
  },
  blurPhone: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: phone
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