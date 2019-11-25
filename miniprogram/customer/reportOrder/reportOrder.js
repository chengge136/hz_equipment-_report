// pages/facilityInfo/facilityInfo.js
//云数据库初始化
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
    contactor: '',
    phone: '',
    imagePath: '',
    problemDetail: '',
    createtime: '',
    report_id:'',
    status:'',
    assignPhone:'',
    assignName:'',
    plan_time:''



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.report_id)
    var that = this;
    const _ = db.command;

    //1，获取订单信息
    db.collection('repair_orders').where({
      report_id: _.eq(parseInt(options.report_id)),
    })
      .get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data[0]);
  
        switch (res.data[0].status.toString()) {
          case "0":
            that.setData({
              status: '等待审核,请联系信息中心'
            });
            break;
          case "3":
            that.setData({
              status: '等待派发'
            });
            break;
          case "2":
            //2，获取接单员信息
            db.collection('hz_role_user').where(
              _.or([
                {
                  //自己领取的订单
                  nickName: _.eq(res.data[0].assignName)
                },
                { //前台分配的订单
                  name: _.eq(res.data[0].assignName)
                }
              ])).get().then(res1 => {

                console.log('销售员的信息:'+res1.data[0].name);
                that.setData({ assignPhone: res1.data[0].phone});

              })

            that.setData({
              status: "已派发给技术员[" + res.data[0].assignName + "]，预计要" + res.data[0].plan_time+"小时到达",
              assignName: res.data[0].assignName,
              plan_time: res.data[0].plan_time
            });
            break;
        } 
        

        that.setData({
          facilityid: res.data[0].facilityid,
          facilityName: res.data[0].facilityName,
          brandName: res.data[0].brandName,
          facilityOrg: res.data[0].facilityOrg,
          address: res.data[0].address,
          contactor: res.data[0].contactor,
          phone: res.data[0].phone,
          imagePath: res.data[0].imagePath,
          problemDetail: res.data[0].problemDetail,
          createtime: app.formatDate(new Date(res.data[0].createtime)),
          report_id: res.data[0].report_id,
          facilityType: res.data[0].facilityType,
          assignName: res.data[0].assignName


        })
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
 


})