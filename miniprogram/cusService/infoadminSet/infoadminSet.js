// pages/facilityInfo/facilityInfo.js
//云数据库初始化
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    managerName: '',
    phone: '',
    organization: '',
    updateBy:'',
    inputValue: '', //点击结果项之后替换到文本框的值
    adapterSource: [], //本地匹配源
    bindSource: [], //绑定到页面的数据，根据用户输入动态变化
    hideScroll: true,
  },
  addInfo:function(){
    //查询不到，可以添加
    wx.cloud.callFunction({
      name: 'infoManager',
      data: {
        managerName: this.data.managerName,
        phone: parseInt(this.data.phone),
        organization: this.data.organization,
        updateBy: this.data.updateBy,
      },
      complete: res => {
        console.log('infoManager callFunction test result: ', res);
        //
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: '../../pages/index/index'
              })
            }, 2000) //延迟时间
          }
        })
        //
      }
    })
  },

  submit_info: function () {
    var that = this;
    const _ = db.command;
    db.collection('hz_role_user').where({
      phone: parseInt(this.data.phone),
      roleid: 3
    }).get().then(res => {
      if (res.data.length == 0) {

        wx.showModal({
          title: '修改',
          content: '确定设置 ' + this.data.managerName+' 为 ' + this.data.organization+' 的信息中心管理员？',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              that.addInfo();

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })




      } else {
        wx.showToast({
          title: '此人已添加，无需再次添加',
          icon: 'none',
          duration: 4000,
          success: function () {
            console.log('error');
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







  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var tem_arrs = [];
    const _ = db.command;
    that.setData({
      updateBy: options.openid
    })

    wx.cloud.callFunction({
      name: "getOrg"
    }).then(res => {

      for (var index in res.result.data) {
        tem_arrs.push(res.result.data[index].name)
        //console.log(res.result.data[index].name)
      };
      that.setData({ adapterSource: tem_arrs})

    }).catch(err => {
      console.error(err)
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

  managerName: function (event) {
    var that = this;
    that.setData({
      managerName: event.detail
    })
  },
  phone: function (event) {
    var that = this;
    that.setData({
      phone: event.detail
    })
  },
  organization: function (event) {
    var that = this;
    //用户实时输入值
    var prefix = event.detail;
    //匹配的结果
    var newSource = []
    if (prefix != "") {
      // 对于数组array进行遍历，功能函数中的参数 `e`就是遍历时的数组元素值。
      this.data.adapterSource.forEach(function (e) {
        // 用户输入的字符串如果在数组中某个元素中出现，将该元素存到newSource中
        if (e.indexOf(prefix) != -1) {
          console.log(e);
          newSource.push(e)
        }
      })
    };
    // 如果匹配结果存在，那么将其返回，相反则返回空数组
    if (newSource.length != 0) {
      this.setData({
        // 匹配结果存在，显示自动联想词下拉列表
        hideScroll: false,
        bindSource: newSource,
        arrayHeight: newSource.length * 71
      })
    } else {
      this.setData({
        // 匹配无结果，不现实下拉列表
        hideScroll: true,
        bindSource: []
      })
    }
   

  },
  // 用户点击选择某个联想字符串时，获取该联想词，并清空提醒联想词数组
  itemtap: function (e) {
    this.setData({
      // .id在wxml中被赋值为{{item}}，即当前遍历的元素值
      organization: e.target.id,
      // 当用户选择某个联想词，隐藏下拉列表
      hideScroll: true,
      bindSource: []
    })
  }
})