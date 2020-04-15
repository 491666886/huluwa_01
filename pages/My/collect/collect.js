
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_all: false,
    fotCt:'全选',
    checkAll:false,
    delId:[],
    listCot: [
      // {
      //   id:1,
      //   checked: false,
      //   value:'1111'
      // },
      // {
      //   id: 2,
      //   checked: false,
      //   value: '222'
      // },
      // {
      //   id: 3,
      //   checked: false,
      //   value: '333'
      // }
    ],
    pageOt:1,
    pageIndex: 1,
    checkstatus: [],
  },
  videoId: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/nav/videodetail/videodetail",
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: id })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    util.post(app.globalData.src + '/gourdbaby/video/videoListftaction.action', {
      childCard: 2,
      isCollect: 1,
      pageSize:3,
      }).then(function (res) {
        _this.setData({
          listCot: res.data.resultData.list,
          pageOt: Math.ceil(res.data.resultCode / 6)
        })
    })
  },
  checkboxChange(e){
    var item = e.detail.value 
    if (e.detail.value.length == 1){
      var checkid = e.target.dataset.checkid;
      this.setData({
        ['checkstatus[' + checkid + ']']: true,
      });
    }
  },
  // 全选
  checkedAll: function (e) {
    var listCot = this.data.listCot
    listCot.forEach( item => {
      item.checked = true
    })
    var arr = []
    listCot.forEach(item => arr.push(item.videoId))
    let checkAll = this.data.checkAll
    this.setData({
      checkAll: !checkAll,
      delId: arr
    })
    if (this.data.checkAll) {
      this.setData({
        fotCt: '取消'
      })
    } else {
      this.setData({
        fotCt: '全选'
      })
    }
  },

  // 删除
  del() {
    var listCot = this.data.listCot
    listCot.forEach(item => {
      item.checked = true
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
  onShareAppMessage: function () {

  }
})