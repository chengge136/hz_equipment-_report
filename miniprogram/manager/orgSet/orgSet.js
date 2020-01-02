// pages/newOrderDetails/newOrderDetails.js
const db = wx.cloud.database();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    createtime:0,
    active: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('createtime:' + options.createtime)
    var id = options.createtime;
    var that = this;
    const _ = db.command;
    db.collection('organizations').where({
      createtime: _.eq(parseInt(id))
    })
      .get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data[0]);

        that.setData({
          name: res.data[0].name,
          createtime: res.data[0].createtime,
          active: Boolean(res.data[0].active),
        })
        
      })

  },
  onChange: function (event){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '是否切换开关？',
      success: res => {
        if (res.confirm) {
          that.setData({ active: event.detail});
          console.log(Number(event.detail));

          wx.cloud.callFunction({
            name: 'orgSwitch',
            data: {
              createtime: that.data.createtime,
              active: Number(event.detail)
            },
            complete: res => {
              console.log('orgSwitch callFunction test result: ', res);

              wx.showToast({
                title: '设置成功',
                icon: 'success',
                duration: 2000,
                success: function () {
                  console.log('haha');
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../../pages/managerIndex/managerIndex'
                    })
                  }, 1000) //延迟时间
                }
              })

            }
          })

        }
      }
    });
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