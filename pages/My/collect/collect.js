
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkAll:false,
    delId:[],
    listCot: [
      {
        id:1,
        checked: false,
        value:'1111'
      },
      {
        id: 2,
        checked: false,
        value: '222'
      },
      {
        id: 3,
        checked: false,
        value: '333'
      }
    ],
    pageOt:1,
    pageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    // 调用后端，获取微信的session_key,secret
    util.post(app.globalData.src + '/gourdbaby/video/videoListftaction.action', {
      childCard: 2,
      isCollect: 1,
      pageSize:6,
      }).then(function (res) {
        
        _this.setData({
          listCot: res.data.resultData.list,
          pageOt: Math.ceil(res.data.resultCode / 6)
        })
    })
    // wx.request({
    //   url: app.globalData.src + '/gourdbaby/video/videoListftaction.action', 
    //   data: {
    //     childCard:2
    //   },
    //   method: 'POST',
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })
  },
  checkboxChange(e){
    var listCot = this.data.listCot
    let arrs = this.data.listCot
    let index = e.currentTarget.dataset.index
    if (arrs[index].checked == false) {
      arrs[index].checked = true;
    } else {
      arrs[index].checked = false;
    }
    var listCotNew = listCot.filter((value, key, arr) => {
      return value.checked == true ? value.id : false;
    })
    this.setData({
      listCot: arrs
    })
    var arr = []
    listCotNew.forEach(item => arr.push(item.id) )
    this.setData({
      delId: arr
    })
    console.log(this.data.delId)
  },
  // 全选
  checkedAll: function (e) {
    console.log(321)
    var listCot = this.data.listCot
    listCot.forEach( item => {
      console.log(item)
      item.checked = true
    })
    console.log(this.data.listCot)
    var arr = []
    listCot.forEach(item => arr.push(item.id))
    this.setData({
      checkAll: true,
      delId: arr
    })
  },

  // 删除
  del(){
    console.log(this.data.delId)
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
  contListIn(page,size){
    wx.showLoading({
      title: '玩命加载中',
    })
    let _this = this
    util.post(app.globalData.src + '/gourdbaby/video/videoListftaction.action', {
      childCard: 2,
      isCollect: 1,
      pageNo: page,
      pageSize: size
    }).then(function (res) {
      let list = _this.data.listCot
      _this.setData({
        listCot: list.concat(res.data.resultData.list),
      })
      wx.hideLoading()
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var pageSin = this.data.pageOt
    var pageIndex = this.data.pageIndex
    console.log(pageSin)
    pageIndex ++
    this.setData({
      pageIndex: pageIndex
    })
    console.log(this.data.pageIndex)
    if (pageIndex < pageSin){
      this.contListIn(pageIndex, 2)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})