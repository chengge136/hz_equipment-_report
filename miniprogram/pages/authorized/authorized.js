//获取应用实例
const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
    nickName: 'customer',
    myopenid: '',
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  onLoad: function() {
    var that = this;

    //获得openid
    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function(res) {
        that.setData({
          //将openid赋值给本地变量myopenid
          myopenid: res.result.openid
        })
        console.log('myopenid:', res.result.openid);
        const _ = db.command;
        db.collection('hz_role_user').where({
          openid: res.result.openid
        }).get().then(res => {
          if (!res.data.length == 0) {
            if (res.data[0].roleid == 2) {
              wx.redirectTo({
                url: '../cusIndex/cusIndex',
              });
            }
          }
        })
      }
    })


    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo.nickName);
              console.log(res.userInfo.avatarUrl); //获取微信用户头像存放的Url
              setTimeout(function() {
                wx.redirectTo({
                  url: '../logIn/logIn?nickName=' + res.userInfo.nickName + '&avatarUrl=' + res.userInfo.avatarUrl,
                })
              }, 1000);
            }
          });
        } else {
          that.setData({
            isHide: true
          });
        }
      }
    });

  },
  nopwsubmit: function() {
    wx.cloud.callFunction({
      name: 'roleIn',
      data: {
        openid: this.data.myopenid,
        nickName: this.data.nickName,
        avatarUrl: '',
        roleid: 2
      },
      complete: res => {
        console.log('客户端 roleIn test result: ', res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          success: function() {
            console.log('login success');
            setTimeout(function() {
              //要延时执行的代码
              wx.redirectTo({
                url: '../cusIndex/cusIndex'
              })
            }, 2000) //延迟时间
          }
        })

      }
    })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });

      setTimeout(function() {
        //要延时执行的代码
        wx.redirectTo({
          url: '../logIn/logIn?nickName=' + e.detail.userInfo.nickName + '&avatarUrl=' + e.detail.userInfo.avatarUrl,
        })
      }, 1000); //延迟时间

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }

})