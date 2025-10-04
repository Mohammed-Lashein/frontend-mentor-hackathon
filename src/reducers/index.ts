import type { Action } from "redux";
import type { AppState } from "../store";
import { FETCH_WEATHER_DATA_STARTED, FETCH_WEATHER_DATA_SUCCEEDED } from "../actions-creators";
import { CHANGE_TEMPERATURE_UNIT, CHANGE_TEMPERATURE_UNIT_TO_CELSIUS, CHANGE_TEMPERATURE_UNIT_TO_FAHRENHEIT, CHANGE_WIND_SPEED_TO_KM_PER_HOUR } from "../actions";
import { convertFromCelsiusToFahrenheit, convertFromFahrenheitToCelsius, convertFromMphToKmPerHour } from "../utils";

interface ActionWithPayload extends Action {
    payload: any
}
type initialState = {
    weatherData: {
        currentTemperature?: number,
        current: {
            temperature_2m?: number, // with one el
            precipitation?: number,
            humidity?: number,
            wind_speed_10m: number,
        },
        current_units: {
            temperature_2m: string,
            precipitation: string,
            humidity: string,
            wind_speed_10m: string,

        }
        hourly_temperature: number[],
        hourly_units: {
            temperature_2m: string[]
        },
        hourly: {
            temperature_2m: number[]
        }
    },
    isLoading: boolean,
    currently_selected_units: {
        temperature: 'C' | 'F',
        wind_speed: 'km/h' | 'mph',
        precipitation: 'mm' | 'inch'

    },
    units: {
        temperature: {
            celsius: {
                label: 'Celsius',
                measuringUnit: 'C'
            },
            fahrenheit: {
                label: 'Fahrenheit',
                measuringUnit: 'F'
            },
        },
        precipitation: 'km/h' | 'mph',
        wind_speed: 'Millimeter' | 'inches'

    }
    units_abbreviations: {
        temperature: 'C' | 'F',
        precipitation: 'km/h' | 'mph',
        wind_speed: 'mm' | 'inches'
    }
}

export function weatherReducer(state: initialState, action: ActionWithPayload) {
    switch (action.type) {
        case FETCH_WEATHER_DATA_STARTED:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_WEATHER_DATA_SUCCEEDED: {
            return {
                ...state,
                weatherData: action.payload,
                units: {
                    temperature: action.payload.current_units.temperature_2m,
                    precipitation: action.payload.current_units.precipitation,
                    wind_speed: action.payload.current_units.wind_speed_10m
                }
            }
        }
        case CHANGE_TEMPERATURE_UNIT_TO_CELSIUS: 
        // loop over all of the temperatures and apply the formula of conversion on them
        const updatedTemperatureValues = state.weatherData.hourly.temperature_2m.map((value) => convertFromFahrenheitToCelsius(value))
        // update the selected temperature unit to celsius
        // return the old state but now the temperature values are updated

        return {
            ...state,
            currently_selected_units: {
                ...state.currently_selected_units,
                temperature: action.payload
            },
            weatherData: {
                ...state.weatherData,
                hourly: {
                    ...state.weatherData.hourly,
                    temperature_2m: updatedTemperatureValues
                }
            }
        }
        case CHANGE_TEMPERATURE_UNIT_TO_FAHRENHEIT: { 
        // loop over all of the temperatures and apply the formula of conversion on them
        const updatedTemperatureValues = state.weatherData.hourly.temperature_2m.map((value) => convertFromCelsiusToFahrenheit(value))
        // update the selected temperature unit to celsius
        // return the old state but now the temperature values are updated

        console.log(updatedTemperatureValues)
        return {
            ...state,
            currently_selected_units: {
                ...state.currently_selected_units,
                temperature: action.payload
            },
            weatherData: {
                ...state.weatherData,
                hourly: {
                    ...state.weatherData.hourly,
                    temperature_2m: updatedTemperatureValues
                }
            }
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
                       ... state.weatherData.current,
                       wind_speed_10m: wind_speed_in_km_per_hour
                    }
                },
                current_selected_units: {
                    ...state.currently_selected_units,
                    wind_speed: action.payload
                }
            }
        }

    }
}

// request params
const params = {
    "latitude": 30.0626,
    "longitude": 31.2497,
    "daily": "weather_code",
    "hourly": ["temperature_2m", "weather_code"],
    "current": ["temperature_2m", "relative_humidity_2m", "precipitation", "wind_speed_10m"],
    "timezone": "Africa/Cairo",
    "forecast_days": 1,
};
const jsonResult = ''