// pages/newOrderDetails/newOrderDetails.js
const db = wx.cloud.database();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    facilityid: '',
    facilityName: '',
    brandName: '',
    facilityType: '',
    facilityOrg: '',
    address: '',
    imagePath: '',
    problemDetail: '',
    createtime: '',
    report_id: '',
    contactor: '',
    phone: '',
    autosize: true,
    rejection: '',
    sign_time:''
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('report_id:' + options.report_id)
    var id = options.report_id;
    var that = this;
    const _ = db.command;
    db.collection('repair_orders').where({
      report_id: _.eq(parseInt(id))
    })
      .get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data[0]);

        that.setData({
          facilityid: res.data[0].facilityid,
          facilityName: res.data[0].facilityName,
          brandName: res.data[0].brandName,
          facilityOrg: res.data[0].facilityOrg,
          address: res.data[0].address,
          imagePath: res.data[0].imagePath,
          problemDetail: res.data[0].problemDetail,
          createtime: app.formatDate(new Date(res.data[0].createtime)),
          report_id: res.data[0].report_id,
          facilityType: res.data[0].facilityType,
          contactor: res.data[0].contactor,
          phone: res.data[0].phone,
          sign_time: res.data[0].sign_time


        })
      })
      
  },
  makeCall: function () {
    wx.makePhoneCall({

      phoneNumber: this.data.phone

    })
  },
  sign: function () {
    var that = this;
    //针对未扫码上报
    if (that.data.facilityid ==''){
      wx.showModal({
        title: '设备确认',
        content: '确定客户电话报修的是这台设备？',
        success(res) {
          if (res.confirm) {
            //1，扫码得到的id到此报单
            //2，将id与签到时间更新到此报单
            wx.scanCode({
              onlyFromCamera: true,
              scanType: ['qrCode'],
              success(res) {
                //打印ISBN码
                var result = res.result;
                var idIndex = result.indexOf("$id") + 4; // 从结果中获取机器id
                var idString = result.substr(idIndex, 12);
                //设备id 和 签到时间
                console.log('facilityid:' + idString);
                var d1 = new Date();
                var signtime = d1.getFullYear() + '-' + d1.getMonth() + '-' + d1.getDate() + ' ' + d1.getHours() + ':' + d1.getMinutes();

                that.setData({
                  sign_time: signtime,
                  facilityid: idString
                });
                //将id与签到时间更新到此报单
                wx.cloud.callFunction({
                  name: 'phonesignIn',
                  data: {
                    report_id: that.data.report_id,
                    time: signtime,
                    facilityid: idString
                  },
                  complete: res => {
                    console.log('phonesignIn callFunction test result: ', res);
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 2000,
                      success: function () {
                        console.log('签到成功');
                      }
                    })
                  }
                })


              },
              fail(res) {
                console.log(res)
              }
            })
           
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      //针对上报
    }else{
      if (!that.data.sign_time == '') {
        wx.showToast({
          title: '此单已完成签到，无需重复签到!',
          icon: 'none',
          duration: 3000
        })
      } else {
        wx.showModal({
          title: '扫码签到',
          content: '确定已经到达客户现场了？',
          success(res) {
            if (res.confirm) {
              wx.scanCode({
                onlyFromCamera: true,
                scanType: ['qrCode'],
                success(res) {
                  //打印ISBN码
                  var result = res.result;
                  var idIndex = result.indexOf("$id") + 4; // 从结果中获取机器id
                  var idString = result.substr(idIndex, 12);
                  console.log('facilityid:' + idString);
                  //扫码获取的id与此单对应的设备id一致
                  if (idString == that.data.facilityid) {
                    var d1 = new Date();
                    var signtime = d1.getFullYear() + '-' + d1.getMonth() + '-' + d1.getDate() + ' ' + d1.getHours() + ':' + d1.getMinutes();
                    that.setSignTime(signtime);
                    that.setData({
                      sign_time: signtime
                    })
                  } else {
                    wx.showToast({
                      title: '签到失败!扫码设备对应不上此单设备!',
                      icon: 'none',
                      duration: 3000
                    })
                  }
                },
                fail(res) {
                  console.log(res)
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },
  setSignTime: function (signtime) {
    wx.cloud.callFunction({
      name: 'signIn',
      data: {
        report_id: this.data.report_id,
        time: signtime
      },
      complete: res => {
        console.log('signIn callFunction test result: ', res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('签到成功');
          }
        })
      }
    })
  },
  repaireHistory: function () {
    if (this.data.facilityid==''){
      wx.showToast({
        title: '设备id不存在，请先扫码签到',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '../../manager/repaireHistory/repaireHistory?facilityid=' + this.data.facilityid
      })
    }
   
  },
  facilityid:function(){
    this.setData({
      facilityid:123123
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

  },
  //图片点击事件
  imgYu: function (event) {
    console.log(event)
    var imgArr = [];
    var src = event.currentTarget.dataset.src;//获取data-src
    imgArr[0] = src;
    //var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgArr
    })
  },

  reject: function (event) {
    var that = this;
    that.setData({
      rejection: event.detail
    })
  },
  return_func:function(){
    console.log('report_id:' + this.data.report_id);
    wx.cloud.callFunction({
      name: 'returnOrder',
      data: {
        report_id: this.data.report_id,
        rejection: this.data.rejection
      },
      complete: res => {
        console.log('returnOrder callFunction test result: ', res);

        wx.showToast({
          title: '退回成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: '../../pages/index/index'
              })
            }, 2000) //延迟时间
          }
        })

      }
    })
  },
  return_order: function () {

    var that = this;
    wx.showModal({
      title: '退回报修单',
      content: '确定退回此报修单吗？',
      success(res) {
        if (res.confirm) {
          if (that.data.rejection==''){
            wx.showToast({
              title: '请填写退回的原因',
              icon: 'none',
              duration: 3000
            })
          }else{
            console.log('用户点击确定');
            that.return_func();
          }
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })



  }
  
})