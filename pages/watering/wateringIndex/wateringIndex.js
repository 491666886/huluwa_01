
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    twoTab: 0,
    currentTab: 2,
    navbar: [
      // {
      //   sot: '热门排行榜',
      //   id:1
      // },
      {
        sot: '幼儿读物',
        id: 2
      },
      {
        sot: '育儿助手',
        id: 3
      },
      // {
      //   sot: '购物商城',
      //   id: 4
      // },
      // {
      //   sot: '关注',
      //   id: 5
      // }
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
    listCot:[],
    inputVal:''
  },


  videoId: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/nav/wateVdetail/wateVdetail?data=" + id,
      // success: function (res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromOpenerPage', {  })
      // }
    })
  },
  searchVal(){
    let _this = this
    util.post(app.globalData.src + '/gourdbaby/gourdChildUser/searchVideoftaction.action', {
      pageNo: '1', //当前页数
      pageSize: '5', //每页条数
      searchTitle: this.data.inputVal,   //搜索关键字
      category: this.data.videoCot,   //标签
      childCard:'', //孩子身份证
      isCollect: 0   //是否收藏
    }).then(res => {
      if (res.data.resultCode == '200'){
        _this.setData({
          listCot: res.data.resultData
        })
      } else if (res.data.resultCode == '204'){
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
  watchIpt(e){
    this.setData({
      inputVal: e.detail.value
    })
  },
  swichNav: function (event) {
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
          if(res.data.t.length > 0){
            _this.setData({
              videoCot: res.data.t[0].categrayName
            })
            _this.cotList(_this.data.videoCot)
            _this.cotList(_this.data.videoCot)
          }else{
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
          return util.nowTime(item.videoDuration) })
        let arr2 = res.data.t.map(item => {
          return item.createTime.split(' ')[0];
        })
        if (res.data.status == 200) {
          _this.setData({
            listCot: res.data.t,
            time: time,
            arr2: arr2
          })
        }
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
    wx.showToast({
      title: '上拉加载了...',
      icon: 'none'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.navOt(2)
    this.cotList(this.data.videoCot)
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
    // this.onLoad()
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