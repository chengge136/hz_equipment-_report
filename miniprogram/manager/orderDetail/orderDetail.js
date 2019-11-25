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
    autosize: true,
    contactor: '',
    phone: '',
    assignName:'',
    plan_time:''
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
          contactor: res.data[0].contactor,
          phone: res.data[0].phone,
          assignName: res.data[0].assignName,
          plan_time: res.data[0].plan_time,
          imagePath: res.data[0].imagePath,
          problemDetail: res.data[0].problemDetail,
          createtime: app.formatDate(new Date(res.data[0].createtime)),
          report_id: res.data[0].report_id,
          facilityType: res.data[0].facilityType


        })
      })

  },
  makeCall: function () {
    wx.makePhoneCall({

      phoneNumber: this.data.phone

    })
  },
  repaireHistory:function(){
    wx.navigateTo({
      url: '../repaireHistory/repaireHistory?facilityid=' + this.data.facilityid
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

})