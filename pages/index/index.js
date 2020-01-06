
//获取应用实例
const app = getApp()
const util = require('../../utils/util')

Page({
  tapName: function (e) {
    var url = e.currentTarget.dataset.url;
   
    wx.navigateTo({
      url: url,
     
    })
  },
  videoId: function (e) {
    var id = e.currentTarget.dataset.id;
   
    wx.navigateTo({
      url: "../nav/videodetail/videodetail",
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: id })
      }
    })
  },
  data: {
    list: [
      {
        src:'/images/icon01.png',
        info: '实时监控',
        url: "../nav/onAccess/onAccess"
      },
      {
        src: '/images/icon02.png',
        info: '高光时刻',
        url: "../nav/moment/moment"
      },
      {
        src: '/images/icon03.png',
        info: '焦点人物',
        url: "../nav/focus/focus"
      },
      {
        src: '/images/icon04.png',
        info: '学生签到',
        url: '../nav/common/common?title=学生签到&page=1',
        
      }, 
      {
        src: '/images/icon_xp.png',
        info: '学生排行榜',
        url: "/pages/My/ranking/ranking"
      },
      {
        src: '/images/icon05.png',
        info: '活动通知',
        url: '../nav/common/common?title=活动通知&page=2'
      },
      {
        src: '/images/icon06.png',
        info: '亲子互动',
        url: '../nav/common/common?title=亲子互动&page=3'
      },
      {
        src: '/images/icon07.png',
        info: '班级活动',
        url: '../nav/common/common?title=班级活动&page=4'
      },
      {
        src: '/images/icon08.png',
        info: '今日食谱',
        url: '../nav/common/common?title=今日食谱&page=5'
      },
      {
        src: '/images/icon09.png',
        info: '学校新闻',
        url: '../nav/common/common?title=学校新闻&page=6'
      }
    ],
    dynamicList:'1234',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 动态更新
 

  gxList(){
    let _this = this
    util.get(app.globalData.src + '/gourdbaby/gourdChildUser/findVideoByChildCard.action', 
    {
      childCard: 2
    }).then(function (res) {
      console.log(res.data.t)
      if (res.data.status == 200) {
        let time = res.data.t.map(item => {
          return util.nowTime(item.videoDuration)
        })
        _this.setData({
          dynamicList: res.data.t,
          time: time
        })

      }
    })
  },
  onLoad: function () {
    console.log(wx.getStorageSync("openid"))
    if (!wx.getStorageSync("cardchrc")){
       wx.reLaunch({
         url: '/pages/login/login',
       }) 
    }

    this.gxList()
    

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
