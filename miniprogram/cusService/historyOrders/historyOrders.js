const db = wx.cloud.database();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newHistoryOrders: [],
    newRecallHistoryOrders: [],
    phoneRepairOrders:[],
    newRepaireLength:0,
    recallRepaireLength:0,
    phoneRepairLength:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const _ = db.command;

    db.collection('repair_orders').where({
      status: _.eq(1),
      reportType: _.eq(0)
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)

          for (var index in res.data) {
            res.data[index].createtime = app.formatDate(new Date(res.data[index].createtime));
          }

          that.setData({
            newHistoryOrders: res.data,
            newRepaireLength: res.data.length
          })
        }
      })

    //客户电话报修，前台无扫码提交
    db.collection('repair_orders').where({
      status: _.eq(1),
      reportType: _.eq(1)
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log('phoneRepairLength' + res.data.length)
          for (var index in res.data) {
            res.data[index].createtime = app.formatDate(new Date(res.data[index].createtime));
          }
          that.setData({
            phoneRepairOrders: res.data,
            phoneRepairLength: res.data.length

          })
        }
      })

    db.collection('recall_repair_order').where({
      status: _.eq(1)
    }).get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)

          for (var index in res.data) {
            res.data[index].createtime = app.formatDate(new Date(res.data[index].createtime));
          }

          that.setData({
            newRecallHistoryOrders: res.data,
            recallRepaireLength: res.data.length
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
  oderdetails: function () {
    wx.navigateTo({
      url: '../historyRepairRecords/historyRepairRecords',
      //url: '../facilityInfo/facilityInfo?facilityid=' + res.result,
    })
  }
})