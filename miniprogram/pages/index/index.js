const db = wx.cloud.database();
var app = getApp();
Page({


  /**
   * 页面的初始数据
   */
  data: {
    message:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    const _ = db.command;
    db.collection('repair_orders').where({
      status: _.eq(3)
    })
      .get().then(res => {
        console.log('length:', res.data.length);
        if (res.data.length > 0) {
          that.setData({
            message: '您好，现在一共有 ' + res.data.length + ' 条的新的设备报修申请,请在新报修申请中查看并领取'
          })
        } else {
          that.setData({
            message: '您好，暂无新的设备报修申请'
          })
        }

      })
  },

  infoAdmin_set: function () {

    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {
        wx.navigateTo({
          url: '../../cusService/infoadminSet/infoadminSet?openid=' + res.result.openid,
        })
      }
    })
  }
  ,
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

  },

  facility_input: function() {
    app.scanCode('../../cusService/facilityInfo/facilityInfo?facilityid=');
  },

  
  facility_query: function () {
    app.scanCode('../../cusService/facilityQuery/facilityQuery?facilityid=');
  },

  new_report_orders: function () {
    wx.navigateTo({
      url: '../../cusService/newOrders/newOrders',
      //url: '../facilityInfo/facilityInfo?facilityid=' + res.result,
    })
  },
  repair_records: function () {
    app.scanCode('../../cusService/repairRecords/repairRecords?facilityid=');
  },
  my_orders: function () {
    wx.navigateTo({
      url: '../../cusService/myOrders/myOrders',
      //url: '../facilityInfo/facilityInfo?facilityid=' + res.result,
    })
  },
  history_orders: function () {
    wx.navigateTo({
      url: '../../cusService/historyOrders/historyOrders',
      //url: '../facilityInfo/facilityInfo?facilityid=' + res.result,
    })
  },
  sign_in: function () {
    app.scanCode('../../cusService/signIn/signIn?facilityid=');

  }



})