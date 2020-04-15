//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "", 
    page:'',
    inputVal:''
  },
  onShow: function (e){
  },
  videoId: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/nav/videodetail/videodetail?data=" + id,
      // success: function (res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: id })
      // }
    })
  },
  searchVal(){
    let _this = this
    util.post(app.globalData.src + '/gourdbaby/childVideo/getChildVideoListftaction.action',
    {
      userId: wx.getStorageSync('userId'),
      category: '班级活动',
      childId: wx.getStorageSync("childList0")[0].childId,
      // pageNo: '1', //当前页数
      // pageSize: '5', //每页条数
      searchTitle: this.data.inputVal,   //搜索关键字
      //category: this.data.inputVal,
    }).then(res => {
      if (res.data.resultCode == 200) {
        _this.setData({
          // listCot:[],
          // listCot: res.data.resultData

          dynamicList: res.data.resultData
        })
      } else if (res.data.resultCode == 204) {
        wx.showToast({
          title: '暂无数据',
          icon: 'none'
        })
        _this.setData({
          listCot: []
        })
      }
    })
  },
  watchIpt(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  gxList() {
    let _this = this
    ///searchTitle: 
    var data = {}
    if (this.data.inputVal){
      data = {
        userId: wx.getStorageSync('userId'),
        category: '班级活动',
        childId: wx.getStorageSync("childList")[0].childId,
        searchTitle: this.data.inputVal,
      }
    } else{
      data = {
        userId: wx.getStorageSync('userId'),
        category: '班级活动',
        childId: wx.getStorageSync("childList")[0].childId,
      }
    }
    util.post(app.globalData.src + '/gourdbaby/childVideo/getChildVideoListftaction.action',data).then(function (res) {
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

        }
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //写接口

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;

    util.post(app.globalData.src + '/gourdbaby/childVideo/getChildVideoListftaction.action',
      {
        userId: wx.getStorageSync('userId'),
        childId: wx.getStorageSync("childList0")[0].childId,
        lastVideoId: that.data.dynamicList[that.data.dynamicList.length - 1].videoId
      }).then(function (res) {
        if (res.data.resultCode == 200) {
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
        } else if (res.data.resultCode == 204) {
          wx.showToast({
            title: '已经加载了全部数据',
            icon: 'none'
          });
        }
      })
    setTimeout(function () {
      wx.hideLoading();
    }, 1500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      page: options.page,
    });
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
    let pageid = this.data.title;
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
    
    if (this.data.page == 4) {
      this.gxList()
    }
    
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})