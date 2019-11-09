import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '每季度销售量统计',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['销售量', '维修量', '更换部件'],
      top: 50,
      left: 'center',
      backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['一季度', '二季度', '三季度', '四季度'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: '销售量',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30]
    }, {
      name: '维修量',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35]
    }, {
      name: '更换部件',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50]
}]
  };

  chart.setOption(option);
  return chart;
}

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
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
