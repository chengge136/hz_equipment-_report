// pages/facilityInfo/facilityInfo.js
import Toast from '../../vant/toast/toast';
//云数据库初始化
const db = wx.cloud.database();

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
    facilityDep: '',
    contactor: '',
    phone: '',
    imagePath:''


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
  test_info: function () {
    Toast.success('成功文案');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.facilityid)
    var that = this;
    const _ = db.command;
    db.collection('facility').where({
      facilityid: _.eq(options.facilityid)
    })
      .get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data[0])
        that.setData({
          facilityid: res.data[0].facilityid,
          facilityType: res.data[0].facilityType,
          facilityName: res.data[0].facilityName,
          facilityOrg: res.data[0].facilityOrg,
          facilityDep: res.data[0].facilityDep,
          brandName: res.data[0].brandName

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
  brandName: function (event) {
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
  },
  choose_image:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePath = res.tempFilePaths[0]
        console.log(tempFilePath);
        
        that.setData({
          imagePath: tempFilePath
        })

      }
    })

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
  removeImage: function() {
   var that=this;
    if (!this.data.imagePath==''){
      wx.showModal({
        title: '系统提醒',
        content: '确定要删除此图片吗？',
        success: function (res) {
          if (res.confirm) {
            that.setData({
              imagePath: ''
            })
          } else if (res.cancel) {
            return false;
          }
        }
      })
   }  
  }  
})