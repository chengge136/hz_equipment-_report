// infoCenter/facilityManage/facilityManage.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    organization:'',
    printer:'',
    duplicator:'',
    computer:'',
    other:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('openid', options.openid)
    var that = this;
    const _ = db.command;
    db.collection('hz_role_user').where({
      openid: _.eq(options.openid)
    })
      .get().then(res => {
        // 通过openid获取到organization
        console.log(res.data[0].organization);
        that.setData({
          organization: res.data[0].organization
        });
        

        var org = res.data[0].organization;
        //通过organization查询本单位的approver信息
        db.collection('hz_role_user').where({
          roleid: _.eq(4),
          organization: _.eq(org)
        })
          .get().then(res1 => {
           
            console.log(res1.data);
            for (var index in res1.data) {
              switch (res1.data[index].approveType.toString()) {
                case "0":
                  that.setData({
                    printer: res1.data[index].name
                  });
                  break;
                case "1":
                  that.setData({
                    duplicator: res1.data[index].name
                  });
                  break;
                case "2":
                  that.setData({
                    computer: res1.data[index].name
                  });
                  break;
                case "3":
                  that.setData({
                    other: res1.data[index].name
                  });
                  break;
              }

            }
           

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
  printer: function () {
    console.log('print');
    console.log(this.data.organization);
    wx.navigateTo({
      url: '../approverModify/approverModify?organization=' + this.data.organization + '&approveType=0',
    })
  },
  duplicator: function () {
    console.log('duplicator');
    wx.navigateTo({
      url: '../approverModify/approverModify?organization=' + this.data.organization + '&approveType=1',
    })
  },
  computer: function () {
    console.log('computer');
    wx.navigateTo({
      url: '../approverModify/approverModify?organization=' + this.data.organization + '&approveType=2',
    })
  },
  other: function () {
    console.log('other');
    wx.navigateTo({
      url: '../approverModify/approverModify?organization=' + this.data.organization + '&approveType=3',
    })
  }

})