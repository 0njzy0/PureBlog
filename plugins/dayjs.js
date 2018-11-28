import dayjs from 'dayjs'
import Vue from 'vue'

function formatTime(time) {
  let minute = dayjs().diff(time, 'minute')
  let hour = dayjs().diff(time, 'hour')
  let day = dayjs().diff(time, 'day')
  let week = dayjs().diff(time, 'week')
  let month = dayjs().diff(time, 'month')
  if (minute == 0) {
    return '刚刚'
  } else if (minute < 60) {
    return minute + '分钟前'
  } else if (hour < 24) {
    return hour + '小时前'
  } else if (day < 7) {
    return day + '天前'
  } else if (week < 5) {
    return week + '周前'
  } else if (month < 12) {
    return month + '月前'
  } else {
    return dayjs(time).format('YYYY-MM-DD')
  }
}

Vue.prototype.$dayjs = dayjs
Vue.prototype.$formatTime = formatTime
