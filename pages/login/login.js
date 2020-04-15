
//获取应用实例
const app = getApp()
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   * switch: false,
   */
  data: {
    switch:true,
    objList : []
  },
  phoneClid() {
    // 旧的逻辑
    // wx.navigateTo({
    //   url: '/pages/handset/verify/verify',
    // })
    if (this.data.switch) {
      wx.navigateTo({
        url: '/pages/loginIns/phoneLogin/phoneLogin',
      })
    } else {
      wx.showToast({
        title: '请勾选同意用户协议及隐私政策',
        icon: 'none'
      })
    }
  },
  switchChange: function (e) {
    this.setData({
      switch: e.detail.value
    })
  },

  getPhoneNumber: function (e) {
  },
  phoneWx(e){
    if (this.data.switch) {
      wx.showToast({
        title: '请勾选用户协议和隐私政策',
        icon: 'none'
      });
    }else{
     
    }
  },
  //用户协议
  userDeal(){
    wx.navigateTo({
      url: '/pages/deal/deal',
    })
  },
  //隐私政策
  userPolicy(){
    wx.navigateTo({
      url: '/pages/deal/police',
    })
  },
  paswordLogin() {
    if (this.data.switch) {
      wx.navigateTo({
        url: '/pages/passwordLogin/passwordLogin',
      })
    } else {
      wx.showToast({
        title: '请勾选同意用户协议及隐私政策',
        icon: 'none'
      })
    }
  },
  // 获取手机号
  getPhone(e) {
    if (!this.data.switch) {
      wx.showToast({
        title: '请勾选用户协议和隐私政策',
        icon: 'none'
      });
      return
    }
    if (e.detail.iv){
      wx.login({
        success: function (res) {
          //获取登录的临时凭证
          var code = res.code;
          wx.setStorageSync("loginCode", code)
          
          // 调用后端，获取微信的session_key,secret
          util.get(app.globalData.src + '/gourdbaby/login/code2session.action', {
            code: code,
            encStr: e.detail.encryptedData,
            iv: e.detail.iv
          }).then(function (res) {
            if(res.data.resultCode == 200){

              //添加当前用户
              wx.setStorageSync("childList", res.data.resultData.childList)
              wx.setStorageSync("childList0", [wx.getStorageSync('childList')[0]]);
              wx.setStorageSync("childImg", wx.getStorageSync('childList')[0].childImg)

              //添加用户信息
              wx.setStorageSync("session_key", res.data.resultData.session_key)
              wx.setStorageSync("openid", res.data.resultData.openid)
              wx.setStorageSync("phone", res.data.resultData.phoneNumber)
              wx.setStorageSync("cardchrc", '1')
              wx.setStorageSync("nickName", res.data.resultData.nickName)
              wx.setStorageSync("userId", res.data.resultData.userId)
              wx.setStorageSync("token", res.data.resultData.session_key)
              wx.setStorageSync("userImg", res.data.resultData.headImg)
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }else{
              wx.showToast({
                title: '授权登录失败，请从新登录',
                icon: 'none'
              })
            }
          }).catch(error => {
            wx.showToast({
              title: '授权登录失败，请从新登录',
              icon: 'none'
            })
          })
        }
      })
    }else{
      wx.showToast({
        title: '请允许授权，使用小程序',
        icon:'none'
      })
    }
  },
  //登录
  doLogin: function (e) {
    let src = app.globalData.src
    if (this.data.switch){
      wx.login({
        success: function (res) {
          //获取登录的临时凭证
          var code = res.code;
          // 调用后端，获取微信的session_key,secret
          util.get('http://192.168.2.164:8088/gourdbaby/login/code2session.action', {
            code: code
          }).then(function (res) {
          })
        }
      })
    }else{
      wx.showToast({
        title: '请勾选同意用户协议及隐私政策',
        icon:'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // util.showModalPromisified({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
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