// pages/cusIndex/cusIndex.js
const db = wx.cloud.database();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    myopenid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const _ = db.command;
    var org='';

    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {

        that.setData({
          //将openid赋值给本地变量myopenid
          myopenid: res.result.openid
        })
        console.log('myopenid:', res.result.openid);
        db.collection('hz_role_user').where({
          openid: res.result.openid
        }).get().then(res => {
          if (!res.data.length == 0) {
            console.log(res.data[0].organization);
            org = res.data[0].organization;

            db.collection('repair_orders').where({
              status: _.eq(0),
              facilityOrg: _.eq(org)
            })
              .get().then(res1 => {
                console.log('length:', res1.data.length);
                if (res1.data.length > 0) {
                  that.setData({
                    message: '您好，有 ' + res1.data.length + ' 条的新的设备报修申请需要您的审核！'
                  })
                } else {
                  that.setData({
                    message: '您好，暂无新的设备报修申请'
                  })
                }

              })

          }
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

  facility_manage: function () {
    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {
        console.log('myopenid:', res.result.openid);
        var openid = res.result.openid.toString();

        const _ = db.command;
        db.collection('hz_role_user').where({
          openid: _.eq(res.result.openid.toString()),
          roleid: _.eq(3)

        }).get().then(res => {
          wx.redirectTo({
            url: '../../infoCenter/facilityManage/facilityManage?organization=' + res.data[0].organization + '&openid=' + openid,
          });
            console.log(res.data[0]);
      
        })
      }
    })
  },
  approver_set:function(){

    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {
        wx.navigateTo({
          url: '../../infoCenter/approverSet/approverSet?openid=' + res.result.openid,
        })
      }
    })
  },
  info_report:function(){
    wx.navigateTo({
      url: '../../manager/createOrder/createOrder'
    })
  }
  ,
  orders_track: function () {
    wx.navigateTo({
      url: '../../infoCenter/orderTrack/orderTrack'
    })
  },

  order_review: function () {
    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {
        wx.navigateTo({
          url: '../../infoCenter/orderReview/orderReview?openid=' + res.result.openid,
        })
      }
    }) 
  }
})