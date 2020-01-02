// manager/subscribeMessage/subscribeMessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  sendSubscribeMessage:function(){
    wx.cloud.callFunction({
      name: "sendSubscribeMessage",
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.error('失败' + err)
    })
  },
  subscribeMessage:function(){
    let data={
      "date":new Date(this.data.data),
      "name":this.data.name,
      "relation":this.data.relation,
      "sended":0
    }
    wx.requestSubscribeMessage({
      tmplIds: ['ma8Q8D5NlwTAs0oVq1JJp7uSxCpCW_Rq8uzfWUoLtiY'],
      success(res) { 
        console.log(res)
        if (res['ma8Q8D5NlwTAs0oVq1JJp7uSxCpCW_Rq8uzfWUoLtiY']=='accept'){

        }
      },
      complete(){
        wx.reLaunch({
          url: '../managerIndex/managerIndex',
        })
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