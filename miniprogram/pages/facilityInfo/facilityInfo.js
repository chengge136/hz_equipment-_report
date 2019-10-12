// pages/facilityInfo/facilityInfo.js
//云数据库初始化
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    facilityid:'',
    facilityName: '',
    brandName: '',
    facilityType:'',
    facilityOrg: '',
    address:'',

    array: ['打印机', '复印机', '电脑', '其他'],
    objectArray: [
      {
        id: 0,
        name: '打印机'
      },
      {
        id: 1,
        name: '复印机'
      },
      {
        id: 2,
        name: '电脑'
      },
      {
        id: 3,
        name: '其他'
      }
    ],
    index: 0,


  },
  submit_info: function () {
    wx.cloud.callFunction({
      name: 'facilityIn',
      data: {
        facilityid: this.data.facilityid,
        facilityName: this.data.facilityName,
        brandName: this.data.brandName,
        facilityOrg: this.data.facilityOrg,
        address: this.data.address,
        facilityType: this.data.index,
        contactor: this.data.contactor,
        phone: this.data.phone
      },
      complete: res => {
        console.log('facilityIn callFunction test result: ', res);

        wx.showToast({
          title: '录入成功',
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      facilityid: options.facilityid
    })

    var that = this;
    const _ = db.command;
    var count=db.collection('facility').where({
      facilityid: _.eq(options.facilityid)
    }).count({
      success: function (res) {
        console.log(res.total);
        if(res.total>0){
          wx.showModal({
            title: '提示',
            content: '此设备已完成过信息录入，请在首页使用设备查询',
            showCancel:false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                setTimeout(function () {
                  //要延时执行的代码
                  wx.switchTab({
                    url: '../index/index'
                  })
                }, 1000) //延迟时间

              } 
            }
          })
        }
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

  facilityName: function (event) {
    var that = this;
    that.setData({
      facilityName: event.detail
    })
  },
  brandName: function (event) {
    var that = this;
    that.setData({
      brandName: event.detail
    })
  },
  facilityOrg: function (event) {
    var that = this;
    that.setData({
      facilityOrg: event.detail
    })
  },
  address: function(event) {
    var that = this;
    that.setData({
      address: event.detail
    })
  },
  contactor: function (event) {
    var that = this;
    that.setData({
      contactor: event.detail
    })
  },
  phone: function (event) {
    var that = this;
    that.setData({
      phone: event.detail
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})