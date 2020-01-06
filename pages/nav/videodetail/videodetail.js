// pages/nav/videodetail/videodetail.js
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video:'',
    collectShow: true
  },
  // 播放事件
  startPlaying() {
    let vid = this.data.vid
    let num = this.data.video.count

    wx.request({
      url: app.globalData.src + '/gourdbaby/gourdChildUser/updateVideoCount.action',
      data: {
        videoId: vid,
        count: num + 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success(res) {
        console.log(res)
      }
    })
    
  },

  collectCld(vid,num,tel){
    util.post(app.globalData.src + '/gourdbaby/video/updateCollectftaction.action', {
      videoId: vid,
      isCollect: num
    }).then(res=>{
      console.log()
      if (res.data.resultCode == 200){
        wx.showToast({
          title: tel,
          icon:'success',
          duration: 1000
        })
      }
    })
  },
  // 收藏
  collectIn(){
    console.log('123')
    let _this = this
    let collectShow = this.data.collectShow
    this.setData({
      collectShow: !collectShow
    })
    if (this.data.collectShow){
      console.log('收藏')
      _this.collectCld(_this.data.vid, 1,'收藏成功')
    }else{
      console.log('取消收藏')
      _this.collectCld(_this.data.vid, 0,'取消收藏')
    }
    console.log(this.data.collectShow)
    console.log(this.data.vid)
  },
  getVideo(vid) {
    let _this = this;
    util.get(app.globalData.src + '/gourdbaby/gourdChildUser/findVideoCount.action', {
      videoId: vid
    }).then(function (res) {
      console.log(res)
      if (res.data.status == 200) {
        console.log(res.data.t.isCollect)
        if (res.data.t.isCollect){
          _this.setData({
            collectShow:true
          })
        }else{
          _this.setData({
            collectShow: false
          })
        }
        _this.setData({
          video: res.data.t,
        })
      console.log(_this.data.video)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let that =this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      var vid = data.data;
      console.log(vid);
      that.getVideo(vid);
      that.setData({
        vid: vid
      })
    })
    
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
      title: '侧呃呃',
      // path: '/page/user?id=123'
    }
  }
})