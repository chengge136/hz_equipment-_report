// pages/signIn/signIn.js
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
    imagePath: '',
    problemDetail: '',
    createtime: '',
    report_id: '',
    autosize: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('facilityid:' + options.facilityid)
    var id = options.facilityid.toString();
    var that = this;
    const _ = db.command;
    db.collection('repair_orders').where({
      facilityid: _.eq(id),
      status: _.eq(2)
    })
      .get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data[0]);

        that.setData({
          facilityid: res.data[0].facilityid,
          facilityName: res.data[0].facilityName,
          brandName: res.data[0].brandName,
          facilityOrg: res.data[0].facilityOrg,
          address: res.data[0].address,
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
  //是否完成维修
  onChange(event) {
    this.setData({
      isComplete: event.detail
    });
  },
  bindDateChange(event) {
    this.setData({
      date: event.detail.value
    });
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

  signin: function(){
    var that=this;
    wx.showModal({
      title: '签到',
      content: '确定已经到达客户现场了吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.setSignTime();

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  setSignTime:function(){
    wx.cloud.callFunction({
      name: 'signIn',
      data: {
        report_id: this.data.report_id
      },
      complete: res => {
        console.log('signIn callFunction test result: ', res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.switchTab({
                url: '../index/index'
              })
            }, 2000) //延迟时间
          }
        })

      }
    })
  }

})