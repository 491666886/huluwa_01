// pages/nav/sharerDetail/sharerDetail.js
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
 * 页面的初始数据
 */
  data: {
    video: '',
    videoCount: 0,
    collectShow: false,  //收藏图片的展示和消失
    title: '',
    id: 0,
    isSave: 0,
    isShare: true,
    vid: 0,
    userId: '',
    childId: '',
  },


  // 播放事件
  startPlaying() {
    let vid = this.data.vid
    let num = this.data.videoCount

    //请求
    util.post(app.globalData.src + '/gourdbaby/childVideo/addChildVideoPlayNumftaction.action', {
      videoId: vid,
    }).then(res => {
      if (res.data.resultCode == 200) {
        this.setData({
          videoCount: num + 1
        })
      } 
    })
  },
  getCurrentPageUrlWithArgs: function() {
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    var options = currentPage.options    //如果要获取url中所带的参数可以查看options

    //拼接url的参数
    var urlWithArgs = url + '?'
    for(var key in options) {
      var value = options[key]
      urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

    return urlWithArgs
  },

  getVideo(videoId,userId,childId) {
     let that = this;
     util.post('http://10.150.27.90:8080/gourdbaby/childVideo/getShareChildVideoInfoftaction.action',
      {
        videoId: videoId,
        userId: userId,
        childId: childId
      }).then(function (res) {
        if (res.data.resultCode == 200) {
          that.setData({
            video: res.data.resultData,
            isSave: res.data.resultData.isSave,
            title: res.data.resultData.videoTitle,
            videoCount: res.data.resultData.countNum,
            //link: res.data.t.keyName,
            createTime: res.data.resultData.createTime.split(' ')[0],
          })
        }else if (res.data.resultData.nullType = 0) {
          wx.showToast({
            title: '无此视频信息',
            icon: 'none',
            duration: 1000
          })
        } else if (res.data.resultData.nullType = 1) {
          wx.showToast({
            title: '此视频已经过期',
            icon: 'none',
            duration: 1000
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //不使用了
    //使用的getCurrentPageUrlWithArgs 遍历的时候是先进后出      
    // var childId = that.getCurrentPageUrlWithArgs().split('=')[1].split('&')[0];
    // var vidd = that.getCurrentPageUrlWithArgs().split('=')[2].split('&')[0];
    // var userId = that.getCurrentPageUrlWithArgs().split('=')[3];

    var childId = options.childId;
    var videoId = options.videoId;
    var userId = options.userId;

    this.getVideo(videoId,userId,childId);

    // this.setData({
    //   vidd : vidd,
    //   userId: userId,
    //   childId: childId
    // })
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