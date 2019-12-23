
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:10,
    getmsg: "发送验证码",
    tineTo: true
  },
  timeCld:function() {
    let _this = this
    var timeNum = this.data.time
    var tineTo = this.data.tineTo
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
        console.log(timeNum)
      }, 1000)
    }
    console.log(timeNum)
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