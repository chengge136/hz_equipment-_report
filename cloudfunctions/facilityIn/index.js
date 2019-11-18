// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('facility').add({
    data: {
      facilityid: event.facilityid,
      facilityName: event.facilityName,
      brandName: event.brandName,
      facilityOrg: event.facilityOrg,
      address: event.address,
      facilityType: event.facilityType,
      contactor: event.contactor,
      phone: event.phone
    }
  })
    .then(console.log)
    .catch(console.error)

}
