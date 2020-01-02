// pages/facilityInfo/facilityInfo.js
//云数据库初始化
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: ''
  },

  addInfo: function () {
    //查询不到，可以添加
    wx.cloud.callFunction({
      name: 'addOrg',
      data: {
        name: this.data.name
      },
      complete: res => {
        console.log('addOrg callFunction test result: ', res);
        //
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: '../../pages/managerIndex/managerIndex'
              })
            }, 2000) //延迟时间
          }
        })
        //
      }
    })
  },

  submit_info: function () {
    var that = this;
    const _ = db.command;
    
    if (that.data.name == '') {
      wx.showToast({
        title: '请先输入单位名称',
        icon: 'none',
        duration: 3000
      })
    }else{
      db.collection('organizations').where({
        name: {
          $regex: '.*' + that.data.name,
        }
       
      }).get().then(res => {
        if (res.data.length == 0) {
          wx.showModal({
            title: '修改',
            content: '确定添加[ ' + that.data.name + '] 为授权使用单位？',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                that.addInfo();

              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '系统中已有名为[' + res.data[0].name +']的单位，确定要添加？',
            confirmText:'坚持添加',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                that.addInfo();

              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }

      })
    }
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

  orgName: function (event) {
    var that = this;
    that.setData({
      name: event.detail
    })
  }
})