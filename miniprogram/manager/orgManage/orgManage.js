const db = wx.cloud.database();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accessOrg: [],
    unableOrg: [],
    accessLength: 0,
    unableLength: 0,
    element: '',
    desc: '1，对于已授权可扫码报修的单位，若存在款项未结清，可点击单位名来关闭授权\n2，若下面列表未显示，可搜索单位名来查询并设置\n2，对于个别新增的授权单位，请点击 [新增授权] 按钮来添加\n4，对于大批量新增需要授权的单位，请联系软件部来批量添加',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const _ = db.command;

    db.collection('organizations').where({
      active: _.eq(1)
    }).orderBy('createtime', 'desc')
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)

          that.setData({
            accessOrg: res.data,
            accessLength: res.data.length
          })
        }
      })

 
    db.collection('organizations').where({
      active: _.eq(0)
    }).orderBy('createtime', 'desc')
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log('unableLength' + res.data.length)
          /*
          for (var index in res.data) {
            res.data[index].createtime = app.formatDate(new Date(res.data[index].createtime));
          }*/
          that.setData({
            unableOrg: res.data,
            unableLength: res.data.length

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
  new_access:function(){
    wx.navigateTo({
      url: '../../manager/addOrg/addOrg'
    })
  },
  onChange(e) {
    this.setData({
      element: e.detail
    });
  },

  onClick() {
    var that = this;
    const _ = db.command;

    if (that.data.element == '') {
      wx.showToast({
        title: '请先输入搜索的关键字',
        icon: 'none',
        duration: 3000
      })
    } else {
      console.log('搜索:' + that.data.element);
      db.collection('organizations').where({
            name: {
              $regex: '.*' + that.data.element,
            },
        active: _.eq(1)
          }).orderBy('createtime', 'desc').get({
          success: function (res) {
            // res.data 是包含以上定义的两条记录的数组
            console.log(res.data)

            that.setData({
              accessOrg: res.data,
              accessLength: res.data.length
            })
          }
        })

      //客户电话报修，前台无扫码提交
      db.collection('organizations').where({
        name: {
          $regex: '.*' + that.data.element,
        },
        active: _.eq(0)
      }).orderBy('createtime', 'desc').get({
          success: function (res) {
            
            that.setData({
              unableOrg: res.data,
              unableLength: res.data.length
            })
          }
        })
    }

  },
  bindDateChange(event) {
    console.log(event.detail.value);
    var start = event.detail.value + '-01';
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
    });

    var that = this;
    const _ = db.command;

    db.collection('repair_orders').where(_.and([
      {
        status: _.eq(1),
        reportType: _.eq(0),
        report_id: _.gte(time_start),
      },
      {
        report_id: _.lte(time_end)
      }
    ])).orderBy('createtime', 'desc')
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)

          for (var index in res.data) {
            res.data[index].createtime = app.formatDate(new Date(res.data[index].report_id));
          }

          that.setData({
            newHistoryOrders: res.data,
            newRepaireLength: res.data.length
          })
        }
      })

    //客户电话报修，前台无扫码提交
    db.collection('repair_orders').where(_.and([
      {
        status: _.eq(1),
        reportType: _.eq(1),
        report_id: _.gte(time_start),
      },
      {
        report_id: _.lte(time_end)
      }
    ])).orderBy('createtime', 'desc')
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log('phoneRepairLength' + res.data.length)
          for (var index in res.data) {
            res.data[index].createtime = app.formatDate(new Date(res.data[index].report_id));
          }
          that.setData({
            phoneRepairOrders: res.data,
            phoneRepairLength: res.data.length

          })
        }
      })

    db.collection('recall_repair_order').where(_.and([
      {
        status: _.eq(1),
        report_id: _.gte(time_start),
      },
      {
        report_id: _.lte(time_end)
      }
    ])).orderBy('createtime', 'desc').get({
      success: function (res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)

        for (var index in res.data) {
          res.data[index].createtime = app.formatDate(new Date(res.data[index].report_id));
        }

        that.setData({
          newRecallHistoryOrders: res.data,
          recallRepaireLength: res.data.length
        })
      }
    })

  }

})