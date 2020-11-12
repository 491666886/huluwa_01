// pages/nav/videodetail/videodetail.js
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
    vid: 0,
    isSave: 0,
    isShare: true,

    userId: '',
    childId: '',
  },

  // 葫芦待开发提示
  huluClid() {
    if (!this.data.isSave) {
      util.post(app.globalData.src + '/gourdbaby/saveVideo/getUserSpaceftaction.action',
        {
          userId: wx.getStorageSync('userId')
        }).then(res => {
          //1.是否有内存  2.是否加上这个视频之后，内存溢出
          if (res.data.resultData.allSaveSpace > 0) {
            util.post(app.globalData.src + '/gourdbaby/saveVideo/saveChildVideoftaction.action',
              {
                userId: wx.getStorageSync('userId'),
                videoId: this.data.vid,
                childId: wx.getStorageSync("childList0")[0].childId
              }).then(res => {
                if (res.data.resultCode == 200) {
                  wx.showToast({
                    title: '您的视频已经永久保存',
                    icon: 'none',
                    duration: 1500
                  })
                  this.setData({
                    isSave: 1
                  })

                } else if (res.data.resultCode == 202) {
                  wx.showModal({
                    // title: '提示',
                    content: res.data.resultMsg,
                    cancelText: '我再看看',
                    confirmText: '前去购买',
                    confirmColor: '#FE8338',
                    success(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '/pages/My/myMoney/myMoney',
                        })
                      } else if (res.cancel) {
                      }
                    }
                  })
                } else {
                  //失败
                  wx.showToast({
                    title: '失败',
                    icon: 'none',
                    duration: 1500
                  })
                }

              })
          } else {
            //您还未购买葫芦存储服务
            wx.showModal({
              // title: '提示',
              content: '您还未购买葫芦存储服务',
              cancelText: '我再看看',
              confirmText: '前去购买',
              confirmColor: '#FE8338',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/My/myMoney/myMoney',
                  })
                } else if (res.cancel) {
                }
              }
            })
          }
          //res.data.resultData.allSaveSpace; 全部空间
          //res.data.resultData.allSaveSpace; 已用空间
        })
    } else {
      wx.showToast({
        title: '此视频您已经入光,无需在次入光。',
        icon: 'none',
        duration: 1500
      })
    }
  },
  getUserVType() {
    util.post(app.globalData.src + '/gourdbaby/saveVideo/getUserSpaceftaction.action',
      {
        userId: wx.getStorageSync('userId')
      }).then(res => {
      })
  },


  // 播放事件
  startPlaying() {
    let vid = this.data.vid
    let num = this.data.videoCount

    //请求
    util.get(app.globalData.src + '/gourdbaby/gourdChildUser/updateVideoCount.action', {
      videoId: vid,
      count: num + 1
    }).then(res => {
      if (res.data.status == 200) {
        this.setData({
          videoCount: this.data.videoCount + 1
        })
      }
    })
  },
  // 收藏接口  video/collectVideoftaction.action
  collectCld(vid, tel) {
    util.post(app.globalData.src + '/gourdbaby/video/collectVideoftaction.action', {
      videoId: vid,
      collectType:2,
      userId: wx.getStorageSync('userId'),
      childId: wx.getStorageSync("childList0")[0].childId
    }).then(res => {
      if (res.data.resultCode == 200) {
        this.setData({
          collectShow: true
        })
        wx.showToast({
          title: tel,
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  // 取消收藏
  collectCldTo(vid, tel) {
    util.post(app.globalData.src + '/gourdbaby/video/cancelCollectVideoftaction.action', {
      videoId: vid,
      userId: wx.getStorageSync('userId'),
      childId: wx.getStorageSync("childList0")[0].childId
    }).then(res => {
      if (res.data.resultCode == 200) {
        this.setData({
          collectShow: false
        })
        wx.showToast({
          title: tel,
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  // 收藏
  collectIn() {
    let tach = this
    let collectShow = tach.data.collectShow
    // 只要点收藏的image 先取反。然后在调用接口
    tach.setData({
      collectShow: !collectShow
    })
    if (tach.data.collectShow) {
      tach.collectCld(tach.data.vid, '收藏成功')
    } else {
      tach.collectCldTo(tach.data.vid, '取消收藏')
    }
  },

  getVideo(vid) {
    let _this = this;
    
    util.post(app.globalData.src + '/gourdbaby/childVideo/getWaterVideoDetail.action',
      {
        // "videoId":1054,
        videoId: Number(vid),
        userId: _this.data.userId,
        childId: _this.data.childId
      }).then(function (res) {
        if (res.data.resultCode == 200) {
          if (res.data.resultData.isCollect != 1) {
            _this.setData({
              collectShow: false,
            })
          } else {
            _this.setData({
              collectShow: true
            })
          }
          _this.setData({
            video: res.data. resultData,
            isSave: res.data. resultData.isSave,
            title: res.data. resultData.videoTitle,
            videoCount: res.data. resultData.count,
            //link: res.data. resultData.keyName,
            createTime: res.data. resultData.createTime.split(' ')[0],
          })
        }
      })
  },

  //剪切按钮事件
  shear: function () {
    var id = this.data.vid
    wx.navigateTo({
      url: "../videoShear/videoShear?data=" + id,
      // success: function (res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: id })
      // }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let that = this

    //const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    // eventChannel.on('acceptDataFromOpenerPage', function (data) {
    let data = option.data

    that.setData({
      userId: wx.getStorageSync('userId'),
      // childId: wx.getStorageSync("childList0")[0].childId
    })


    if (data == undefined) {
      var vidd = util.getCurrentPageUrlWithArgs().split('=')[1];
      that.getVideo(vidd);
      that.setData({
        vid: vidd
      })
    } else {

      var vid = data;
      that.getVideo(vid);
      that.setData({
        vid: vid
      })
    }

    if (!wx.getStorageSync('userId')) {
      that.setData({
        collectShow: false,
        isSave: 0,
        isShare: false
      })
    } else {

    }
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
    this.getUserVType();
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
    }
    let that = this;
    return {
      title: this.data.video.videoTitle,
      imageUrl: this.data.video.videoImg,
      path: 'pages/nav/videodetail/videodetail?data=' + this.data.vid
    }
  }
})