// Create utils/index.ts that will contain

// - convertFromCelsiusToFahrenheit
// - convertFromFahrenheitToCelsius
// - convertFromKmPerHourToMph
// - convertFromMphToKmPerHour
// - convertFromMilliMeterToInches
// - convertFromInchesToMillimeter

export function convertFromCelsiusToFahrenheit(degree: number): number {
    return Number((degree * (9 / 5) + 32).toFixed(2));
}
export function convertFromFahrenheitToCelsius(degree: number): number {
    return Number(((degree - 32) * (5 / 9)).toFixed(2))
}
export function convertFromKmPerHourToMph(speed: number): number {
    return Number((speed / 1.609).toFixed(2))
}
export function convertFromMphToKmPerHour(speed: number): number {
    return Number((speed * 1.609).toFixed(2))
}
export function convertFromMilliMeterToInches(mm: number): number {
    return Number((mm / 25.4).toFixed(2))
}
export function convertFromInchesToMillimeter(inch: number): number {
    return Number((inch * 25.4).toFixed(2))
}
export function extractTimeFromDateISOFormat(date: string) {
  // This function takes date in iso format as a param
  /* 
    It passes that date in iso format to the Date() constructor.
    It is responsible for returning an array of times in 12 hour format
  */

  // pass the input date to Date() constructor
  // call toLocaletimeString() method on the newly created date
  // split the string on the " "
  // split the string  on the colon, and destructure it to get the hours and minutes
  // store whether it is AM or PM
  // return the time eg "02:00 PM"
}
export function getWeekDaysStartingFromToday(date: string) {
  /* 
    This routine gets today's date in the form of ISO format. 
    It is responsible for returning the week days in order starting from today's date
   */
}

// toLocaleTimeString()
// '12:00:00 AM'
// '2:00:00 PM'


// .toDateString()
// 'Sun Oct 05 2025'