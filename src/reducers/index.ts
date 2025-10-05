import type { Action } from 'redux'
import type { AppState } from '../store'
import { FETCH_WEATHER_DATA_STARTED, FETCH_WEATHER_DATA_SUCCEEDED } from '../actions-creators'
import {
	CHANGE_PRECIPITATION_TO_INCH,
	CHANGE_PRECIPITATION_TO_MM,
	CHANGE_TEMPERATURE_UNIT_TO_CELSIUS,
	CHANGE_TEMPERATURE_UNIT_TO_FAHRENHEIT,
	CHANGE_WIND_SPEED_TO_KM_PER_HOUR,
	CHANGE_WIND_SPEED_TO_Mph,
} from '../actions'
import {
	convertFromCelsiusToFahrenheit,
	convertFromFahrenheitToCelsius,
	convertFromInchesToMillimeter,
	convertFromKmPerHourToMph,
	convertFromMilliMeterToInches,
	convertFromMphToKmPerHour,
	getAbbreviatedWeekDaysNamesStartingFromToday,
	getFullWeekDaysNamesStartingFromToday,
} from '../utils'

interface ActionWithPayload extends Action {
	payload: any
}
type initialState = {
	weatherData: {
		currentTemperature?: number
		current: {
			temperature_2m?: number // with one el
			precipitation?: number
			humidity?: number
			wind_speed_10m: number
		}
		current_units: {
			temperature_2m: string
			precipitation: string
			humidity: string
			wind_speed_10m: string
		}
		hourly_temperature: number[]
		hourly_units: {
			temperature_2m: string[]
		}
		hourly: {
			temperature_2m: number[]
		}
	}
	isLoading: boolean
	currently_selected_units: {
		temperature: 'C' | 'F'
		wind_speed: 'km/h' | 'mph'
		precipitation: 'mm' | 'inch'
	}
	units: {
		temperature: {
			celsius: {
				label: 'Celsius'
				measuringUnit: 'C'
			}
			fahrenheit: {
				label: 'Fahrenheit'
				measuringUnit: 'F'
			}
		}
		precipitation: 'km/h' | 'mph'
		wind_speed: 'Millimeter' | 'inches'
	}
	units_abbreviations: {
		temperature: 'C' | 'F'
		precipitation: 'km/h' | 'mph'
		wind_speed: 'mm' | 'inches'
	}
	weekdaysNamesStartingFromToday: string[]
}

const initialState = {
	weatherData: {
		current: {
			temperature_2m: '',
			relative_humidity_2m: '',
			precipitation: '',
			wind_speed_2m: '',
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
	// dailyForecast: [
	// 	{
	// 		day: '',
	// 		maxTemperature: '',
	// 		minTemperature: '',
	// 		weatherCode: '',
	// 	},
	// ],
}

export function weatherReducer(state: any = initialState, action: any) {
	switch (action.type) {
		case FETCH_WEATHER_DATA_STARTED:
			return {
				...state,
				isLoading: true,
			}
		case FETCH_WEATHER_DATA_SUCCEEDED: {
			console.log(action.payload)
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
					getFullWeekDaysNamesStartingFromToday(day)
				),
			}
		}
		case CHANGE_TEMPERATURE_UNIT_TO_CELSIUS:
			// loop over all of the temperatures and apply the formula of conversion on them
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
			// update the selected temperature unit to celsius
			// return the old state but now the temperature values are updated
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
			// loop over all of the temperatures and apply the formula of conversion on them
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

			// update the selected temperature unit to celsius
			// return the old state but now the temperature values are updated
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
		case CHANGE_WIND_SPEED_TO_KM_PER_HOUR: {
			// get the value of the wind speed from the state and update it
			const wind_speed_in_km_per_hour = convertFromMphToKmPerHour(state.weatherData.current.wind_speed_10m)
			// return updated state with updated value AND measuring unit
			return {
				...state,
				weatherData: {
					...state.weatherData,
					current: {
						...state.weatherData.current,
						wind_speed_10m: wind_speed_in_km_per_hour,
					},
				},
				currently_selected_units: {
					...state.currently_selected_units,
					wind_speed: action.payload,
				},
			}
		}
		case CHANGE_WIND_SPEED_TO_Mph: {
			// get the value of the wind speed from the state and update it
			const wind_speed_in_km_per_hour = convertFromKmPerHourToMph(state.weatherData.current.wind_speed_10m)
			// return updated state with updated value AND measuring unit
			return {
				...state,
				weatherData: {
					...state.weatherData,
					current: {
						...state.weatherData.current,
						wind_speed_10m: wind_speed_in_km_per_hour,
					},
				},
				currently_selected_units: {
					...state.currently_selected_units,
					wind_speed: action.payload,
				},
			}
		}
		case CHANGE_PRECIPITATION_TO_INCH: {
			const precipitationInInch = convertFromMilliMeterToInches(state.weatherData.current.precipitation)
			return {
				...state,
				weatherData: {
					...state.weatherData,
					current: {
						...state.weatherData.current,
						precipitation: precipitationInInch,
					},
				},
				currently_selected_units: {
					...state.currently_selected_units,
					precipitation: action.payload,
				},
			}
		}
		case CHANGE_PRECIPITATION_TO_MM: {
			const precipitationInMm = convertFromInchesToMillimeter(state.weatherData.current.precipitation)
			return {
				...state,
				weatherData: {
					...state.weatherData,
					current: {
						...state.weatherData.current,
						precipitation: precipitationInMm,
					},
				},
				currently_selected_units: {
					...state.currently_selected_units,
					precipitation: action.payload,
				},
			}
		}
		default:
			return state
	}
}

// request params
const params = {
	latitude: 30.0626,
	longitude: 31.2497,
	daily: 'weather_code',
	hourly: ['temperature_2m', 'weather_code'],
	current: ['temperature_2m', 'relative_humidity_2m', 'precipitation', 'wind_speed_10m'],
	timezone: 'Africa/Cairo',
	forecast_days: 1,
}
const jsonResult = ''
