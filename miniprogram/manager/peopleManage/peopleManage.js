// pages/newOrderDetails/newOrderDetails.js
const db = wx.cloud.database();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    staffs: [],
    nonamestaffs: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const _ = db.command;

    //查询销售
    db.collection('hz_role_user').where({
      roleid: _.eq(1),
      name: _.neq(''),
      deletetime: _.eq('')
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

      //无名销售
    db.collection('hz_role_user').where({
      roleid: _.eq(1),
      name: _.eq(''),
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
          that.setData({
            nonamestaffs: res.data
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
  query: function (e){
    var name = e.currentTarget.dataset.name;
    var dept = e.currentTarget.dataset.dept;
    var phone = e.currentTarget.dataset.phone;

    wx.showModal({
      title: '人员信息',
      showCancel:false,
      content: '姓名：' + name + '\n部门：' + dept + '\n电话:' + phone,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');

        }
      }
    })
  },
  updateInfo: function (e) {
    var openid = e.currentTarget.dataset.openid;
    console.log(openid);
    wx.navigateTo({
      url: '../updateInfo/updateInfo?openid=' + openid,
    })
   },

  delete: function (e) {
    var that = this;
    const _ = db.command;
    var openid1 = e.currentTarget.dataset.openid.toString();
    var name = e.currentTarget.dataset.name;

    wx.showModal({
      title: '删除人员',
      content: '确定要删除[ ' + name + ' ]的使用权限吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.cloud.callFunction({
            name: 'deleteCusservice',
            data: {
              openid: openid1
            },
            complete: res => {
              console.log('deleteCusservice callFunction test result: ', res);

              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000,
                success: function () {
                  console.log('haha');
                  setTimeout(function () {
                    //要延时执行的代码
                    wx.redirectTo({
                      url: '../../manager/peopleManage/peopleManage'
                    })
                  }, 1000) //延迟时间
                }
              })

            }
          })


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    //console.log(e.currentTarget.dataset.name);
  }
})