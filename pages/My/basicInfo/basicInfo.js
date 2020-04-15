import WeCropper from '../../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const system = device.system;
let height = device.windowHeight - 100

const app = getApp()
const util = require('../../../utils/util')
let cropper = null;
let tsBady = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    imgUrl: '',
    img: [],
    isImg: true,
    body: false,
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
  baby() {
    wx.navigateTo({
      url: '/pages/handset/babyInfo/babyInfo',
    })
  },
  cropImage: function(img, ops) {

    // 图片原始尺寸；
    let imgOriginWidth = img.naturalWidth,
      imgOriginHeight = img.naturalHeight;

    // 图片长宽比，保证图片不变形；
    let imgRatio = imgOriginWidth / imgOriginHeight;

    // 图片裁剪后的宽高， 默认值为原图宽高；
    let imgCropedWidth = ops.width || imgOriginWidth,
      imgCropedHeight = ops.height || imgOriginHeight;

    // 计算得出起始坐标点的偏移量, 由于是居中裁剪，因此等于 前后差值 / 2；
    let dx = (imgCropedWidth - imgOriginWidth) / 2,
      dy = (imgCropedHeight - imgOriginHeight) / 2;

    // 创建画布，并将画布设置为裁剪后的宽高；
    let cvs = document.createElement('canvas');
    let ctx = cvs.getContext('2d');
    cvs.width = imgCropedWidth;
    cvs.height = imgCropedHeight;

    // 绘制并导出图片；
    ctx.drawImage(img, dx, dy, imgCropedWidth, imgCropedWidth / imgRatio);
    return cvs.toDataURL('image/jpeg', 0.9);
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
      success: function(res) {
        if (res.statusCode == 200) {
          util.post(app.globalData.src + "/gourdbaby/userInfo/editUserHeadImgftaction.action", {
            userId: wx.getStorageSync("userId"),
            userHeadImg: JSON.parse(res.data).resultData.picUrl
          }).then(res => {
            if (res.data.resultCode == 200) {
              wx.showToast({
                title: '头像上传成功', //标题
                icon: 'none' //图标 none不使用图标，详情看官方文档
              })
              wx.removeStorageSync("userImg")
              wx.setStorageSync("userImg", res.data.resultData.userHeadImg)
              //改变 用户的userimg
              that.setData({
                isImg: false,
                imgUrl: res.data.resultData.userHeadImg
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
          title: '失败',
          icon: 'none'
        })
      }
    })

  },

  // 修改手机号
  // 测试注释掉，后期打开
  // alterPhone() {
  //   wx.navigateTo({
  //     url: '/pages/handset/replacePhone/replacePhoneNet',
  //   })
  // },
  // 修改昵称
  // 测试注释掉，后期打开
  xgname() {
    wx.navigateTo({
      url: '/pages/handset/reviseName/reviseName',
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
    if (wx.getStorageSync("userImg")) {
      this.setData({
        isImg: false,
        imgUrl: wx.getStorageSync("userImg")
      })
    } else {
      this.setData({
        isImg: true
      })
    };

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
    //wx.getStorageSync('userName')
    //img
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.setStorageSync('that', false)
    var name = ''
    if (wx.getStorageSync('nickName')) {
      name = wx.getStorageSync('nickName')
    }
    this.setData({
      name: name,
      phone: wx.getStorageSync('phone')
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