// pages/nav/videodetail/videodetail.js
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    video: '',
    collectShow: false,  //收藏图片的展示和消失
    title: '',
    id: 0,
    videoTime:'',
    timeZ:'',
    videoCount:0,
    hint:false,   //提示框
    hintText:'暂无内容' ,// text
    searchText: 0,
    hour: 0,
    Minute: 0,
    second: 0,
    affirm:false, //确认
    affirmText:'暂无内容',

    typeHidden: false,
    videoName:'',

    //视频Star,end的名称
    startHour: 0,
    startMinute: 0,
    startSecond: 0,
    endHour: 0,
    endMinute: 0,
    endSecond: 0
  },

  // 葫芦待开发提示
  huluClid() {
    wx.showModal({
      // title: '提示',
      content: '您还未升级葫芦存储服务',
      cancelText: '我再看看',
      confirmText: '前去升级',
      confirmColor: '#FE8338',
      chooseImage : '',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/My/myMoney/myMoney',
          })
        } else if (res.cancel) {
        }
      }
    })
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
          videoCount: this.data.videoCount + 1
        })
      }
    })
  },
  getVideo(vid) {
    let _this = this;
    //util.post(app.globalData.src + '/gourdbaby/childVideo/getChildVideoListftaction.action',
    util.post(app.globalData.src + '/gourdbaby/childVideo/getChildVideoInfoftaction.action',
      {
        videoId: vid,
        userId: wx.getStorageSync('userId'),
        childId: wx.getStorageSync("childList0")[0].childId
      }).then(function (res) {
        if (res.data.resultCode == 200) {
          let time = util.nowTime(res.data.resultData.videoDuration);
          let vtime = res.data.resultData.videoDuration
          if(vtime<60){
            _this.setData({
            // Minute: Math.floor(time/ 60),
              second: vtime
            })
          }else if(vtime<3600){
            _this.setData({
              Minute: Math.floor(vtime / 60),
              second: vtime % 60
            })
          } else{
            _this.setData({
              hour:1,
              Minute: Math.floor(vtime /60)-60,
              second: vtime % 60
            })
          }
          if (res.data.resultData.isCollect != 1) {
            _this.setData({
              collectShow: false
            })
          } else {
            _this.setData({
              collectShow: true
            })
          }
          _this.setData({
            timeZ: res.data.resultData.videoDuration,
            videoTime: time,
            // Minute:Math.floor(res.data.resultData.videoDuration/60),
            // hour: Math.floor(res.data.resultData.videoDuration /360),
            videoCount: res.data.resultData.countNum,
            video: res.data.resultData,
            title: res.data.resultData.videoTitle,
            //link: res.data.t.keyName,
            createTime: res.data.resultData.createTime.split(' ')[0]
          })
        }
      })
  },
  //开始时间和结束时间的获取
  startHour: function (e) {
    this.setData({
      startHour: e.detail.value
    })
  },
  startMinute: function (e) {
    this.setData({
      startMinute: e.detail.value
    })
  },
  startSecond: function (e) {
    this.setData({
      startSecond: e.detail.value
    })
  },
  ///----------------------
  endHour: function (e) {
    this.setData({
      endHour: e.detail.value
    })
  },
  endMinute: function (e) {
    this.setData({
      endMinute: e.detail.value
    })
  },
  endSecond: function (e) {
    this.setData({
      endSecond: e.detail.value
    })
  },

  videoName:function(e){
    this.setData({
      videoName: e.detail.value
    })
  },

  //提示  我知道了的关闭
  hintButtom(){
    this.setData({
      hint: false
    })
  },

  //确认
  //前往蓝光视频
  hintButtomSA(){
    this.hintButtomSB();
    wx.navigateTo({
      url: '/pages/nav/blueSave/blueSave',
    })
    
  },
  //关闭
  hintButtomSB(){
    this.setData({
      affirm: false,
    })
  },
  //视频剪切的确定
  codRow() {
   
    var that = this;
    
   
    var startHour = that.data.startHour;
    var startMinute = that.data.startMinute;
    var startSecond = that.data.startSecond;
    var endHour = that.data.endHour;
    var endMinute = that.data.endMinute;
    var endSecond = that.data.endSecond;


    //用户输入的时间   ： ：  格式
    //开始时间
    var cutStart = util.timeSwitch(startHour, startMinute, startSecond);
    //结束时间
    var cutEnd = util.timeSwitch(endHour, endMinute, endSecond);

  
    //用户输入的视频秒数
    var uStart = util.hmsSwitchS(startHour, startMinute, startSecond);
    var uEnd = util.hmsSwitchS(endHour, endMinute, endSecond);

    //1 开始时间  2.结束时间   -- 和用户输入的做比较

    if (that.data.videoName){
    }else{
      wx.showToast({
        title: '请填写视频的名字。',
        icon: 'none',
        duration: 1500
      })
      return
    }

    if (that.data.timeZ > uStart > 0 && that.data.timeZ > uEnd > 0 && uStart < uEnd){
      util.post(app.globalData.src + '/gourdbaby/videoCut/putVideoCutftaction.action',{
        videoId: that.data.vid,
        newVideoTitle: that.data.videoName,
        userId: wx.getStorageSync('userId'),
        childId: wx.getStorageSync('childList0')[0].childId,
        cutStartTime: cutStart,
        videoDuration:60,
        cutEndTime: cutEnd
      }).then(res =>{
        that.setData({
            disabled:true
          })
        if(res.data.resultCode == 200){
          wx.showModal({
            // title: '提示',
            content: '您剪辑的视频已完成,已为您保存至我的视频',
            confirmText: '我知道了',
            cancelText: '立即前往', 
            cancelColor: '#e98c2b',
            success(res) {
              if (res.confirm) {
              } else if (res.cancel) {
                wx.navigateTo({
                  url: '/pages/nav/blueSave/blueSave'
                })
              }
            }
          })
          // that.setData({
          //   hint: false,
          //   affirm: true,
          // })
        }else{
          wx.showToast({
            title: '剪辑失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
      wx.showToast({
        title: '剪辑视频时间已上传，请耐心等待返回结果',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '您输入的时间有误，请再次查看。',
        icon: 'none'
      })
    }
  },
  //剪切事件
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
    this.setData({
      typeHidden : true
    })
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
    }
    let that = this;
    return {
      title: this.data.title,
      imageUrl: this.data.video.image,
      path: 'pages/nav/videodetail/videodetail?data=' + this.data.vid
    }
  }
})