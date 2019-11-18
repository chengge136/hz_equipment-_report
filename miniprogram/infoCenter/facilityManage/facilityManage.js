// infoCenter/facilityManage/facilityManage.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidden: false,
    items: [
      { name: '0', value: '打印机'},
      { name: '1', value: '复印机'},
      { name: '2', value: '电脑'},
      { name: '3', value: '其他'},
    ],
    organization: '',
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
    var that=this;
    console.log('organization', options.organization);
    console.log('openid', options.openid);

    that.setData({
      organization: options.organization,
      myopenid: options.openid,

    })

    var that = this;
    const _ = db.command;
    db.collection('facility_manage').where({
      organization: _.eq(options.organization)
    })
      .get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data[0]);
        
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
            selected_array:selected_string,
            isHidden: true
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
  submit_add:function(){
    var that = this;
    wx.showModal({
      title: '设置',
      content: '确定以上勾选的设备报修时需要审核吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.facility_set();

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  submit_modify: function () {
    var that = this;
    wx.showModal({
      title: '更新',
      content: '以上勾选的设备报修时需要审核吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.facility_update();

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  facility_set:function(){
    wx.cloud.callFunction({
      name: 'infofacilitySet',
      data: {
        organization: this.data.organization,
        auto_array: this.data.auto_array
      },
      complete: res => {
        console.log('infofacilitySet callFunction test result: ', res);
      }
    })

    wx.showToast({
      title: '设置成功',
      icon: 'success',
      duration: 2000,
      success: function () {
        console.log('haha');
        setTimeout(function () {
          //要延时执行的代码
          wx.redirectTo({
            url: '../../pages/infoIndex/infoIndex'
          })
        }, 2000) //延迟时间
      }
    })
  },

  facility_update: function () {
    var that = this;
    console.log(this.data.organization + '_' + this.data.auto_array);
  
    wx.cloud.callFunction({
      name: 'facilityManage',
      data: {
        organization: this.data.organization,
        auto_array: this.data.auto_array
      },
      complete: res => {
        console.log('facilityManage callFunction test result: ', res);
      }
    })
    //查询roles数据表的organization，若为空，则把facility_manage的organization更新到hz_role_user
    wx.showToast({
      title: '更新成功',
      icon: 'success',
      duration: 2000,
      success: function () {
        console.log('haha');
        setTimeout(function () {
          //要延时执行的代码
          wx.redirectTo({
            url: '../../pages/infoIndex/infoIndex'
          })
        }, 2000) //延迟时间
      }
    })
    
  }
})