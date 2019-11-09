const app = getApp();

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    charts: [{
      id: 'bar',
      name: '设备维修统计'
    }, {
      id: 'pie',
      name: '设备维修占比'
    }, {
      id: 'line',
      name: '季度维修统计'
    }, {
      id: 'themeRiver',
      name: '测试'
    }]
   
  },

  onReady() {
  },

  open: function (e) {
    wx.navigateTo({
      url: '../../charts/' + e.target.dataset.chart.id + '/index'
    });
  }
});
