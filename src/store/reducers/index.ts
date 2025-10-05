import type { Action } from 'redux'
import { CHANGE_TEMPERATURE_UNIT_TO_CELSIUS, CHANGE_TEMPERATURE_UNIT_TO_FAHRENHEIT, FETCH_WEATHER_DATA_STARTED, FETCH_WEATHER_DATA_SUCCEEDED } from '../actions'
import { convertFromCelsiusToFahrenheit, convertFromFahrenheitToCelsius, getFullWeekDayName } from '../../utils'

interface ActionWithPayload extends Action {
	payload?: any
}
const initialState = {
	weatherData: {
		current: {
			temperature_2m: 0,
			relative_humidity_2m: 0,
			precipitation: 0,
			wind_speed_2m: 0,
		},
		current_units: {
			temperature_2m: '',
			relative_humidity_2m: '',
			precipitation: '',
			wind_speed_2m: '',
		},
		daily: {
			time: [],
			apparent_temperature_max: [],
			apparent_temperature_min: [],
		},
		hourly: {
			time: [],
			weather_code: [],
			temperature_2m: [],
		},
	},
	currently_selected_units: {
		temperature: '°C',
		wind_speed: 'km/h',
		precipitation: 'mm',
	},
	weekdaysNamesStartingFromToday: [],
}
export function weatherDataReducer(state = initialState, action: ActionWithPayload) {
  switch (action.type) {
		case FETCH_WEATHER_DATA_STARTED:
			return {
				...state,
				isLoading: true,
			}
      case FETCH_WEATHER_DATA_SUCCEEDED: {
			return {
				...state,
				weatherData: action.payload,
				units: {
					temperature: action.payload.current_units.temperature_2m,
					precipitation: action.payload.current_units.precipitation,
					wind_speed: action.payload.current_units.wind_speed_10m,
				},
				isLoading: false,
				weekdaysNamesStartingFromToday: action.payload.daily.time.map((day: string) =>
					getFullWeekDayName(day)
				),
			}
		}
    case CHANGE_TEMPERATURE_UNIT_TO_CELSIUS:
			const hourlyUpdatedTemperatureValues = state.weatherData.hourly.temperature_2m.map((value) =>
				convertFromFahrenheitToCelsius(value)
			)
			const dailyApparentTempMaxUpdated = state.weatherData.daily.apparent_temperature_max.map((value) =>
				convertFromFahrenheitToCelsius(value)
			)
			const dailyApparentTempMinUpdated = state.weatherData.daily.apparent_temperature_min.map((value) =>
				convertFromFahrenheitToCelsius(value)
			)
			const currentTemperatureUpdated = convertFromFahrenheitToCelsius(state.weatherData.current.temperature_2m)
			return {
				...state,
				currently_selected_units: {
					...state.currently_selected_units,
					temperature: action.payload,
				},
				weatherData: {
					...state.weatherData,
					hourly: {
						...state.weatherData.hourly,
						temperature_2m: hourlyUpdatedTemperatureValues,
					},
					daily: {
						...state.weatherData.daily,
						apparent_temperature_max: dailyApparentTempMaxUpdated,
						apparent_temperature_min: dailyApparentTempMinUpdated,
					},
					current: {
						...state.weatherData.current,
						temperature_2m: currentTemperatureUpdated,
					},
				},
			}
		case CHANGE_TEMPERATURE_UNIT_TO_FAHRENHEIT: {
			const hourlyUpdatedTemperatureValues = state.weatherData.hourly.temperature_2m.map((value) =>
				convertFromCelsiusToFahrenheit(value)
			)

			const dailyApparentTempMaxUpdated = state.weatherData.daily.apparent_temperature_max.map((value) =>
				convertFromCelsiusToFahrenheit(value)
			)
			const dailyApparentTempMinUpdated = state.weatherData.daily.apparent_temperature_min.map((value) =>
				convertFromCelsiusToFahrenheit(value)
			)
			const currentTemperatureUpdated = convertFromCelsiusToFahrenheit(state.weatherData.current.temperature_2m)

			return {
				...state,
				currently_selected_units: {
					...state.currently_selected_units,
					temperature: action.payload,
				},
				weatherData: {
					...state.weatherData,
					hourly: {
						...state.weatherData.hourly,
						temperature_2m: hourlyUpdatedTemperatureValues,
					},
					daily: {
						...state.weatherData.daily,
						apparent_temperature_max: dailyApparentTempMaxUpdated,
						apparent_temperature_min: dailyApparentTempMinUpdated,
					},
					current: {
						...state.weatherData.current,
						temperature_2m: currentTemperatureUpdated,
					},
				},
			}
		}
    }
	return state
}
