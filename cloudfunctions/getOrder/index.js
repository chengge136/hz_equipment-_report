// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('repair_orders').where({
    report_id: _.eq(event.report_id)
  }).update({
    // data 传入需要局部更新的数据
    data: {
      status: 2,
      plan_time: event.arrival_time,
      assignId: event.openid,
      assignName: event.nickName
    }
  })
    .then(console.log)
    .catch(console.error)



}

