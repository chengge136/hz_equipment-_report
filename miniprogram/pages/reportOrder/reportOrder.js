// pages/facilityInfo/facilityInfo.js
//云数据库初始化
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
    contactor: '',
    phone: '',
    imagePath: '',
    problemDetail: '',
    createtime: '',
    report_id:'',
    status:''


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.facilityid)
    var that = this;
    const _ = db.command;
    db.collection('repair_orders').where({
      facilityid: _.eq(options.facilityid),
      status: _.neq(3)
    })
      .get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data[0]);
  
        switch (res.data[0].status.toString()) {
          case "0":
            that.setData({
              status: '等待派发'
            });
            break;
          case "1":
            that.setData({
              status: '已派发，技术员在路上'
            });
            break;
          case "2":
            that.setData({
              status: '已完成'
            });
            break;
        } 
        //console.log('日期是：' + app.formatDate(new Date(res.data[0].createtime)));

        that.setData({
          facilityid: res.data[0].facilityid,
          facilityName: res.data[0].facilityName,
          brandName: res.data[0].brandName,
          facilityOrg: res.data[0].facilityOrg,
          address: res.data[0].address,
          contactor: res.data[0].contactor,
          phone: res.data[0].phone,
          imagePath: res.data[0].imagePath,
          problemDetail: res.data[0].problemDetail,
          createtime: app.formatDate(new Date(res.data[0].createtime)),
          report_id: res.data[0].report_id,
          facilityType: res.data[0].facilityType


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