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

  facility_manage: function () {
    //console.log('test')
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success(res) {
        //打印ISBN码
        console.log(res.result)
        wx.navigateTo({
          url: '../../infoCenter/facilityManage/facilityManage?org_id=' + res.result,
        })
      },
      fail(res) {
        console.log(res)
      }

    })
  },



  my_orders: function () {
    wx.navigateTo({
      url: '../../customer/cusHistory/cusHistory',
      //url: '../facilityInfo/facilityInfo?facilityid=' + res.result,
    })
  },
  order_review: function () {
    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {
        wx.navigateTo({
          url: '../../infoCenter/orderReview/orderReview?openid=' + res.result.openid,
        })
      }
    }) 

  }


})