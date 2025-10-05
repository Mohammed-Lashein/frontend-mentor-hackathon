import {
  CHANGE_PRECIPITATION_TO_INCH,
  CHANGE_PRECIPITATION_TO_MM,
	CHANGE_TEMPERATURE_UNIT_TO_CELSIUS,
	CHANGE_TEMPERATURE_UNIT_TO_FAHRENHEIT,
	CHANGE_WIND_SPEED_TO_KM_PER_HOUR,
	CHANGE_WIND_SPEED_TO_Mph,
} from './actions'

// actions
export const FETCH_WEATHER_DATA_STARTED = 'FETCH_WEATHER_DATA_STARTED'
export const FETCH_WEATHER_DATA_SUCCEEDED = 'FETCH_WEATHER_DATA_SUCCEEDED'

function fetchInitialWeatherDataStarted() {
	return {
		type: FETCH_WEATHER_DATA_STARTED,
	}
}
function fetchInitialWeatherDataSucceeded(data: any) {
	console.log('full data fetched from api', data)
	return {
		type: FETCH_WEATHER_DATA_SUCCEEDED,
		payload: data,
	}
}
export function fetchInitialWeatherData() {
	/* 
        This routine is responsible for fetching the initial data that the application will use. 
        The retrieved data will then be used to update the store and rerender all subscriber components
    */
	return async (dispatch: any) => {
		dispatch(fetchInitialWeatherDataStarted())

		const params = {
			latitude: 30.0626,
			longitude: 31.2497,
			hourly: 'temperature_2m,weather_code,apparent_temperature',
      daily: 'apparent_temperature_max,apparent_temperature_min,weather_code',
			timezone: 'Africa/Cairo',
			current: ['relative_humidity_2m', 'temperature_2m', 'wind_speed_10m', 'precipitation', 'weather_code'],
			timeformat: 'unixtime',
			//  temperature_unit: 'fahrenheit'
		}
		// 			fetch(
		// 				`https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&forecast_days=1&hourly=${params.hourly}\
		// &timezone=${params.timezone}&daily=apparent_temperature_mean,precipitation_sum,wind_speed_10m_max`
		// 			)

		let data = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${
				params.longitude
			}&hourly=${params.hourly}\
&timezone=${params.timezone}&current=${params.current.join(',')}&daily=${params.daily}`
		)
    // &timeformat=${params.timeformat}
		const res = await data.json()
		dispatch(fetchInitialWeatherDataSucceeded(res))
	}
}

// units dropdown actions
export function changeTemperatureUnitToCelsius() {
	/* 
        This routine is responsible for dispatching the correction action type, along
        with providing that the chosen unit is celsius.

        Will the provided unit be just C or celsius ?
    */
	return {
		type: CHANGE_TEMPERATURE_UNIT_TO_CELSIUS,
		payload: '°C',
	}
}
export function changeTemperatureUnitToFahrenheit() {
	/* 
        This routine is responsible for dispatching the correction action type, along
        with providing that the chosen unit is celsius.

        Will the provided unit be just C or celsius ?
        => I used C initially
    */
	return {
		type: CHANGE_TEMPERATURE_UNIT_TO_FAHRENHEIT,
		payload: '°F',
	}
}
export function changeWindSpeedToKmPerHour() {
	return {
		type: CHANGE_WIND_SPEED_TO_KM_PER_HOUR,
		payload: 'km/h',
	}
}
export function changeWindSpeedToMph() {
	return {
		type: CHANGE_WIND_SPEED_TO_Mph,
		payload: 'mph',
	}
}
export function changePrecipitationToMm() {
  return {
    type: CHANGE_PRECIPITATION_TO_MM,
    payload: 'mm'
  }
}
export function changePrecipitationToInch() {
  return {
    type: CHANGE_PRECIPITATION_TO_INCH,
    payload: 'in'
  }
}
