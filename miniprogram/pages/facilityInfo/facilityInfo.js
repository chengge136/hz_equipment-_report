// pages/facilityInfo/facilityInfo.js
//云数据库初始化
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    facilityid:'',
    facilityName: '',
    brandName: '',
    facilityType:'',
    facilityOrg: '',
    address:'',

    array: ['打印机', '复印机', '电脑', '其他'],
    objectArray: [
      {
        id: 0,
        name: '打印机'
      },
      {
        id: 1,
        name: '复印机'
      },
      {
        id: 2,
        name: '电脑'
      },
      {
        id: 3,
        name: '其他'
      }
    ],
    index: 0,


  },
  submit_info: function () {
    
    const facility = db.collection('facility')
    db.collection('facility').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        facilityid: this.data.facilityid,
        facilityName: this.data.facilityName,
        brandName: this.data.brandName,
        facilityOrg: this.data.facilityOrg,
        address: this.data.address,
        facilityType: this.data.index,
        contactor: this.data.contactor,
        phone: this.data.phone

      }
    })
      .then(res => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.redirectTo({
          url: '../index/index',
        })
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.facilityid)
    this.setData({
      facilityid: options.facilityid
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

  facilityName: function (event) {
    var that = this;
    that.setData({
      facilityName: event.detail
    })
  },
  brandName: function (event) {
    var that = this;
    that.setData({
      brandName: event.detail
    })
  },
  facilityOrg: function (event) {
    var that = this;
    that.setData({
      facilityOrg: event.detail
    })
  },
  address: function(event) {
    var that = this;
    that.setData({
      address: event.detail
    })
  },
  contactor: function (event) {
    var that = this;
    that.setData({
      contactor: event.detail
    })
  },
  phone: function (event) {
    var that = this;
    that.setData({
      phone: event.detail
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})