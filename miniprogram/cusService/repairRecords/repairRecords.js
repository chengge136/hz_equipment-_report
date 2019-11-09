// pages/repairRecords/repairRecords.js
const db = wx.cloud.database();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isComplete: '',
    currentDate: new Date().getTime(),
    next_date:'',
    comment: '',
    facilityid: '',
    facilityName: '',
    brandName: '',
    facilityType: '',
    facilityOrg: '',
    address: '',
    contactor:'',
    phone:'',
    createtime: '',
    report_id: '',
    myopenid:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('facilityid:' + options.facilityid)
    var id = options.facilityid.toString();
    var that = this;
    const _ = db.command;
    db.collection('repair_orders').where({
      facilityid: _.eq(id),
      status: _.eq(2)
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
          createtime: app.formatDate(new Date(res.data[0].createtime)),
          report_id: res.data[0].report_id,
          facilityType: res.data[0].facilityType,
          contactor: res.data[0].contactor,
          phone: res.data[0].phone

        })
      })

    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {
        that.setData({
          //将openid赋值给本地变量myopenid
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
  //是否完成维修
  onChange(event) {
    this.setData({
      isComplete: event.detail
    });
  },
  bindDateChange(event) {
    this.setData({
      next_date: event.detail.value
    });
  },

  solutionIn: function (e) {
    console.log(e.detail.value)
    this.setData({
      comment: e.detail.value
    })
  },

    submit_info: function () {
    console.log('report_id:' + this.data.report_id);
    //如果点击未完成，则新生成一条维修记录
      if (this.data.isComplete=='否'){
        wx.cloud.callFunction({
          name: 'recordNo',
          data: {
            facilityid: this.data.facilityid,
            facilityName: this.data.facilityName,
            brandName: this.data.brandName,
            facilityType: this.data.facilityType,
            facilityOrg: this.data.facilityOrg,
            address: this.data.address,
            next_date: this.data.next_date,
            comment: this.data.comment,
            contactor: this.data.contactor,
            phone: this.data.phone,
            openid: this.data.myopenid
           
          },
          complete: res => {
            console.log('recordNo callFunction test result: ', res);
          }
        })
      }

      wx.cloud.callFunction({
        name: 'recordYes',
        data: {
          report_id: this.data.report_id,
          comment: this.data.comment
        },
        complete: res => {
          console.log('recordYes callFunction test result: ', res);
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              console.log('Yes');
              setTimeout(function () {
                //要延时执行的代码
                wx.redirectTo({
                  url: '../../pages/index/index'
                })
              }, 2000) //延迟时间
            }
          })
        }
      })


  }

})