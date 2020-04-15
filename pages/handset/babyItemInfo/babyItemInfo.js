import WeCropper from '../../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const system = device.system;
let height = device.windowHeight - 100

//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    isImg: true,
    info : {},
    img: [],
    body: false,
    // childName: '', //
    // schoolId: '',  //学校
    // grade: '',     //小班
    // classId: '',   //班级名字
    // childSex: '',  //性别
    // childCard: ''  //身份证
    cropperOpt: {
      id: 'cropper', // 用于手势操作的canvas组件标识符
      targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
      pixelRatio: device.pixelRatio, // 传入设备像素比
      width, // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        // 裁剪框x轴起点
        x: (width - 200) / 2,
        // 裁剪框y轴期起点
        y: (width - 200) / 2,
        width: 200, // 裁剪框宽度
        height: 200 // 裁剪框高度
      }
    }
  },
  Info(id) {
    util.get(app.globalData.src + '/gourdbaby/child/getChildInfo.action', {
      childId: id
    }).then(res => {
      if (res.data.resultCode == 200) {
        this.setData({
          info: res.data.resultData.childInfo
        })
      }
    })
  },

  uploadPhoto() {
    let that = this;
    that.chooseImg();
  },

  //上传图片
  uploadUserImg(src) {
    let that = this
    wx.uploadFile({
      url: app.globalData.fileSrc + '/gourdbaby/child/uploadHeadImgftaction.action',
      filePath: src,
      name: 'headImg',
      success: function (res) {
        if (res.statusCode == 200) {
          util.post(app.globalData.src + "/gourdbaby/child/editChildHeadImgftaction.action", {
            childId: wx.getStorageSync("childList0")[0].childId,
            childHeadImg: JSON.parse(res.data).resultData.picUrl
          }).then(res => {
            if (res.data.resultCode == 200) {
              wx.showToast({
                title: '头像上传成功', //标题
                icon: 'none' //图标 none不使用图标，详情看官方文档
              })
              wx.removeStorageSync("childImg")
              wx.setStorageSync("childImg", res.data.resultData.childHeadImg)
              that.setData({
                isImg: false,
                postImg: res.data.resultData.childHeadImg
              })
            } else if (res.data.resultCode == 500) {
              wx.showToast({
                title: '请求后-上传图片异常', //标题
                icon: 'none' //图标 none不使用图标，详情看官方文档
              })
            }
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '错误！',
          icon: 'none'
        })
      }
    })

  },
  chooseImg() {
    const self = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B
        if (tempFilesSize <= 2000000) { //图片小于或者等于2M时 可以执行获取图片
          if (src) {
            // 将图片参数传递给插件
            self.wecropper.pushOrign(src)
            self.setData({
              body: true,
              chooseImg: true,
              imgSrc: src,
              rotateI: 0
            })
          };
        } else {
          wx.showToast({
            title: '上传图片不能大于2M!', //标题
            icon: 'none' //图标 none不使用图标，详情看官方文档
          })
        }
      },
      fail(res) {
        wx.hideToast();
        wx.navigateBack()
      }
    })
  },

  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  // 获取裁剪后的图片
  getCropperImage() {
    let that = this;
    if (this.data.chooseImg) {
      this.wecropper.getCropperImage((src) => {
        //获取上个页面的参数
        let pages = getCurrentPages();
        //prevPage 相当于上个页面的this，可以通过setData修改上个页面参数执行上个页面的方法等
        let prevPage = pages[pages.length - 2]
        if (src) {
          that.uploadUserImg(src);
          that.setData({
            body: false
          })
        } else {
          wx.hideToast()
          wx.showToast({
            title: '获取图片地址失败，请稍后再试！',
          })
        }
      })
    } else {
      wx.showToast({
        title: '您还没选择图片！',
        icon: 'none'
      })
    }
  },
  cancleCropper() {
    this.setData({
      body: false
    })
    // wx.hideToast()
    // wx.navigateBack()
  },

  // 图片旋转
  rotateImg() {
    const self = this;
    let rotateI = this.data.rotateI + 1;
    this.setData({
      rotateI: rotateI
    })
    // 将旋转的角度传递给插件
    self.wecropper.updateCanvas(rotateI)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.Info(options.id);
    if (wx.getStorageSync("childImg")){
      this.setData({
        isImg: false,
        postImg: wx.getStorageSync("childImg")
      })
    }else{
      this.setData({
        isImg: true
      })
    }

    const self = this;
    //兼容可不写
    const system = device.system;
    if (system.indexOf('iOS') != -1) {
      this.setData({
        ios: true
      })
    };
    if (system.indexOf('iOS') != -1) {
      this.setData({
        marTop: 45
      })
    } else {
      this.setData({
        marTop: 45
      })
    };
    if (device.model.indexOf("iPhone X") != -1) {
      this.setData({
        height: wx.getStorageSync('height') * 2 + 50,
        marTop: 80
      })
    };
    // 判断来自哪个图片的裁剪  身份证、荣誉证书、营业证书等
    this.setData({
      cuttype: options.cuttype
    })
    //裁剪 插件配置
    const {
      cropperOpt
    } = this.data;
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        self.wecropper.updateCanvas(this.data.rotateI)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
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
    this.setData({
      info : {
        childName: wx.getStorageSync('childList0')[0].childName,  //名字
        schoolId: wx.getStorageSync('childList0')[0].schoolId,  //学校
        grade: wx.getStorageSync('childList0')[0].grade,     //小班
        classId: wx.getStorageSync('childList0')[0].classId,   //班级名字
        childSex: wx.getStorageSync('childList0')[0].childSex,  //性别
        childCard: wx.getStorageSync('childList0')[0].childCard  //身份证
      }
    })
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

// function upload(page, path) {
//   wx.showToast({
//     icon: "loading",
//     title: "正在上传"
//   })
//   // wx.uploadFile({
//   //   url: constant.SERVER_URL + "/FileUploadServlet",
//   //   filePath: path[0],
//   //   name: 'file',
//   //   header: {
//   //     "Content-Type": "multipart/form-data"
//   //   },
//   //   formData: {
//   //     //和服务器约定的token, 一般也可以放在header中
//   //     'session_token': wx.getStorageSync('session_token')
//   //   },
//   //   success: function(res) {
//   //     if (res.statusCode != 200) {
//   //       wx.showModal({
//   //         title: '提示',
//   //         content: '上传失败',
//   //         showCancel: false
//   //       })
//   //       return;
//   //     }
//   //     var data = res.data
//   //     page.setData({ //上传成功修改显示头像
//   //       src: path[0]
//   //     })
//   //   },
//   //   fail: function(e) {
//   //     wx.showModal({
//   //       title: '提示',
//   //       content: '上传失败',
//   //       showCancel: false
//   //     })
//   //   },
//   //   complete: function() {
//   //     wx.hideToast(); //隐藏Toast
//   //   }
//   // })
// }