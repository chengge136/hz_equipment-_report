// pages/cusIndex/cusIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  },

  scan_report: function () {
    //console.log('test')
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success(res) {
        //打印ISBN码
        console.log(res.result)
        wx.navigateTo({
          //url: '../facilityInfo/facilityInfo',
          url: '../scanReport/scanReport?facilityid=' + res.result,
        })
      },
      fail(res) {
        console.log(res)
      }

    })
  },


  facility_query: function () {
    //console.log('test')
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success(res) {
        //打印ISBN码
        //console.log(res.result)
        wx.navigateTo({
          //url: '../facilityInfo/facilityInfo',
          url: '../facilityQuery/facilityQuery?facilityid=' + res.result,
        })
      },
      fail(res) {
        console.log(res)
      }

    })
  },

  new_report_orders: function () {
    wx.navigateTo({
      url: '../newOrders/newOrders',
      //url: '../facilityInfo/facilityInfo?facilityid=' + res.result,
    })
  },
  repair_records: function () {
    wx.navigateTo({
      url: '../repairRecords/repairRecords',
      //url: '../facilityInfo/facilityInfo?facilityid=' + res.result,
    })
  },
  my_orders: function () {
    wx.navigateTo({
      url: '../myOrders/myOrders',
      //url: '../facilityInfo/facilityInfo?facilityid=' + res.result,
    })
  },
  sign_in: function () {
    wx.navigateTo({
      url: '../signIn/signIn',
      //url: '../facilityInfo/facilityInfo?facilityid=' + res.result,
    })
  }



})