import moment from 'moment-timezone'
/**
 * 时区方法
 *
 * @param serverTime
 */
export const timeUtil2 = (serverTime: any) => {
  if (!serverTime) return moment().format('YYYY-MM-DD HH:mm:ss')
  //获取浏览器时区
  const browserTimezone = moment.tz.guess()

  //将传递过来的时间，转成moment对象。 固定是 GMT + 8
  const server = moment(serverTime)

  //根据浏览器时区来转化
  const browserTime = server.clone().tz(browserTimezone)

  //以年月日 时分秒形式展现
  return browserTime.format('YYYY-MM-DD HH:mm:ss')
}

export const timeUtil3 = (serverTime: any) => {
  if (!serverTime) return moment().format('YYYY-MM-DD HH:mm:ss')
  //获取浏览器时区
  const browserTimezone = moment.tz.guess()

  //将传递过来的时间，转成moment对象。 固定是 GMT + 8
  const server = moment(serverTime)

  //根据浏览器时区来转化
  const browserTime = server.clone().tz(browserTimezone)

  //以年月日 时分秒形式展现
  return browserTime.format('MM-DD HH:mm')
}

/**
 * 返回 moment类型。
 *
 * @param serverTime
 */
export const timeUtilMoment = (serverTime: any): moment.Moment => {
  if (!serverTime) return moment()
  //获取浏览器时区
  const browserTimezone = moment.tz.guess()

  //将传递过来的时间，转成moment对象。 固定是 GMT + 8
  const server = moment(serverTime)

  //根据浏览器时区来转化
  //以年月日 时分秒形式展现
  return server.clone().tz(browserTimezone)
}

/**
 * 当前时间
 */
export const timeUtilNow = () => {
  //获取浏览器时区
  const browserTimezone = moment.tz.guess()
  const server = moment()
  const browserTime = server.clone().tz(browserTimezone)
  //以年月日 时分秒形式展现
  return browserTime.format('YYYY-MM-DD HH:mm:ss')
}

export const timeUtilNowMoment = () => {
  //获取浏览器时区
  return moment(new Date()).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
}

export const timeMinuteSecond = (value: number) => {
  const date = new Date(value)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  let hoursString = hours + ''
  if (hours < 10) {
    hoursString = '0' + hoursString
  }
  let minuteString = minutes + ''
  if (minutes && minutes < 10) {
    minuteString = '0' + minuteString
  }
  return `${hoursString}:${minuteString}`
}
