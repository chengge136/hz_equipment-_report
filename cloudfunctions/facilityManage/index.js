// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('facility_manage').where({
    org_id: _.eq(event.org_id)
  }).update({
    // data 传入需要局部更新的数据
    data: {
      auto_array: event.auto_array,
      update_time: new Date().getTime()
    }
  })
    .then(console.log)
    .catch(console.error)



}

