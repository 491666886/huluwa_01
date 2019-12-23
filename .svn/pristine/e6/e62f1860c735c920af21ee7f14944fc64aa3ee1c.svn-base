//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    sex:'请选择',
    objectArray: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      }
    ],
    name:'',
    school:'',
    Njgrade: '',
    Bjgrade: '',
    card:''
  },
  name: function (e) {
    this.setData({
      name: e.detail.value.replace(/\s*/g, "")
    })
  },
  school(e){
    this.setData({
      school: e.detail.value.replace(/\s*/g, "")
    })
  },
  Njgrade(e){
    this.setData({
      Njgrade: e.detail.value.replace(/\s*/g, "")
    })
  },
  Bjgrade(e) {
    this.setData({
      Bjgrade: e.detail.value.replace(/\s*/g, "")
    })
  },
  card(e){
    this.setData({
      card: e.detail.value.replace(/\s*/g, "")
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log()
    var sex = this.data.objectArray[e.detail.value].name
    this.setData({
      index: e.detail.value,
      sex: sex
    })
  },
  next(){
    var name = this.data.name,
      sex = this.data.sex,
      school = this.data.school,
      gradeB = this.data.Bjgrade,
      gradeN = this.data.Njgrade,
      card = this.data.card
    
    if (name && sex != "请选择" && school && gradeN && gradeB && card){
      console.log(name)
      console.log(sex)
      console.log(school)
      console.log(gradeN)
      console.log(gradeB)
      console.log(card)
      util.get(app.globalData.src + '/gourdbaby/gourdChildUser/insertUserInfo.action', {
        childName: name, 
        sex: sex, 
        school: school, 
        classId: gradeN,
        gradeId: gradeB,
        childCard: card,
        phone:652112213
      }).then( res =>{
        console.log(res)
        if(res.data.status == 200){
          wx.reLaunch({
            url: '../../index/index',
          })
        }
      })
    }else{
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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