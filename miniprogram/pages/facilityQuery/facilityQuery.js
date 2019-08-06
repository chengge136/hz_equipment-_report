// pages/facilityQuery/facilityQuery.js
//云数据库初始化
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    facilityid: '',
    facilityType: '',
    facilityName: '',
    facilityOrg: '',
    facilityDep: '',
    brandName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.facilityid)
    var that=this;
    const _ = db.command;
    db.collection('facility').where({
      facilityid: _.eq(options.facilityid)
    })
    .get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data[0])
      that.setData({
        facilityid: res.data[0].facilityid,
        facilityType: res.data[0].facilityType,
        facilityName: res.data[0].facilityName,
        facilityOrg: res.data[0].facilityOrg,
        facilityDep: res.data[0].facilityDep,
        brandName: res.data[0].brandName

      })
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