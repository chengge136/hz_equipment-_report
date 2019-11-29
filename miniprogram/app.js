//app.js
App({

  // 全局数据，供小程序内的个页面以及组建使用

  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },

  // 时间戳转为日期时间
  formatDate: function (now) {
    
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  },
  getDate: function (now) {

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    return year + "-" + month + "-" + date;
  },

  // 扫码跳转页面
  scanCode: function (url) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success(res) {
        //打印ISBN码
        var result = res.result;
        var idIndex = result.indexOf("$id") + 4; // 从结果中获取机器id
        var idString = result.substr(idIndex, 12);
        console.log(idString);
        wx.navigateTo({
          url: url + idString,
        })  
      },
      fail(res) {
        console.log(res)
      }
    })   
  }


})
