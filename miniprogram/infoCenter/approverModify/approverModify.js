// pages/facilityQuery/facilityQuery.js
//云数据库初始化
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    facilityType: '',
    organization:'',
    name:'',
    phone:'',
    userid:'',
    approveType:'',
    isHidden: false
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.organization, '----', options.approveType);

    that.setData({
      organization: options.organization,
      approveType: options.approveType
    });
    var org = options.organization;
    //设备类型
    switch (options.approveType.toString()) {
      case "0":
        that.setData({
          facilityType: '打印机'
        });
        break;
      case "1":
        that.setData({
          facilityType: '复印机'
        });
        break;
      case "2":
        that.setData({
          facilityType: '电脑'
        });
        break;
      case "3":
        that.setData({
          facilityType: '其他'
        });
        break;
    }


    const _ = db.command;
    console.log('db', options.approveType);
    db.collection('hz_role_user').where({
      approveType: _.eq(parseInt(options.approveType)),
      roleid: _.eq(4),
      organization: _.eq(org)

    })
      .get().then(res => {

        console.log('length:',res.data.length);
        //如果没有数据，则隐藏修改按钮，显示添加按钮；
        if (res.data.length==0){
          that.setData({
            isHidden: true
          })
        }else{
          console.log('审核人：', res.data[0]);
          that.setData({
            name: res.data[0].name,
            phone: res.data[0].phone,
            userid: res.data[0].userid,

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
  nameIn: function (event) {
    var that = this;
    that.setData({
      name: event.detail
    })
  },
  phoneIn: function (event) {
    var that = this;
    that.setData({
      phone: event.detail
    })
  },
  submit_modify: function () {
    var that = this;
    wx.showModal({
      title: '修改',
      content: '确定要修改此设备的审批人基本信息？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.updateApprover();

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  updateApprover: function () {
    wx.cloud.callFunction({
      name: 'updateApprover',
      data: {
        name: this.data.name,
        phone: parseInt(this.data.phone),
        userid: this.data.userid
      },
      complete: res => {
        console.log('updateApprover callFunction test result: ', res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.switchTab({
                url: '../../pages/infoIndex/infoIndex'
              })
            }, 2000) //延迟时间
          }
        })

      }
    })
  },
  submit_add: function () {
    var that = this;
    wx.showModal({
      title: '修改',
      content: '确定添加此人为设备报修审批人？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.addApprover();

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  addApprover: function () {
    wx.cloud.callFunction({
      name: 'addApprover',
      data: {
        name: this.data.name,
        phone: parseInt(this.data.phone),
        organization: this.data.organization,
        approveType: parseInt(this.data.approveType)
      },
      complete: res => {
        console.log('addApprover callFunction test result: ', res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.switchTab({
                url: '../../pages/infoIndex/infoIndex'
              })
            }, 2000) //延迟时间
          }
        })

      }
    })
  }
})