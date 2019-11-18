// pages/facilityQuery/facilityQuery.js
//云数据库初始化
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    nickName:'',
    avatarUrl:'',
    name: '',
    dept: '',
    phone: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.openid)
    var that = this;
    const _ = db.command;
    that.setData({
      openid: options.openid.toString()
    })

    db.collection('hz_role_user').where({
      openid: _.eq(options.openid.toString())
    })
      .get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data[0]);
        //设置设备类型

        that.setData({
          nickName: res.data[0].nickName,
          avatarUrl: res.data[0].avatarUrl,
          name: res.data[0].name,
          dept: res.data[0].dept,
          phone: res.data[0].phone

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
  nameIn: function (event) {
    var that = this;
    that.setData({
      name: event.detail
    })
  },
  deptIn: function (event) {
    var that = this;
    that.setData({
      dept: event.detail
    })
  },
  phoneIn: function (event) {
    var that = this;
    that.setData({
      phone: event.detail
    })
  },
  submit_info: function () {
    var that = this;
    wx.showModal({
      title: '更新',
      content: '确定填入的基本信息无误？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.updateCusservice();

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  updateCusservice: function () {
    wx.cloud.callFunction({
      name: 'updateCusservice',
      data: {
        openid: this.data.openid,
        name: this.data.name,
        dept: this.data.dept,
        phone: this.data.phone
      },
      complete: res => {
        console.log('updateCusservice callFunction test result: ', res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: '../../manager/peopleManage/peopleManage'
              })
            }, 2000) //延迟时间
          }
        })

      }
    })
  }
})