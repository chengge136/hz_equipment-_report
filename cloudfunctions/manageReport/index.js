// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('repair_orders').add({
    data: {
      facilityid:'',
      facilityName: event.facilityName,
      brandName: event.brandName,
      facilityType: event.facilityType,
      facilityOrg: event.facilityOrg,
      address: event.address,
      contactor: event.contactor,
      phone: event.phone,
      problemDetail: event.problemDetail,
      createtime: new Date().toLocaleDateString(),
      report_id: new Date().getTime(),
      reportorId: event.openid,
      reportType: 1,
      status: 3,
      rejection: '',
      plan_time: '',
      sign_time: '',
      assignId: '',
      assignName: '',
      comment: '',
      completeTime: ''
    }
  })
}

