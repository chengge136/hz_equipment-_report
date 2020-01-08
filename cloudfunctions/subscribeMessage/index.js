const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openId,
      page: 'pages/managerIndex/managerIndex',
      data: {
        "character_string1": { "value": "202001060001" },
        "name2": { "value": "张三" },
        "thing3": { "value": "打印机" },
        "character_string4": { "value": "112211" },
        "thing5": { "value": "建设局" }
      },
      templateId: 'ma8Q8D5NlwTAs0oVq1JJp7uSxCpCW_Rq8uzfWUoLtiY'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}