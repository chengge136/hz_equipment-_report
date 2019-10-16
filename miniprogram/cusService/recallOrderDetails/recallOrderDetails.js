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
    problemDetail: '',
    createtime: '',
    report_id: '',
    contactor: '',
    phone: '',
    autosize: true,
    myopenid: '',
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('report_id:'+options.report_id)
    var id = options.report_id;
    var that = this;
    const _ = db.command;
    db.collection('recall_repair_order').where({
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
          contactor: res.data[0].contactor,
          phone: res.data[0].phone,
          problemDetail: res.data[0].comment,
          createtime: app.formatDate(new Date(res.data[0].createtime)),
          report_id: res.data[0].report_id,
          facilityType: res.data[0].facilityType


        })
      })

    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {
        that.setData({
          //将openid赋值给本地变量myopenid
          myopenid: res.result.openid
        })

        db.collection('hz_role_user').where({
          openid: res.result.openid
        }).get().then(res => {
          console.log(res.data[0]);
          if (res.data[0]) {
            that.setData({
              nickName: res.data[0].nickName
            })
          }

        })
      }
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


  get_order: function () {
    console.log('report_id:' + this.data.report_id);
    wx.cloud.callFunction({
      name: 'getRecallorder',
      data: {
        report_id: this.data.report_id,
        openid: this.data.myopenid,
        nickName: this.data.nickName

      },
      complete: res => {
        console.log('getOrder callFunction test result: ', res);

        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.switchTab({
                url: '../../pages/index/index'
              })
            }, 2000) //延迟时间
          }
        })

      }
    })
  }
})