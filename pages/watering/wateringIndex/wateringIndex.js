
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    twoTab: 0,
    currentTab: 1,
    navbar: [
      {
        sot: '热门排行榜',
        id:1
      },
      {
        sot: '幼儿读物',
        id: 2
      },
      {
        sot: '育儿助手',
        id: 3
      },
      {
        sot: '购物商城',
        id: 4
      },
      {
        sot: '关注',
        id: 5
      }
    ],
    twoList:[
      {
        cot:'是的发送到',
        id:1,
      },
      {
        cot: '发光飞碟',
        id: 2,
      },
      {
        cot: '方法',
        id: 3,
      }
    ],
    listCot:['1','2','3']
  },
  watchIpt(e){
    console.log(e.detail.value)
  },
  swichNav: function (event) {
    console.log(this.data.videoCot)
    var idx = event.currentTarget.dataset.current
    this.navOt(idx)
    this.setData({
      currentTab: idx,
      twoTab:0
    })
  },
  twoCid:function (e) {
    var cot = this.data.twoList[e.currentTarget.dataset.cotnum].categrayName
    this.cotList(cot)
    this.setData({
      twoTab: e.currentTarget.dataset.cotnum,
      videoCot: cot
    })
  },
  navOt(num) {
    let _this = this
    wx.request({
      url: app.globalData.src + '/gourdbaby/gourdChildUser/findMenuInfoByMenuId.action',
      data: {
        menuId: num
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.status == 200) {
          _this.setData({
            twoList: res.data.t
          })
          console.log(res.data.t.length)
          if(res.data.t.length > 0){
            _this.setData({
              videoCot: res.data.t[0].categrayName
            })
            _this.cotList(_this.data.videoCot)
            _this.cotList(_this.data.videoCot)
          }else{
            console.log('2222222222')
            _this.setData({
              videoCot: ''
            })
            _this.cotList(_this.data.videoCot)
          }
        }
      }
    })
  },
  cotList(cot){
    let _this = this
    wx.request({
      url: app.globalData.src + '/gourdbaby/gourdChildUser/findVideoByChildCardAndCategory.action',
      data: {
        childCard: 2,
        category: cot
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        let time = res.data.t.map(item => {
          console.log(item)
          return util.nowTime(item.videoDuration) })
        console.log(time)
        if (res.data.status == 200) {
          _this.setData({
            listCot: res.data.t,
            time: time
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.navOt(1)
    this.cotList(this.data.videoCot)
    console.log(this.data.videoCot)
    console.log(util.nowTime(100))
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