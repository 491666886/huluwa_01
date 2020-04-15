
//获取应用实例
const app = getApp()
const util = require('../../utils/util')

Page({
  tapName: function (e) {
    var url = e.currentTarget.dataset.url;
    if (url == '../nav/onAccess/onAccess'){
      wx.showToast({
        title: '暂未开通',
        icon: 'none'
      })
    }else{
      if (url.split('=')[1] == '11111'){
        wx.showToast({
          title: '功能开发中~',
          icon: 'none'
        })
      }else{
        wx.navigateTo({
          url: url,
        })
      }
      
    }
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
  
    //写接口
    // let Listss = [{ "name": "张三", "age": 16 }, { "name": "s", "age": 0 }]
    // this.data.dynamicList = Listss.concat(this.data.dynamicList);

    this.gxList();
    //模拟加载
    setTimeout(function () {
      wx.showToast({
        title: '已经是最新啦~',
        icon: 'none'
      });
      // complete
      //必须停止
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },
  /**
   * 上拉加载
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;

    util.post(app.globalData.src + '/gourdbaby/childVideo/getChildVideoListftaction.action',
      {
        userId: wx.getStorageSync('userId'),
        childId: wx.getStorageSync("childList0")[0].childId,
        lastVideoId : that.data.dynamicList[that.data.dynamicList.length - 1].videoId
      }).then(function (res) {
        if(res.data.resultCode == 200){
          let time = res.data.resultData.map(item => {
            return util.nowTime(item.videoDuration)
          })
          let arr2 = res.data.resultData.map(item => {
            return item.createTime.split(' ')[0];
          })
          that.setData({
            dynamicList: that.data.dynamicList.concat(res.data.resultData),
            time: that.data.time.concat(time),
            arr2: that.data.arr2.concat(arr2)
          })
        } else if (res.data.resultCode == 204){
          wx.showToast({
            title: '已经加载了全部数据',
            icon: 'none'
          });
        }
      })

    // 页数+1
    //page = page + 1;
    // wx.request({
    //   url: 'https://xxx/?page=' + page,
    //   method: "GET",
    //   // 请求头部
    //   header: {
    //     'content-type': 'application/text'
    //   },
    //   success: function (res) {
    //     // 回调函数
    //     var moment_list = that.data.moment;
    //     const oldData = that.data.moment;
    //     that.setData({
    //       moment: oldData.concat(res.data.data)
    //     })
    //     // 隐藏加载框
    //     wx.hideLoading();
    //   }
    // })
    setTimeout(function () {
      wx.hideLoading();
    }, 1500)
  },
  videoId: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../nav/videodetail/videodetail?data="+id,
      // success: function (res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: id })
      // }
    })
  },
  data: {
    list: [
      {
        src: '/images/icon07.png',
        info: '班级活动',
        url: '../nav/common/common?title=班级活动&page=4'
      },
      {
        src: '/images/index/gg.png',
        info: '高光时刻',
        url: "../nav/moment/moment"
      },
      {
        src: '/images/index/languang.png',
        info: '我的视频',
        url: "../nav/blueSave/blueSave"
      },
     
      // {
      //   src: '/images/icon03.png',
      //   info: '焦点人物',
      //   url: "../nav/focus/focus?title=11111"
      // },
     

      // {
      //   src:'/images/icon01.png',
      //   info: '实时监控',
      //   url: "../nav/onAccess/onAccess"
      // },
      // {
      //   src: '/images/icon04.png',
      //   info: '学生签到',
      //   url: '../nav/common/common?title=学生签到&page=1',
        
      // }, 
      // {
      //   src: '/images/icon_xp.png',
      //   info: '学生排行榜',
      //   url: "/pages/My/ranking/ranking"
      // },
      // {
      //   src: '/images/icon05.png',
      //   info: '活动通知',
      //   url: '../nav/common/common?title=活动通知&page=2'
      // },
      // {
      //   src: '/images/icon06.png',
      //   info: '亲子互动',
      //   url: '../nav/common/common?title=亲子互动&page=3'
      // },
     
      // {
      //   src: '/images/icon08.png',
      //   info: '今日食谱',
      //   url: '../nav/common/common?title=今日食谱&page=5'
      // },
      // {
      //   src: '/images/icon09.png',
      //   info: '学校新闻',
      //   url: '../nav/common/common?title=学校新闻&page=6'
      // }
    ],
    dynamicList:[],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShowObj: false,
    childList:[],
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
    // util.get(app.globalData.src + '/gourdbaby/gourdChildUser/findVideoByChildCard.action',
    util.post(app.globalData.src + '/gourdbaby/childVideo/getChildVideoListftaction.action',
    {
      userId: wx.getStorageSync('userId'),
      childId: wx.getStorageSync("childList0")[0].childId
    }).then(function (res) {
      if (res.data.resultCode == 200) {
        let time = res.data.resultData.map(item => {
          return util.nowTime(item.videoDuration)
        })
        let arr2 = res.data.resultData.map(item => {
          return item.createTime.split(' ')[0];
        })
        _this.setData({
          dynamicList: res.data.resultData,
          time: time,
          arr2: arr2
        })
      } else if (res.data.resultCode == 204){
        wx.showLoading({
          title: '本宝宝没有拍摄视频哟~',
        })
        setTimeout(function () {
          wx.hideLoading()

        }, 2000)
        
        
      }
    })
  },
  onLoad: function (option) {
    if (!wx.getStorageSync("cardchrc")){
       wx.reLaunch({
         url: '/pages/login/login',
       })
    }
    if (wx.getStorageSync("childList0").length>0){
      this.gxList()
    }
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
  onShow: function (){
    this.onLoad()
    let _this = this
    if (wx.getStorageSync("cardchrc")) {
      if (wx.getStorageSync("childList0").length > 0){
        this.setData({
          isShowObj: false
        })
      }else{
        this.setData({
          isShowObj: true
        })
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(() => {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '您还未添加宝宝~',
            cancelText: '我再看看',
            confirmText: '前往添加',
            confirmColor: '#FE8637',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/handset/wsInfo/wsInfo',
                })
              } else if (res.cancel) {
                wx.switchTab({
                  url: '/pages/watering/wateringIndex/wateringIndex'
                })
              }
            }
          })
        }, 1000)
      }

      if (wx.getStorageSync("childList").length < 1) {
        this.setData({
          isShowObj: true
        })
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(() => {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '您还未添加宝宝~',
            cancelText: '我再看看',
            confirmText: '前往添加',
            confirmColor: '#FE8637',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/handset/wsInfo/wsInfo',
                })
              } else if (res.cancel) {
                wx.switchTab({
                  url: '/pages/watering/wateringIndex/wateringIndex'
                })
              }
            }
          })
        }, 1000)
      } else {
        util.get(app.globalData.src + '/gourdbaby/child/getChildListByUserId.action', {
          userId: wx.getStorageSync('userId')
        }).then(res => {
          if (res.data.resultCode == 200 && res.data.resultData.length >= 1) {
            wx.setStorageSync('childList', res.data.resultData)
          }
        })
        this.setData({
          isShowObj: false
        })
      }
    }
    
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
