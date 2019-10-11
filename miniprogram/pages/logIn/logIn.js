// pages/login/login.js

var app = getApp();
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    no: '',
    pwd: '',
    noinput: false,
    pwdinput: false,
    myopenid:'',
    nickName:''
  },
  noinput: function (e) {
    this.setData({ no: e.detail.value });
    this.setData({ noinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false });
    }

  },
  pwdinput: function (e) {
    this.setData({ pwd: e.detail.value });
    this.setData({ pwdinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false });
    }
  },

  submit: function (e) {
    wx.showLoading({
      title: '登录中...',
    })
    this.setData({ disabled: true });

    if (this.data.no == 'admin' && this.data.pwd == 'admin') {
      wx.showToast({
        title: '登录成功',
        icon: '登录成功',
        duration: 2000
      })
     
      wx.cloud.callFunction({
        name: 'roleIn',
        data: {
          openid: this.data.myopenid,
          tabbar: 1,
          nickName: this.data.nickName,

        },
        complete: res => {
          console.log('售后端 roleIn test result: ', res);

          wx.showToast({
            title: '成功',
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


    } else {
      wx.showToast({
        title: '账号密码错误',
        icon: 'none',
        duration: 2000
      })
      this.setData({ disabled: false });
    }
  },
  nopwsubmit:function(){

    wx.cloud.callFunction({
      name: 'roleIn',
      data: {
        openid: this.data.myopenid,
        tabbar: 0,
        nickName: this.data.nickName,


      },
      complete: res => {
        console.log('客户端 roleIn test result: ', res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.switchTab({
                url: '../cusIndex/cusIndex'
              })
            }, 2000) //延迟时间
          }
        })

      }
    })
  },


  formSubmit: function (e) {
    wx.showLoading({
      title: '登录中...',
    })
    console.log(e);
    this.setData({ disabled: true });
    wx.request({
      url: app.globalData.url.login, //仅为示例，并非真实的接口地址
      data: {
        no: e.detail.value.no,
        pwd: e.detail.value.pwd
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.error == true) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.setStorageSync('student', res.data.data);
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.switchTab({
                url: '../teacher/teacher',
              })
            }, 2000)
          }
        } else {
          wx.showToast({
            title: '服务器出现错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('login nickName是',options.nickName)
    //请求云函数
    var that = this;
    that.setData({
      //将openid赋值给本地变量myopenid
      nickName: options.nickName
    });
    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {
        
        that.setData({
          //将openid赋值给本地变量myopenid
          myopenid: res.result.openid
        })
        console.log('myopenid:', res.result.openid);

        const _ = db.command;
        db.collection('hz_role_user').where({
          openid: res.result.openid
        }).get().then(res => {
          // res.data 包含该记录的数据
          console.log(res.data[0]);
          if (res.data[0]){
            if (res.data[0].tabbar==1){
              wx.switchTab({
                url: '../index/index',
              })
            }else{
              wx.switchTab({
                url: '../cusIndex/cusIndex',
              })
            }
          }
       
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
    if (this.data.no == '' || this.data.pwd == '') {
      this.setData({ disabled: true });
    } else {
      this.setData({ disabled: false });
    }
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

  }
})