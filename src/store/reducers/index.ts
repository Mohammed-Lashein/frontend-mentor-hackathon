import type { Action } from 'redux'
import { FETCH_WEATHER_DATA_STARTED } from '../actions'

interface ActionWithPayload extends Action {
	payload: any
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
}
export function weatherDataReducer(state = initialState, action: ActionWithPayload) {
  switch (action.type) {
		case FETCH_WEATHER_DATA_STARTED:
			return {
				...state,
				isLoading: true,
			}
    }
	return state
}
