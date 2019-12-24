
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  codRow() {
    let _this = this
    util.post(app.globalData.src + '/gourdbaby/gourdChildUser/updateNiKeName.action', {
      userName: _this.data.name,
      phone:333
    }).then(function (res) {
      console.log(res)
      if (res.data.resultCode == 200){
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          let pages = getCurrentPages(); //页面栈
          let beforePage = pages[pages.length - 2];
          wx.navigateBack({
            delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
            success: function () {
              // beforePage.syncPageData()//这个函数式调用接口的函数
            }
          })
        },2000)
      }
    })
  },
  nameIpt (e) {
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
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