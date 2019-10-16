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
    address: '',
    contactor: '',
    phone: '',
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
      console.log(res.data[0]);
      //设置设备类型
      switch (res.data[0].facilityType.toString()) {
        case "0":
          that.setData({
            facilityType: '打印机'
          });
          break;
        case "1":
          that.setData({
            facilityType: '复印机'
          });
          break;
        case "2":
          that.setData({
            facilityType: '电脑'
          });
          break;
        case "3":
          that.setData({
            facilityType: '其他'
          });
          break;
      } 

      that.setData({
        facilityid: res.data[0].facilityid,
        facilityName: res.data[0].facilityName,
        facilityOrg: res.data[0].facilityOrg,
        address: res.data[0].address,
        brandName: res.data[0].brandName,
        contactor: res.data[0].contactor,
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
  addressIn: function (event) {
    var that = this;
    that.setData({
      address: event.detail
    })
  },
  contactorIn: function (event) {
    var that = this;
    that.setData({
      contactor: event.detail
    })
  },
  phoneIn: function (event) {
    var that = this;
    that.setData({
      phone: event.detail
    })
  },
  submit_info:function(){
    var that = this;
    wx.showModal({
      title: '修改',
      content: '确定要修改此设备的基本信息？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.updateFacility();

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  updateFacility: function () {
    wx.cloud.callFunction({
      name: 'updateFacility',
      data: {
        facilityid: this.data.facilityid,
        address: this.data.address,
        contactor: this.data.contactor,
        phone: this.data.phone
      },
      complete: res => {
        console.log('updateFacility callFunction test result: ', res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.switchTab({
                url: '../../pages/index/index'
              })
            }, 2000) //延迟时间
          }
        })

      }
    })
  }
})