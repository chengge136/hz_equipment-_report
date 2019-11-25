
const db = wx.cloud.database();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newRepairOrders: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const _ = db.command;

    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {

        var myopenid=res.result.openid;
        console.log('myopenid:', myopenid);

        db.collection('repair_orders').where(
          {
            //已经通过审核或者无需审核的保修单
            status: _.neq(1),
            reportorId: _.eq(myopenid),
          }
        ).get({
          success: function (res) {
            // res.data 是包含以上定义的两条记录的数组
            console.log(res.data)
            for (var index in res.data) {
              res.data[index].createtime = app.formatDate(new Date(res.data[index].createtime));

              switch (res.data[index].status.toString()) {
                case "0":
                  res.data[index].status = '待审核';
                  break;
                case "2":
                  res.data[index].status = '已派发';
                  break;
                case "3":
                  res.data[index].status = '待派发';
                  break;
              }

            }
            that.setData({
              newRepairOrders: res.data
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

  }
})