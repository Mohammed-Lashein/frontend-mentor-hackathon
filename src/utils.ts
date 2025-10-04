// Create utils/index.ts that will contain

// - convertFromCelsiusToFahrenheit
// - convertFromFahrenheitToCelsius
// - convertFromKmPerHourToMph
// - convertFromMphToKmPerHour
// - convertFromMilliMeterToInches
// - convertFromInchesToMillimeter

export function convertFromCelsiusToFahrenheit(degree: number): number {
    return degree * (9 / 5) + 32;
}
export function convertFromFahrenheitToCelsius(degree: number): number {
    return (degree - 32) * (5 / 9)
}
export function convertFromKmPerHourToMph(speed: number): number {
    return speed / 1.609
}
export function convertFromMphToKmPerHour(speed: number): number {
    return speed * 1.609
}
export function convertFromMilliMeterToInches(mm: number): number {
    return mm / 25.4
}
export function convertFromInchesToMillimeter(inch: number): number {
    return inch * 25.4
}