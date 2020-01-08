// manager/subscribeMessage/subscribeMessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myopenid:'o6S_I5QVayind69aGt8S2rQGh1KI'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    var that = this;
    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {

        that.setData({
          myopenid: res.result.openid
        })
        console.log('myopenid:', res.result.openid);
      }
    })
    */
  },
  sendNews:function(){
    wx.requestSubscribeMessage({
      tmplIds: ['ma8Q8D5NlwTAs0oVq1JJp7uSxCpCW_Rq8uzfWUoLtiY'],
      success:res=> { 
        wx.cloud.callFunction({
          name: 'subscribeMessage',
          data: {
            openId: this.data.myopenid
          }
        }).then(res => {
          console.log('sccess', res)
        }).catch(err => {
          console.log(err)
        })
      },
      fail:err=>{
        console.log('fail',err)
      }
    })

  },
  back:function(){
    wx.reLaunch({
      url: '../managerIndex/managerIndex',
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