import { CHANGE_TEMPERATURE_UNIT, CHANGE_TEMPERATURE_UNIT_TO_CELSIUS, CHANGE_TEMPERATURE_UNIT_TO_FAHRENHEIT, CHANGE_WIND_SPEED_TO_KM_PER_HOUR, CHANGE_WIND_SPEED_TO_Mph } from "./actions"

// actions
export const FETCH_WEATHER_DATA_STARTED = 'FETCH_WEATHER_DATA_STARTED'
export const FETCH_WEATHER_DATA_SUCCEEDED = 'FETCH_WEATHER_DATA_SUCCEEDED'




function fetchInitialWeatherDataStarted() {
    return {
        type: FETCH_WEATHER_DATA_STARTED
    }
}
function fetchInitialWeatherDataSucceeded(data: any) {
    return {
        type: FETCH_WEATHER_DATA_SUCCEEDED,
        payload: data
    }
}
function fetchInitialWeatherData() {
    /* 
        This routine is responsible for fetching the initial data that the application will use. 
        The retrieved data will then be used to update the store and rerender all subscriber components
    */
    return async (dispatch) => {
        dispatch(fetchInitialWeatherDataStarted())

        const data = await Promise.resolve({hello: 'data'})
        // const res = await data.json() // On a real api call, we will need to call json() method

        const  res = data
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
    payload: 'C'
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
    payload: 'F'
   }
}
export function changeWindSpeedToKmPerHour() {
    return {
        type: CHANGE_WIND_SPEED_TO_KM_PER_HOUR,
        payload: 'km/h'
    }
}
export function changeWindSpeedToMph() {
    return {
        type: CHANGE_WIND_SPEED_TO_Mph,
        payload: 'mph'
    }
}