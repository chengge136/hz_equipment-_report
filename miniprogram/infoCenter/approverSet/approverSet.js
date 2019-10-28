// infoCenter/facilityManage/facilityManage.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    org_id: '',
    organization: '',
    org_code: '',
    update_by: '',
    auto_array: '',
    selected_array: '',
    myopenid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('org_id', options.org_id)
    var that = this;
    const _ = db.command;
    db.collection('facility_manage').where({
      org_id: _.eq(options.org_id)
    })
      .get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data[0]);
        that.setData({
          organization: res.data[0].organization,
          org_id: res.data[0].org_id,
        })
        if (!res.data[0].auto_array == '') {
          var previous_arrays = res.data[0].auto_array.split(",");
          //数组排序
          previous_arrays = previous_arrays.sort();
          console.log('length', previous_arrays.length);
          var selected_string = '';
          for (let i = 0; i < previous_arrays.length; ++i) {
            selected_string = selected_string + ' ' + this.data.items[previous_arrays[i]].value;
          }
          that.setData({
            selected_array: selected_string
          })
        }
      })

    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {
        console.log('myopenid:', res.result.openid);
        that.setData({
          myopenid: res.result.openid
        })

      }
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
  printer: function () {
    console.log('print');
    setTimeout(function () {
      //要延时执行的代码
      wx.navigateTo({
        url: '../approverModify/approverModify?type=printer'
      })
    }, 1000) //延迟时间
  },
  duplicator: function () {
    console.log('duplicator');
    setTimeout(function () {
      //要延时执行的代码
      wx.navigateTo({
        url: '../approverModify/approverModify?type=duplicator'
      })
    }, 1000) //延迟时间
  },
  computer: function () {
    console.log('computer');
    setTimeout(function () {
      //要延时执行的代码
      wx.navigateTo({
        url: '../approverModify/approverModify?type=computer'
      })
    }, 1000) //延迟时间
  },
  other: function () {
    console.log('other');
    setTimeout(function () {
      //要延时执行的代码
      wx.navigateTo({
        url: '../approverModify/approverModify?type=other'
      })
    }, 1000) //延迟时间
  }

})