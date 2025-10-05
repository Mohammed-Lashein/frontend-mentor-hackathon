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