// pages/newOrderDetails/newOrderDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dImg: 'https://ww3.sinaimg.cn/large/006XNEY7gy1g5omfyr5nej30e30dgwfn.jpg',
    message: '打印机打印不出来了，很大的噪音,打印机打印不出来了，很大的噪音,打印机打印不出来了，很大的噪音，打印机打印不出来了，很大的噪音',
    autosize: true,
    arrival_time:''
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
  setTime:function(){
    var that=this;
    wx.showActionSheet({
      itemList: ['一小时', '两小时', '三小时'],
      success(res) {
        console.log(res.tapIndex)
        switch (res.tapIndex) {
          case 0:
            console.log("选择了一小时");
            that.setData({
              arrival_time: 1
            })
            break;
          case 1:
            console.log("选择了二小时");
            that.setData({
              arrival_time: 2
            })
            break;
          case 2:
            console.log("选择了三小时");
            that.setData({
              arrival_time: 3
            })
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})