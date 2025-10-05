import iconFog from '@/assets/images/icon-fog.webp'

export function getFullWeekDayName(isoDate: string) {
	/* 
    This routine gets today's date in the form of ISO format. 
    It is responsible for returning the week days in order starting from today's date
   */

	// create dates Map
	const fullWeekdaysNames = new Map()
	fullWeekdaysNames.set('Sun', 'Sunday')
	fullWeekdaysNames.set('Mon', 'Monday')
	fullWeekdaysNames.set('Tue', 'Tuesday')
	fullWeekdaysNames.set('Wed', 'Wednesday')
	fullWeekdaysNames.set('Thu', 'Thursday')
	fullWeekdaysNames.set('Fri', 'Friday')
	fullWeekdaysNames.set('Sat', 'Saturday')
	// pass the input to the Date constructor
	const date = new Date(isoDate)
	// call toDateString() method
	const dateString = date.toDateString()
	// split on the space, and destructure the day name
	const [dayNameAbbreviated] = dateString.split(' ')
	// return the full day name using the map
	return fullWeekdaysNames.get(dayNameAbbreviated)
}
export function getAbbreviatedWeekDayName(isoDate: string) {
	// pass the input to the Date constructor
	const date = new Date(isoDate)
	// call toDateString() method
	const dateString = date.toDateString()
	// split on the space, and destructure the day name
	const [dayNameAbbreviated] = dateString.split(' ')
	return dayNameAbbreviated
}
export function getCorrectIconPathAccordingToWeatherCode(code: number) {
	switch (code) {
		case 0:
			// clear sky, but there is no icon for it, so I will add sunny
			/* Update: How will it be sunny on a clear sky night? */
			// I will use cloudy instead since these are the icons we have right now
			/* 
      I may track whether it is day or night and render different icons accordingly, but this will require
      a change in the redux store structure (which is already messy), so this will be deferred for later.
    */
			return iconFog
		case 1:
		case 2:
		case 3:
			return iconFog
	}
	return ''
}
export function extractTimeFromDateISOFormat(dateWithTime: string) {
	// This function takes date in iso format as a param
	/* 
    It passes that date in iso format to the Date() constructor.
    It is responsible for returning an array of times in 12 hour format
  */

	// pass the input date to Date() constructor
	const todayDateWithTime = new Date(dateWithTime)
	// call toLocaleTimeString() method on the newly created date
	const detailedTime = todayDateWithTime.toLocaleTimeString()
	// split the string on the " "
	// store whether it is AM or PM
	const [time, dayOrNight] = detailedTime.split(' ')
	// split the string  on the colon, and destructure it to get the hours
	const [hours] = time.split(':')
	// return the time eg "2 PM"
	return `${hours} ${dayOrNight}`
}

export function convertFromCelsiusToFahrenheit(degree: number): number {
	return Number((degree * (9 / 5) + 32).toFixed(0))
}
export function convertFromFahrenheitToCelsius(degree: number): number {
	return Number(((degree - 32) * (5 / 9)).toFixed(0))
}
export function convertFromKmPerHourToMph(speed: number): number {
	return Number((speed / 1.609).toFixed(0))
}
export function convertFromMphToKmPerHour(speed: number): number {
	return Number((speed * 1.609).toFixed(0))
}
export function convertFromMilliMeterToInches(mm: number): number {
	return Number((mm / 25.4).toFixed(0))
}
export function convertFromInchesToMillimeter(inch: number): number {
	return Number((inch * 25.4).toFixed(0))
}