// pages/nav/moment/moment.js
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynamicList: '',
  },
  gxList() {
    let _this = this;
    console.log(app.globalData.src);
    util.get(app.globalData.src + 'gourdbaby/gourdChildUser/findVideoByChildCardAndCategory.action',     {
      childCard: 2,
      pageNo: 1,
      pageSize: 10,
      category: '高光时刻',
    }).then(function(res) {
      if (res.data.status == 200) {
        const list = res.data.t;
        list.forEach(({
          createTime
        }) => {
          var sdate = new Date(createTime.replace(/-/g, "/"));
          var now = new Date();
          var days = now.getTime() - sdate.getTime();
          var day = parseInt(days / (1000 * 60 * 60 * 24));
          let array = [];
          list.map((item, index) => {
            array.push(
              Object.assign({}, item, {
                retime: 7 - day  //视频剩余时间计算结果
              })
            )
          });
          _this.setData({
            dynamicList: array
          })
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.gxList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})