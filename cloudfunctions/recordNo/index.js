// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('recall_repair_order').add({
    data: {
      facilityid: event.facilityid,
      facilityName: event.facilityName,
      brandName: event.brandName,
      facilityType: event.facilityType,
      facilityOrg: event.facilityOrg,
      address: event.address,
      next_date: event.next_date,
      comment: event.comment,
      contactor: event.contactor,
      phone: event.phone,
      createtime: new Date().getTime(),
      report_id: new Date().getTime(),
      status:3,
      reportorId: event.openid,
      assignId:'',
      assignName:'',
      rejection:''

    }
  })
    .then(console.log)
    .catch(console.error)

}

