import { CHANGE_TEMPERATURE_UNIT_TO_CELSIUS, CHANGE_TEMPERATURE_UNIT_TO_FAHRENHEIT, FETCH_WEATHER_DATA_STARTED, FETCH_WEATHER_DATA_SUCCEEDED } from "./actions";
import type { AppDispatch } from "./store";

function fetchInitialWeatherDataStarted() {
	return {
		type: FETCH_WEATHER_DATA_STARTED,
	}
}
function fetchInitialWeatherDataSucceeded(data: any) {
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
	return async (dispatch: AppDispatch) => {
		dispatch(fetchInitialWeatherDataStarted())

		const params = {
			latitude: 30.0626,
			longitude: 31.2497,
			hourly: 'temperature_2m,weather_code,apparent_temperature',
      daily: 'apparent_temperature_max,apparent_temperature_min,weather_code',
			timezone: 'Africa/Cairo',
			current: ['relative_humidity_2m', 'temperature_2m', 'wind_speed_10m', 'precipitation', 'weather_code'],
			timeformat: 'unixtime',
		}

    /* 
      In the params object, why are the `daily` options written as a string, while the `current` options
      are written as an array that is joined later? 
      => There is no specific reason. I was just trying different approaches.

      On later refactoring after the end of the hackathon, I shall follow one approach. 
    */

		let data = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${
				params.longitude
			}&hourly=${params.hourly}\
&timezone=${params.timezone}&current=${params.current.join(',')}&daily=${params.daily}`
		)
		const res = await data.json()
		dispatch(fetchInitialWeatherDataSucceeded(res))
	}
}
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