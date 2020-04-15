
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户是否在触摸
    isTouchMove: false,
    // x轴方向的偏移
    x: 0,
    // 当前x的值
    currentX: 0,
    lietT :true,
    list: [
      // {
      //   x: 0,
      //   title: '这里是内容区域0'
      // }
    ],
  },
// 上传下载 切片    elents  (主要是干打包的)    
// 
  handleMovableChange(e) {
    if (
      e.detail.source === 'touch' ||
      e.detail.source === 'touch-out-of-bounds'
    ) {
      this.data.isTouchMove = true;
    } else {
      this.data.isTouchMove = false;
    }
    this.data.currentX = e.detail.x;
  },
  handleTouchend(event, e) {
    let idx = event.currentTarget.dataset.idx;

    if (this.data.currentX < -46) {
      this.data.list[idx].x = -92;
      this.setData({
        list: this.data.list
      });
    } else {
      this.data.list[idx].x = 0;
      this.setData({
        list: this.data.list
      });
    }
  },
  listCot(){
    let _this = this
    if (_this.data.list){
      _this.setData({
        list: []
      })
    }
    util.post(app.globalData.src + '/gourdbaby/childVideo/getCollectChildVideoListftaction.action', {
      // childId: wx.getStorageSync('childList')[0].childId,
      childId: wx.getStorageSync("childList0")[0].childId,
      userId: wx.getStorageSync('userId')
    }).then(res => {
      if (res.data.resultCode == 200) {
        let time = res.data.resultData.map(item => {
          return util.nowTime(item.videoDuration)
        })
        let arr2 = res.data.resultData.map(item => {
          return item.createTime.split(' ')[0];
        })
        _this.setData({
          list: res.data.resultData,
          lietT : false,
          time: time,
          arr2: arr2
        })
      }else if (res.data.resultCode == 204){
          _this.setData({
            lietT: true,
            list: [],
          })
          wx.showToast({
            title: '暂无收藏',
            icon: 'none'
          })
      }
    })
  },
  handleTouchstart(){

  },
  videoClid(event){
    
    let id = event.currentTarget.dataset.id
      let type = event.currentTarget.dataset.type
      // url: "../nav/videodetail/videodetail",
      if(type==2){
        wx.navigateTo({
          url: "/pages/nav/wateVdetail/wateVdetail?data=" + id,
          // success: function (res) {
          //   // 通过eventChannel向被打开页面传送数据
          //   res.eventChannel.emit('acceptDataFromOpenerPage', {  })
          // }
        })
      }else{
        wx.navigateTo({
          url: "/pages/nav/videodetail/videodetail?data=" + id,
          // success: function (res) {
          //   // 通过eventChannel向被打开页面传送数据
          //   res.eventChannel.emit('acceptDataFromOpenerPage', {  })
          // }
        })
      }
  
  },
  handleDelete(event,e){
    let _this = this
    var vid = event.currentTarget.dataset.id
    wx.showModal({
      content: '是否取消收藏',
      success(res) {
        if (res.confirm) {
          util.post(app.globalData.src + '/gourdbaby/video/cancelCollectVideoftaction.action', {
            videoId: vid,
            userId: wx.getStorageSync('userId'),
            childId: wx.getStorageSync("childList0")[0].childId
          }).then(res => {
            if(res.data.resultCode == 200){
              _this.listCot();
              wx.showToast({
                title: '取消收藏成功',
                icon:'none'
              })
              
            }else{
              wx.showToast({
                title: '取消收藏失败',
                icon: 'none'
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.listCot();
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
  // onReachBottom: function () {
  //   var that = this;

  //     util.post(app.globalData.src + '/gourdbaby/childVideo/getCollectChildVideoListftaction.action',
  //     {
  //       userId: wx.getStorageSync('userId'),
  //       childId: wx.getStorageSync("childList0")[0].childId,
  //       lastVideoId: that.data.list[that.data.list.length - 1].videoId
  //     }).then(function (res) {
  //       if (res.data.resultCode == 200) {

  //         let time = res.data.resultData.map(item => {
  //           return util.nowTime(item.videoDuration)
  //         })
  //         let arr2 = res.data.resultData.map(item => {
  //           return item.createTime.split(' ')[0];
  //         })
  //         that.data.list = that.data.list.concat(res.data.resultData);
  //         that.data.time = that.data.time.concat(time);
  //         that.data.arr2 = that.data.time.concat(arr2);

  //         that.setData({
  //           list:that.data.list,
  //           lietT: false,
  //           time: time,
  //           arr2: arr2
  //         })
  //       } else if (res.data.resultCode == 204) {
  //         wx.showToast({
  //           title: '已经加载了全部数据',
  //           icon: 'none'
  //         });
  //       }
  //     })
  //   setTimeout(function () {
  //     wx.hideLoading();
  //   }, 1500)
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listCot()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})