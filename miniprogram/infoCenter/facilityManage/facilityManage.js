// infoCenter/facilityManage/facilityManage.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    items: [
      { name: '0', value: '打印机'},
      { name: '1', value: '复印机'},
      { name: '2', value: '电脑'},
      { name: '3', value: '其他'},
    ],
    org_id: '',
    organization: '',
    org_code: '',
    update_by: '',
    auto_array:'',
    selected_array:'',
    myopenid: ''
  },
  checkboxChange: function (e) {
    var that=this;
    console.log('checkbox e：', e.detail);

    //console.log('checkbox发生change事件，携带value值为：', e.detail.value.toString());
    that.setData({
      auto_array: e.detail.value.toString()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('org_id',options.org_id)
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
          var selected_string='';
          for (let i = 0; i < previous_arrays.length; ++i) {
            selected_string = selected_string+' '+this.data.items[previous_arrays[i]].value;
          }
          that.setData({
            selected_array:selected_string
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
  submit_info: function () {
    var that = this;
    wx.showModal({
      title: '更新',
      content: '以上勾选的设备报修时需要审核吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.facility_set();

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

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  facility_set: function () {
    var that = this;
    const _ = db.command;
    db.collection('hz_role_user').where({
      openid: this.data.myopenid.toString()
    }).get().then(res => {
      // res.data 包含该记录的数据
      if (res.data[0]) {
        if (res.data[0].organization == '') {
          wx.cloud.callFunction({
            name: 'updateRole',
            data: {
              openid: this.data.myopenid.toString(),
              organization: this.data.organization
            },
            complete: res => {
              console.log('更新了role表的organization: ', res);
            }
          })
        }

      }
    })

    wx.cloud.callFunction({
      name: 'facilityManage',
      data: {
        org_id: this.data.org_id,
        auto_array: this.data.auto_array
      },
      complete: res => {
        console.log('facilityManage callFunction test result: ', res);
      }
    })
    //查询roles数据表的organization，若为空，则把facility_manage的organization更新到hz_role_user

    


  }
})