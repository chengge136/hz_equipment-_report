// manager/excelOut/excelOut.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileUrl:'',
    currentDate: new Date().getTime(),
    export_date: '',
    begin:0,
    end:0,
    desc:'1，选择你要导出的月份\n2，点击生成excel报表按钮（绿色）\n3，点击复制下载文档链接按钮（蓝色）\n4，把复制到的链接，长按粘贴发送到电脑微信端或者电脑qq端\n5，电脑端打开链接查看导出的excel报表',
    desc_1: '1，选择你要导出的年份\n2，点击生成excel报表按钮（绿色）\n3，点击复制下载文档链接按钮（蓝色）\n4，把复制到的链接，长按粘贴发送到电脑微信端或者电脑qq端\n5，电脑端打开链接查看导出的excel报表'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getExcel:function(){
    var that = this;
    if (that.data.export_date==''){
      wx.showToast({
        title: '请先选择要导出的时间区间',
        icon: 'none',
        duration: 3000
      })
    }else{
      if (!that.data.fileUrl == ''){
        wx.showToast({
          title: '已经导出，请点击复制下载链接',
          icon: 'none',
          duration: 3000
        })
      }else{
        wx.showModal({
          title: '导出excel',
          content: '确定导出[ ' + that.data.export_date + ' ]的报修单报表吗？',
          success(res) {
            if (res.confirm) {
              wx.showLoading({
                title: '正在导出',
              })
              wx.cloud.callFunction({
                name: "getRepairLists",
                data: {
                  begin: that.data.begin,
                  end: that.data.end
                }
               
              }).then(res => {
                console.log(res.result);
                that.savaExcel(res.result.data);
              }).catch(err => {
                console.error('读取失败' + err)
              })

              setTimeout(function () {
                wx.hideLoading()
              }, 4000)

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }

    }

  },
  bindDateChange(event) {
    var start = event.detail.value+'-01';
    var end = event.detail.value + '-30';
    var data_start = new Date(start);
    var data_end = new Date(end);
    //获得时间戳
    var time_start = data_start.getTime();
    var time_end = data_end.getTime();
    //var localtime = new Date().toLocaleDateString();

    console.log(time_start, 'VVV', time_end);
    this.setData({
      export_date: event.detail.value,
      begin: time_start,
      end: time_end
    });

  },
  bindYearChange(event) {
    var start = event.detail.value + '-01-01';
    var end = event.detail.value + '-12-30';
    var data_start = new Date(start);
    var data_end = new Date(end);
    //获得时间戳
    var time_start = data_start.getTime();
    var time_end = data_end.getTime();
    //var localtime = new Date().toLocaleDateString();

    console.log(time_start, 'VVV', time_end);
    this.setData({
      export_date: event.detail.value,
      begin: time_start,
      end: time_end
    });

  },
  //获取云存储文件下载地址，这个地址有效期一天
  getFileUrl: function (fileID) {
    let that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        // get temp file URL
        console.log("文件下载链接", res.fileList[0].tempFileURL);
        that.setData({
          fileUrl: res.fileList[0].tempFileURL
        })
      },
      fail: err => {
        // handle error
      }
    })
  },

  //把数据保存到excel里，并把excel保存到云存储
  savaExcel: function (userdata) {
    let that = this
    wx.cloud.callFunction({
      name: "excel",
      data: {
        userdata: userdata
      },
      success(res) {
        console.log("保存成功", res)
        that.getFileUrl(res.result.fileID)
      },
      fail(res) {
        console.log("保存失败", res)
      }
    })
  },

  //复制excel文件下载链接
  copyFileUrl:function() {
    let that = this
    wx.setClipboardData({
      data: that.data.fileUrl,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log("复制成功", res.data) // data
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