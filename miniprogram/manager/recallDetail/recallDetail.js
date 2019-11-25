// pages/newOrderDetails/newOrderDetails.js
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
    contactor: '',
    phone: '',
    createtime: '',
    report_id: '',
    autosize: true,
    comment: '',
    staffs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('report_id:' + options.report_id)
    var id = options.report_id;
    var that = this;
    const _ = db.command;
    db.collection('recall_repair_order').where({
      report_id: _.eq(parseInt(id))
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
          problemDetail: res.data[0].comment,
          contactor: res.data[0].contactor,
          phone: res.data[0].phone,
          createtime: app.formatDate(new Date(res.data[0].createtime)),
          report_id: res.data[0].report_id,
          facilityType: res.data[0].facilityType


        })
      })

    //查询销售
    db.collection('hz_role_user').where({
      roleid: _.eq(1),
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          that.setData({
            staffs: res.data
          })
        }
      })

  },
  makeCall: function () {
    wx.makePhoneCall({

      phoneNumber: this.data.phone

    })
  },
  setComplete: function () {
    var that = this;
    wx.showModal({
      title: '完成报修单',
      content: '确定设置此报修单为完成状态吗？',
      success(res) {
        if (res.confirm) {
          if (that.data.comment == '') {
            wx.showToast({
              title: '请填写此单设置完成的原因',
              icon: 'none',
              duration: 3000
            })
          } else {
            console.log('用户点击确定');
            that.manager_set();
          }

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  commentIn: function (event) {
    var that = this;
    that.setData({
      comment: event.detail
    })
  },
  manager_set: function () {
    wx.cloud.callFunction({
      name: 'completeRecall',
      data: {
        report_id: parseInt(this.data.report_id),
        comment: this.data.comment
      },
      complete: res => {
        console.log('completeRecall callFunction test result: ', res);
        wx.showToast({
          title: '报修单完成',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('Yes');
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: '../../pages/managerIndex/managerIndex'
              })
            }, 2000) //延迟时间
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
  assign: function (e) {
    var that = this;
    const _ = db.command;
    var name = e.currentTarget.dataset.name;

    if (name == '') {
      wx.showToast({
        title: '请在首页人员管理中，更新此售后姓名',
        icon: 'none',
        duration: 4000
      })
    } else {
      wx.showModal({
        title: '任务分配',
        content: '确定把此报修单分配给[ ' + e.currentTarget.dataset.name + ' ]吗？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            //1，根据昵称获取被分配销售微信openid
            db.collection('hz_role_user').where({
              roleid: _.eq(1),
              name: _.eq(name)
            })
              .get({
                success: function (res) {
                  // res.data 是包含以上定义的两条记录的数组               

                  //2，把订单分配给此人
                  wx.cloud.callFunction({
                    name: 'getRecallorder',
                    data: {
                      report_id: that.data.report_id,
                      openid: res.data[0].openid,
                      nickName: name
                    },
                    complete: res => {
                      console.log('getRecallorder callFunction test result: ', res);

                      wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 2000,
                        success: function () {
                          console.log('haha');
                          setTimeout(function () {
                            //要延时执行的代码
                            wx.redirectTo({
                              url: '../../pages/managerIndex/managerIndex'
                            })
                          }, 1000) //延迟时间
                        }
                      })

                    }
                  })
                  //

                }
              })


          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }


  }

})