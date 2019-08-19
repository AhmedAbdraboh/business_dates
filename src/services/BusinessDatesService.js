const constants = require('../../constants')
const { DateTime } = require('luxon')
const Logger = require('../../logger')
const Holidays = require('date-holidays')
const hd = new Holidays('US')

module.exports = {
  getBusinessDates,
  isBusinessDate
}

function getBusinessDates ({ initialDate, delay }) {
  delay = Number(delay)
  const initialDateObj = DateTime.fromISO(initialDate, { zone: 'utc' })
  let delaysCount = 1
  let i = 0
  let totalDays = 0
  let holidayDays = 0
  let weekendDays = 0
  while (delaysCount <= delay) {
    let nextDate = initialDateObj.plus({ day: i })
    if (isWeekEndDay(nextDate)) {
      totalDays++
      weekendDays++
      i++
      continue
    }

    if (isHoliday(nextDate)) {
      totalDays++
      holidayDays++
      i++
      continue
    }
    delaysCount++
    i++
    totalDays++
  }
  const businessDate = initialDateObj.plus({ days: totalDays - 1 })
  const response = { initialQuery: {
    initialDate, delay
  },
  results: {
    totalDays, weekendDays, holidayDays, businessDate: businessDate.toString()
  } }
  Logger.info(response)
  return response
}

function isBusinessDate (initialDate) {
  const initialDateObj = DateTime.fromISO(initialDate)
  const isBusinessDate = !isHoliday(initialDateObj) && !isHoliday(initialDateObj)
  Logger.info(isBusinessDate)
  return isBusinessDate
}
function isWeekEndDay (date) {
  return date.weekdayShort === constants.DAY_SAT || date.weekdayShort === constants.DAY_SUN
}

function isHoliday (date) {
  const holiday = hd.isHoliday(date.toJSDate())
  return holiday && (holiday.type === constants.HOLIDAY_BANK || holiday.type === constants.HOLIDAY_PUBLIC)
}
