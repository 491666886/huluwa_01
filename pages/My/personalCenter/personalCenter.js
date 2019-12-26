// pages/My/personalCenter/personalCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
    objectArray: [
      {
        id: 0,
        name: '张浩月'
      },
      {
        id: 1,
        name: '添加宝宝'
      }
    ]
  },
// 跳转积分页面
  integralClid(){
    console.log('123')
    wx.navigateTo({
      url: '/pages/My/integral/integral',
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  scCild(){
    wx.navigateTo({
      url: '/pages/My/collect/collect',
    })
  },
  userInfo(){
    console.log('213')
    wx.navigateTo({
      url: '/pages/My/basicInfo/basicInfo',
    })
  },
  // 退出登录
  Logout(){
    console.log('234d')
    wx.showModal({
      title: '是否退出登录',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.reLaunch({
            url: '/pages/login/login'
          })
          // 删除登录状态
          wx.removeStorageSync('cardchrc')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '对对对',
      path: '/pages/index/index',
      imageUrl:'/images/cs.jpg',
      success: function (res) {
        console.log('成功', res)
      }

    }
  }
})