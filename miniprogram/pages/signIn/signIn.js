// pages/signIn/signIn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dImg: 'https://ww3.sinaimg.cn/large/006XNEY7gy1g5omfyr5nej30e30dgwfn.jpg',
    message: '1，打印机打印不出来了，很大的噪音。2，打印机打印不出来了，很大的噪音。3，打印机打印不出来了，很大的噪音。4，打印机打印不出来了，很大的噪音。',
    autosize: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.showModal({
      title: '签到',
      content: '确定已经到达客户现场了吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');

          wx.showToast({
            title: '签到成功',
            icon: 'loading',
            duration: 2000
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})