// pages/facilityInfo/facilityInfo.js
import Toast from '../../vant/toast/toast';
//云数据库初始化
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    facilityid:'',
    facilityType: '',
    facilityName: '',
    facilityOrg: '',
    facilityDep: '',
    brandName:''


  },
  submit_info: function () {
    //console.log(this.data)



    const book = db.collection('facility')

    db.collection('facility').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        facilityid: this.data.facilityid,
        facilityType: this.data.facilityType,
        facilityName: this.data.facilityName,
        facilityOrg: this.data.facilityOrg,
        facilityDep: this.data.facilityDep,
        brandName: this.data.brandName


      }
    })
      .then(res => {
        //console.log(res)
        Toast.success('提交成功');
        wx.redirectTo({
          url: '../index/index',
        })
      })
   
  },
  test_info:function(){
    Toast.success('成功文案');
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
  onShareAppMessage: function () {

  },
  facilityName: function (event) {
    var that = this;
    that.setData({
      facilityName: event.detail
    })
  },
  facilityOrg: function (event) {
    var that = this;
    that.setData({
      facilityOrg: event.detail
    })
  },
  facilityDep: function (event) {
    var that = this;
    that.setData({
      facilityDep: event.detail
    })
  },
  brandName: function(event) {
    var that = this;
    that.setData({
      brandName: event.detail
    })
  },

  onChange(event) {
    var that = this;
    console.log(event);
    that.setData({

      facilityType: event.detail
    })
  }
})