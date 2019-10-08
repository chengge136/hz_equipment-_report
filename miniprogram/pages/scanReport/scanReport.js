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
    contactor: '',
    phone: '',
    imagePath:'',
    problemDetail:'',
    createtime:''


  },
  submit_info: function () {
    if (!this.data.imagePath == '') {
      wx.cloud.uploadFile({
        cloudPath: this.data.facilityid+'example.jpg',
        filePath: this.data.imagePath, // 文件路径
        success: res => {
          // get resource ID
          console.log(res.fileID)
        },
        fail: err => {
          // handle error
        }
      })
    } else if (this.data.problemDetail == ''){
     
      wx.showModal({
        title: '提示',
        content: '设备照片和问题描述至少需要一个',
        showCancel:false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } 
        }
      })
    }
 

    wx.cloud.callFunction({
      name: 'repairorders',
      data: {
        facilityid: this.data.facilityid,
        facilityName: this.data.facilityName,
        brandName: this.data.brandName,
        facilityType: this.data.facilityType,
        facilityOrg: this.data.facilityOrg,
        address: this.data.address,
        contactor: this.data.contactor,
        phone: this.data.phone,
        imagePath: this.data.imagePath,
        problemDetail: this.data.problemDetail,
        createtime: this.data.createtime,
        report_id: this.data.createtime,
       
      },
      complete: res => {
        console.log('callFunction test result: ', res);
       
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.facilityid)
    var that = this;
    const _ = db.command;
    db.collection('facility').where({
      facilityid: _.eq(options.facilityid)
    })
      .get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data[0]);
        //设置设备类型
        switch (res.data[0].facilityType.toString()) {
          case "0":
            that.setData({
              facilityType: '打印机'
            }) ;
            break;
          case "1":
            that.setData({
              facilityType: '复印机'
            });
            break;
          case "2":
            that.setData({
              facilityType: '电脑'
            });
            break;
          case "3":
            that.setData({
              facilityType: '其他'
            });
            break;
        } 


        that.setData({
          facilityid: res.data[0].facilityid,
          facilityName: res.data[0].facilityName,
          brandName: res.data[0].brandName,
          facilityOrg: res.data[0].facilityOrg,
          address: res.data[0].address,
          contactor: res.data[0].contactor,
          phone: res.data[0].phone

        })
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



  addressIn: function (event) {
    var that = this;
    that.setData({
      address: event.detail
    })
  },
  contactorIn: function (event) {
    var that = this;
    that.setData({
      contactor: event.detail
    })
  },
  phoneIn: function (event) {
    var that = this;
    that.setData({
      phone: event.detail
    })
  },

//upload img
  choose_image:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePath = res.tempFilePaths[0]
        console.log(tempFilePath);
        
        that.setData({
          imagePath: tempFilePath
        })
      }
    })

  },
  //图片点击事件
  imgYu: function (event) {
    console.log(event)
    var imgArr = [];
    var src = event.currentTarget.dataset.src;//获取data-src
    imgArr[0] = src;
    //var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgArr
    })
  },
  removeImage: function() {
   var that=this;
    if (!this.data.imagePath==''){
      wx.showModal({
        title: '系统提醒',
        content: '确定要删除此图片吗？',
        success: function (res) {
          if (res.confirm) {
            that.setData({
              imagePath: ''
            })
          } else if (res.cancel) {
            return false;
          }
        }
      })
   }  
  } ,
  
  getDataBindTap: function(e) {
    var that=this;
    that.setData({
      problemDetail: e.detail.value
    })
  },
})