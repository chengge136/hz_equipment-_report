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
    createtime:'',
    myopenid: '',
    status:''
  },
  submit_info: function () {
    var that = this;
    wx.showModal({
      title: '提交',
      content: '确定此设备的报修信息无误？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.submitreport();

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
 
  },
  submitreport:function(){
    var that = this;
    if (!this.data.imagePath == '') {
      wx.cloud.uploadFile({
        cloudPath: this.data.facilityid + '.jpg',
        filePath: this.data.imagePath, // 文件路径
        success: res => {
          // get resource ID
          console.log(res.fileID);
          that.report(res.fileID);
        },
        fail: err => {
          // handle error
        }
      })
    } else if (this.data.problemDetail == '') {
      wx.showModal({
        title: '提示',
        content: '设备照片和问题描述至少需要一个',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      that.report();
    }
  },

  report:function(fileId){
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
        imagePath: fileId,
        problemDetail: this.data.problemDetail,
        createtime: this.data.createtime,
        report_id: this.data.createtime,
        openid: this.data.myopenid,
        status: this.data.status
      },
      complete: res => {
        console.log('callFunction test result: ', res);
        wx.showToast({
          title: '上报成功',
          icon: 'success',
          duration: 1000,
          success: function () {
            console.log('haha');
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: '../../pages/cusIndex/cusIndex'
              })
            }, 500) //延迟时间
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

    db.collection('repair_orders').where({
      facilityid: _.eq(options.facilityid),
      status: _.neq(1)
    }).count({
      success: function (res) {
        console.log('未完成的订单数量', res.total);
        if (res.total > 0) {
          wx.showModal({
            title: '提示',
            content: '此设备已经报修，请在首页点击[报修跟踪]查询进度',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                setTimeout(function () {
                  //要延时执行的代码
                  wx.redirectTo({
                    url: '../../pages/cusIndex/cusIndex'
                  })
                }, 500) //延迟时间

              }
            }
          })
        }
      }
    })



    db.collection('facility').where({
      facilityid: _.eq(options.facilityid)
    })
      .get().then(res => {
        // res.data 包含该记录的数据
        console.log('facility',res.data[0]);
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

        db.collection('facility_manage').where({
          organization: _.eq(res.data[0].facilityOrg)
        })
          .get().then(res1 => {
            console.log('facility_manage',res1.data[0]);
            if (res1.data.length==0){
              console.log("此设备未设置是否上报");
              //不需要审核，状态改为3
              that.setData({
                status: 3
              })
            }else{
              var previous_arrays = res1.data[0].auto_array.split(",");
              //如果此设备是需要审核的
              if (previous_arrays.indexOf(res.data[0].facilityType.toString()) != -1) {
                console.log('包含需要审核的设备');
                that.setData({
                  status: 0
                })
              } else {
                //不需要审核，状态改为3
                that.setData({
                  status: 3
                })
              }
            }
        
          })

      })

    wx.cloud.callFunction({
      //调用的函数名字
      name: 'getOpenid',
      success: function (res) {
        that.setData({
          //将openid赋值给本地变量myopenid
          myopenid: res.result.openid
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