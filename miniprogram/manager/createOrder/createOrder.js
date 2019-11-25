// pages/facilityInfo/facilityInfo.js
//云数据库初始化
const db = wx.cloud.database();

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
    inputValue: '', //点击结果项之后替换到文本框的值
    adapterSource: [], //本地匹配源
    bindSource: [], //绑定到页面的数据，根据用户输入动态变化
    hideScroll: true,

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
    var that = this;
    if (this.data.facilityName == '') {
      wx.showModal({
        title: '提示',
        content: '请填写完设备信息后再提交!',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      wx.showModal({
        title: '录入',
        content: '确定已经填入的信息无误？',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            that.addFacility();

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },
  addFacility: function () {
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

    this.setData({
      facilityid: options.facilityid
    })

    wx.cloud.callFunction({
      name: "getOrg"
    }).then(res => {

      for (var index in res.result.data) {
        tem_arrs.push(res.result.data[index].name)
        //console.log(res.result.data[index].name)
      };
      that.setData({ adapterSource: tem_arrs })

    }).catch(err => {
      console.error(err)
    })

    var count = db.collection('facility').where({
      facilityid: _.eq(options.facilityid)
    }).count({
      success: function (res) {
        console.log(res.total);
        if (res.total > 0) {
          wx.showModal({
            title: '提示',
            content: '此设备已完成过信息录入，请在首页使用设备查询',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                setTimeout(function () {
                  //要延时执行的代码
                  wx.redirectTo({
                    url: '../../pages/index/index'
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
        bindSource: [],
        facilityOrg: prefix
      })
    }
  },
  // 用户点击选择某个联想字符串时，获取该联想词，并清空提醒联想词数组
  itemtap: function (e) {
    this.setData({
      // .id在wxml中被赋值为{{item}}，即当前遍历的元素值
      facilityOrg: e.target.id,
      // 当用户选择某个联想词，隐藏下拉列表
      hideScroll: true,
      bindSource: []
    })
  },
  address: function (event) {
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
  descIn: function (e) {
    console.log(e.detail.value)
    this.setData({
      comment: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})