// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('repair_orders').where({
    status: _.eq(1),
    report_id: _.gte(event.begin),
    report_id: _.lte(event.end)
  }).get();
}

