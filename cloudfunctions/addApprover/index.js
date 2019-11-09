// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('hz_role_user').add({
    data: {
      name: event.name,
      phone: event.phone,
      userid: new Date().getTime(),
      organization: event.organization,
      approveType: event.approveType,
      roleid:4,
      openid:''
    }
  })
    .then(console.log)
    .catch(console.error)

}

