const cloud = require('wx-server-sdk')
//这里最好也初始化一下你的云开发环境
cloud.init()
//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async (event, context) => {
  try {

    let userdata = event.userdata

    //1,定义excel表格名
    let dataCVS = 'test.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['编号', '日期', '完成日期', '工程师', '用户名', '联系人','联系电话','联系地址','故障商品','故障现象','解决方法','状态']; //表属性
    alldata.push(row);

    


    for (let key in userdata) {
      let arr = [];
      arr.push(userdata[key].report_id);
      arr.push(userdata[key].createtime);
      arr.push(userdata[key].completeTime);
      
      arr.push(userdata[key].assignName);
      arr.push(userdata[key].facilityOrg);
      arr.push(userdata[key].contactor);

      arr.push(userdata[key].phone);
      arr.push(userdata[key].address);
      arr.push(userdata[key].facilityType);

      arr.push(userdata[key].problemDetail);
      arr.push(userdata[key].comment);
      arr.push(userdata[key].status);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}
