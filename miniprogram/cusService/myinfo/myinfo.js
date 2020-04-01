// cusService/myinfo/myinfo.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userHead:'',
    nickName:'',
    name:'',
    myopenid:'',
    phone:'',
    dept:'',
    isAuto:'',
    items: [
      { name: '1', value: '是', checked: 'true' },
      { name: '0', value: '否' }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获得openid
    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {
        that.setData({
          //将openid赋值给本地变量myopenid
          myopenid: res.result.openid
        })
        console.log('myopenid:', res.result.openid);
        const _ = db.command;
        db.collection('hz_role_user').where({
          openid: res.result.openid
        }).get().then(res => {
          if (!res.data.length == 0) {
            console.log(res.data[0]);
            that.setData({
              nickName: res.data[0].nickName,
              name: res.data[0].name,
              dept: res.data[0].dept,
              phone: res.data[0].phone,
              userHead: res.data[0].avatarUrl
            })
          }
        })
      }
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this;
    that.setData({
      isAuto: e.detail.value
    })
  },
  name: function (event) {
    var that = this;
    that.setData({
      name: event.detail
    })
  },
  dept: function (event) {
    var that = this;
    that.setData({
      dept: event.detail
    })
  },
  phone: function (event) {
    var that = this;
    that.setData({
      phone: event.detail
    })
  },

  submit_info: function () {
    var that = this;
    if (that.data.name == '') {
      wx.showModal({
        title: '提示',
        content: '请填写姓名再更新!',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      wx.showModal({
        title: '录入',
        content: '确定要更新个人信息？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            that.updateInfo();

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  updateInfo: function() {
    wx.cloud.callFunction({
      name: 'modifyUser',
      data: {
        openid: this.data.myopenid,
        name: this.data.name,
        phone: this.data.phone,
        dept: this.data.dept,
        isAuto: this.data.isAuto
      },
      complete: res => {
        console.log('modifyUser callFunction test result: ', res);
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: '../../pages/index/index'
              })
            }, 2000) //延迟时间
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