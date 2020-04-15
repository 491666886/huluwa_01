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
        id: 1,
        name: '男'
      },
      {
        id: 2,
        name: '女'
      }
    ],
    name:'',
    school:'',
    Njgrade: '',
    Bjgrade: '',
    card:'',
    isImg: true,
    imgUrl:'',
    touchStartTime: 0, // 触摸开始时间
    touchEndTime: 0, // 触摸结束时间
    lastTapTime: 0 // 最后一次单击事件点击发生时间
  },
  // 防止重复点击
  touchStart(e) {
    this.touchStartTime = e.timeStamp;
  },
  touchEnd(e) {
    this.touchEndTime = e.timeStamp;
  },
  doubleTap(e) {
    var vm = this;
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (vm.touchEndTime - vm.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = e.timeStamp;
      var lastTapTime = vm.lastTapTime;
      // 更新最后一次点击时间
      vm.lastTapTime = currentTime;
      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime > 300) {
        // do something 点击事件具体执行那个业务
        vm.next()
      }
    }
  },
  
  // 选择头像
  chooseImage(){
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          isImg:false,
          imgUrl: tempFilePaths[0]
        })
        //将本地资源上传到服务器，客户端发起一个htpps post 请求，
        wx.uploadFile({
          url: app.globalData.src + '/gourdbaby/child/uploadChildImgftaction.action', 
          filePath: tempFilePaths[0],
          name: 'childImg',
          success: function (res) {
            var data = res.data
            _this.setData({
              postImg: JSON.parse(res.data).resultData.picUrl
            })
          }
        })

      }
    })
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
    var sex = this.data.objectArray[e.detail.value].name
    var sexId = this.data.objectArray[e.detail.value].id
    this.setData({
      index: e.detail.value,
      sex: sex,
      sexId: sexId
    })
  },
  next(){
    var name = this.data.name,
      sex = this.data.sexId,
      school = this.data.school,
      gradeB = this.data.Bjgrade,
      gradeN = this.data.Njgrade,
      card = this.data.card,
      img = this.data.imgUrl,
      postImg = this.data.postImg
    if (name && sex != "请选择" && school && gradeN && gradeB && card && img){
      util.get(app.globalData.src + '/gourdbaby/child/insertChild.action', {
        userId: wx.getStorageSync("userId"),
        childName: name, 
        childSex: sex, 
        schoolId: school, 
        grade: gradeN,
        classId: gradeB,
        childCard: card,
        childImg: postImg
      }).then( res =>{
        if (res.data.resultCode == 200){
          wx.navigateTo({
            url: '/pages/handset/examine/examine',
          })
        }else{
          wx.showToast({
            title: '添加失败，请重新填写',
            icon: 'none',
            duration: 2000
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