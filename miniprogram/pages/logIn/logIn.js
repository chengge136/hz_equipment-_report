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
    nickName:'',
    phone:'',
    phoneIn:'',
    isBindExpert:true
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
  phoneIn: function (e) {
    console.log(e.detail.value);
    this.setData({ phoneIn: e.detail.value });
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
  reviewLogin: function () {
    //检查手机号与数据库是否能够对应上，可以对应则登录页面，不可以则提示联系信息中心授权
    if ((!this.data.phone == '') &&(this.data.phone == this.data.phoneIn)) {
      
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            wx.redirectTo({
              url: '../reviewIndex/reviewIndex',
            })
          }, 2000) //延迟时间
        }
      })
     
    } else {
      wx.showToast({
        title: '无审核权限，请联系信息中心添加权限',
        icon: 'none',
        duration: 4000
      })
    }

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
          that.setData({
            //将openid赋值给本地变量myopenid
            phone: res.data[0].phone
          })
          /*
          if (res.data[0]){
            if (res.data[0].tabbar==1){
              wx.switchTab({
                url: '../index/index',
              })
            } else if (res.data[0].tabbar == 2){
              wx.switchTab({
                url: '../cusIndex/cusIndex',
              })
            } else if (res.data[0].tabbar == 3) {//信息中心审核保修单
              wx.switchTab({
                url: '../reviewIndex/reviewIndex',
              })
            }
          }*/
       
        })
      }
    })
   
    
  },
  display: function (){
    var that=this;
    if (this.data.isBindExpert){
      that.setData({
        isBindExpert:false
      })
    }else{
      that.setData({
        isBindExpert: true
      })
    }
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