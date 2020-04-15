
//获取应用实例
const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx:0,
    list:[
      {
        val:'899/T'
      },

      {
        val: '449/500G'
      },
      {
        val: '49/50G'
      },
      {
        val: '10/10G'
      }
    ],
    val: '899/T',
    userPercent:0,
    userP: 0,
    total:0
  },
  pay() {
    wx.showToast({
      title: '功能开发中~',
      icon: 'none'
    })
  },
  sheng(){
    
    wx.showToast({
      title: '线上支付暂未开放，联系幼儿园线下支付~',
      icon: 'none'
    },1500)

    // var that = this;
    // var code = wx.getStorageSync('loginCode')
    // wx.request({
    //   url: "https://api.weixin.qq.com/sns/jscode2session?appid=wxebdfba8115ce3577&secret=d8aac26a5a9c16266d1a23851ebb7d9b&js_code=" + code + "&grant_type=authorization_code",
    //   method: 'GET',
    //   success: function(res){
    //     //统一支付签名
    //     var appid = '' //appid
    //     var body = '' //商户名
    //     var mch_id = '' //商户号
    //     var nonce_str = that.randomString; //随机数，字符串，不长于32位
    //     var notify_url = '' ; //通知地址
    //     var spbill_create_ip = ''; // ip
    //     var total_fee = 100;
    //     var trade_type = "JSAPI";
    //     var key = '';
    //     var unifiedPayment = 'appid=' + appid + '&body=' + body + '&mch_id=' + mch_id + '&nonce_str=' + nonce_str + '¬ify_url=' + notify_url + '&openid=' + res.data.openid + '&out_trade_no=' + that.data.paySn + '&spbill_create_ip=' + spbill_create_ip + '&total_fee=' + total_fee + '&trade_type=' + trade_type + '&key=' + key;
    //     var sign = MD5.MD5(unifiedPayment).toUpperCase();
    //     console('sign ： ',sign);

    //     //封装统一支付xml参数
    //     var formData = "<xml>"
    //     formData += "<appid>" + appid + "</appid>"
    //     formData += "<body>" + body + "</body>"
    //     formData += "<mch_id>" + mch_id + "</mch_id>"
    //     formData += "<nonce_str>" + nonce_str + "</nonce_str>"
    //     formData += "<notify_url>" + notify_url + "</notify_url>"
    //     formData += "<openid>" + res.data.openid + "</openid>"
    //     formData += "<out_trade_no>" + that.data.paySn + "</out_trade_no>"
    //     formData += "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>"
    //     formData += "<total_fee>" + total_fee + "</total_fee>"
    //     formData += "<trade_type>" + trade_type + "</trade_type>"
    //     formData += "<sign>" + sign + "</sign>"
    //     formData += "</xml>"

    //     //统一支付
    //     wx.request({
    //       url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
    //       method: 'POST',
    //       head: 'application/x-www-form-urlencoded',
    //       data: formData, //设置请求 header
    //       success: function (res){
    //         console.log("统一支付res-->，",res)

    //         var result_code = that.getXMLNodeValue('result_code',res.data.toString('utf-8'))
    //         var resultCode = result_code.split('[')[2].split(']')[0]

    //         if(resultCode == 'FALL'){
    //           var err_code_des = that.getXMLNodeValue('err_code_des', res.data.toString("utf-8"))
    //           var errDes = err_code_des.split('[')[2].split(']')[0]
    //           wx.navigateBack({
    //             delta: 1, // 回退前 delta(默认为1) 页面
    //             success: function (res) {
    //               wx.showToast({
    //                 title: errDes,
    //                 icon: 'success',
    //                 duration: 2000
    //               })
    //             },
    //           })
    //         } else {
    //           //发起支付
    //           var prepay_id = that.getXMLNodeValue('prepay_id', res.data.toString("utf-8"))
    //           var tmp = prepay_id.split('[')
    //           var tmp1 = tmp[2].split(']')
    //           //签名
    //           var key = '';
    //           var appId = '';
    //           var timeStamp = that.createTimeStamp();
    //           var nonceStr = that.randomString();
    //           var stringSignTemp = "appId=&nonceStr=" + nonceStr + "&package=prepay_id=" + tmp1[0] + "&signType=MD5&timeStamp=" + timeStamp + "&key="
    //           var sign = MD5.MD5(stringSignTemp).toUpperCase()
    //           console.log(sign)
    //           var param = { "timeStamp": timeStamp, "package": 'prepay_id=' + tmp1[0], "paySign": sign, "signType": "MD5", "nonceStr": nonceStr }
    //           that.pay(param)
    //         }
    //       }
    //     })

    //   },
    //   fail: function () {
    //     // fail
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })
  },
  /* 随机数 */
  randomString: function () {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < 32; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  /* 获取prepay_id */
  getXMLNodeValue: function (node_name, xml) {
    var tmp = xml.split("<" + node_name + ">")
    var _tmp = tmp[1].split("</" + node_name + ">")
    return _tmp[0]
  },

  /* 时间戳产生函数   */
  createTimeStamp: function () {
    return parseInt(new Date().getTime() / 1000) + ''
  },

  monClid(event){  
    this.setData({
      idx: event.currentTarget.dataset.idx,
      val: event.currentTarget.dataset.val
    })
  },
  pay: function (param) {
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接口（获取用户存储空间），参数userId（用户id），返回参数{"allSaveSpace":全部空间,"usedSpace":已用空间}
    // 返回单位为字节(byte)，需要手动转换成MB或GB
    util.post(app.globalData.src + '/gourdbaby/saveVideo/getUserSpaceftaction.action',
    {
      userId: wx.getStorageSync('userId')
    }).then(res => {
      var userPercent = util.getPercent(res.data.resultData.usedSpace, res.data.resultData.allSaveSpace)
      // if (parseInt(userP)>=100){
      //   userP = 100
      // }
      //1.当前数  2.总数
      if (res.data.resultData.allSaveSpace>0){
        this.setData({
          userP: util.change(res.data.resultData.usedSpace),
          total: util.change(res.data.resultData.allSaveSpace),
          userPercent: userPercent
        })
      }

      this.setData({
        first: this.data.total.substr(this.data.total.length - 1, 1)
      })
      //util.getPercent(res.data.resultData.allSaveSpace, res.data.resultData.usedSpace)

     //res.data.resultData.allSaveSpace; 全部空间
     //res.data.resultData.usedSpace; 已用空间
    })
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