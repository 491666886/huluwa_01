const app = getApp()
const util = require('../../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    babyList:[],
    nickName:'',
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
    objectArray: [
      // {
      //   id: 0,
      //   childName: '添加宝宝'
      // }
    ],
    babyName:'添加宝宝',
    childImg:'',
    userImg:'',
    isOnShow: 0
  },
  myQuestion(){
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },
  myNews(){
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },
  myOrder(){
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },
  // 我的钱包
  myMoney(){
    // wx.showToast({
    //   title: '功能开发中',
    //   icon: 'none'
    // })
    wx.navigateTo({
      url: '/pages/My/myMoney/myMoney',
    })
  },
  addBaby(){
    wx.navigateTo({
      url: '/pages/handset/wsInfo/wsInfo',
    })
  },
  //跳转到我的钱包
  myMoney(){
    wx.navigateTo({
      url: '/pages/My/myMoney/myMoney',
    })
  },
// 跳转积分页面
  integralClid(){
    wx.navigateTo({
      url: '/pages/My/integral/integral',
    })
  },

  //切换时候
  bindPickerChange: function (e) {
    if (this.data.objectArray[e.detail.value].childName == '添加宝宝'){
      wx.navigateTo({
        url: '/pages/handset/wsInfo/wsInfo',
      })
    }else{
      //删除之前的宝宝
      wx.removeStorageSync('childList0')
      wx.removeStorageSync('childImg')
      wx.removeStorageSync('childName')
      wx.setStorageSync('childName', this.data.objectArray[e.detail.value].childName)
      wx.setStorageSync('childImg', this.data.objectArray[e.detail.value].childImg)

      this.setData({
        babyList : [{
          checkStatus: this.data.objectArray[e.detail.value].checkStatus,
          childCard: this.data.objectArray[e.detail.value].childCard,
          childId: this.data.objectArray[e.detail.value].childId,
          childImg: this.data.objectArray[e.detail.value].childImg,
          childName: this.data.objectArray[e.detail.value].childName,
          childNum: this.data.objectArray[e.detail.value].childNum,
          childSex: this.data.objectArray[e.detail.value].childSex,
          classId: this.data.objectArray[e.detail.value].classId,
          grade: this.data.objectArray[e.detail.value].grade,
          schoolId: this.data.objectArray[e.detail.value].schoolId
        }]
      })
      
      wx.setStorageSync('childList0', this.data.babyList)

      this.setData({
        //babyName: wx.getStorageSync('childName'),
        childImg: wx.getStorageSync('childImg')
      })
    }
    wx.removeStorageSync('personIndex')
    wx.setStorageSync('personIndex', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  scCild(){
    // wx.navigateTo({
    //   url: '/pages/My/collect/collect',
    // })
    wx.navigateTo({
      url: '/pages/My/collectCeshi/collectCeshi',
    })
  },
  //跳转到妈妈
  userInfo(){
    wx.navigateTo({
      url: '/pages/My/basicInfo/basicInfo',
    })
  },
  //跳转到宝宝
  babyInfo(){
    wx.navigateTo({
      url: '/pages/handset/babyItemInfo/babyItemInfo',
    })
  },
  // 退出登录
  Logout(){
    wx.showModal({
      title: '是否退出登录',
      success(res) {
        if (res.confirm) {
          // 清楚当前页的数据
          wx.removeStorageSync('personIndex')

          // 清除当前宝宝和用户信息
          wx.removeStorageSync('childList')
          wx.removeStorageSync('childList0')
          wx.removeStorageSync('childImg')
        
          wx.removeStorageSync('session_key')
          wx.removeStorageSync('openid')
          wx.removeStorageSync('phone')
          wx.removeStorageSync('cardchrc')
          wx.removeStorageSync('nickName')
          wx.removeStorageSync('userId')
          wx.removeStorageSync('userImg')
          wx.removeStorageSync('token')

          wx.reLaunch({
            url: '/pages/login/login'
          })
          // 删除登录状态
          // wx.removeStorageSync('cardchrc')
          wx.clearStorage()
        } else if (res.cancel) {
        }
      }
    })
  },
  baby() {
    let _this = this
    util.get(app.globalData.src + '/gourdbaby/child/getChildListByUserId.action', {
      userId: wx.getStorageSync('userId')
    }).then(res => {
      if (res.data.resultCode == 200) {
        let aa = res.data.resultData.concat(_this.data.objectArray)
        _this.setData({
          objectArray: aa
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    // util.get(app.globalData.src + '/gourdbaby/child/getChildListByUserId.action', {
    //   userId: wx.getStorageSync('userId')
    // }).then(res => {
    //   if (res.data.resultCode == 200 && res.data.resultData.length > 0) {
    //     this.baby()
    //     console.log('111')
    //     this.setData({
    //       isOnShow:1
    //     })
    //   } else {
    //     console.log('错误')
    //     this.setData({
    //       isOnShow: 0
    //     })
    //   }
    // })
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
    //加载账户余额
    //加载我的积分
    //加载妈妈和宝宝的头像，(注意: 切换宝宝的时候也要把宝宝的头像切换掉。)
    
    if (wx.getStorageSync('personIndex')) {
      this.setData({
        index: wx.getStorageSync('personIndex'),
        babyName: wx.getStorageSync('childName')
      })
    }
    if (wx.getStorageSync("userImg")) {
      this.setData({
        userImg: wx.getStorageSync("userImg")
      })
    }
    if (wx.getStorageSync("childImg")) {
      this.setData({
        childImg: wx.getStorageSync("childImg")
      })
    }
  // ----------------------------孩子信息再次请求---------------------------------------------------
    let _this = this

    util.get(app.globalData.src + '/gourdbaby/child/getChildListByUserId.action', {
      userId: wx.getStorageSync('userId')
    }).then(res => {
      if (res.data.resultCode == 200 && res.data.resultData.length > 0) {
        wx.setStorageSync('childList', res.data.resultData)
        _this.setData({
          babyList : res.data.resultData,
          objectArray: res.data.resultData
        })
        let name = wx.getStorageSync('childList')[0].childName
        if (!wx.getStorageSync('userName')) { //判断缓存是否有用户名

        ///妈妈和孩子的图片-->用户id
          wx.setStorageSync('childId', wx.getStorageSync('childList0')[0].childId)
          wx.setStorageSync('userName', name)
          //childImg: wx.getStorageSync('childImg'),
          _this.setData({
            babyName: name,
            nickName: wx.getStorageSync('nickName'),  //有孩子设置成第一个孩子的名字
          })
        } else {
          // childImg: wx.getStorageSync('childImg'),
          _this.setData({
            babyName: name,
            nickName: wx.getStorageSync('nickName'),
          })
        }
      } else {
        // --------------------没有孩子----------------------
        wx.setStorageSync('childList', [])
        _this.setData({
          objectArray: [],
          babyList: [],
          childImg: '',
          nickName: wx.getStorageSync('nickName'),  //没有孩子设置成游客名字
          babyName: wx.getStorageSync('userName'),
        })
      }
    })


    // if (this.data.isOnShow){
    //   console.log('cesss')
    // }
    // if (wx.getStorageSync('childList').length > 0) {
    //   console.log('有孩子')
    //   let name = wx.getStorageSync('childList')[0].childName
    //   console.log(name)
    //   if (!wx.getStorageSync('userName')){ //判断缓存是否有用户名
    //   console.log('uerName')
    //     wx.setStorageSync('userName', name)
    //     _this.setData({
    //       img: wx.getStorageSync('childList')[0].childImg,
    //       babyName: name,
    //       nickName: wx.getStorageSync('userName'),  //有孩子设置成第一个孩子的名字
    //     })
    //   }else{
    //     _this.setData({
    //       babyName: wx.getStorageSync('userName'),
    //       nickName: wx.getStorageSync('userName'), 
    //     })
    //   }
    // }else{
    //   console.log('没有孩子')
    //   console.log(wx.getStorageSync('userName'))
    //   _this.setData({
    //     objectArray:[],
    //     img: '',
    //     nickName: wx.getStorageSync('nickName')  //没有孩子设置成游客名字
    //   })
    // }
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '快来一起观看***宝宝的精彩校园视频吧！',
      path: '/pages/index/index',
      imageUrl:'/images/login.png',
      success: function (res) {
        console.log('成功', res)
      }

    }
  }
})