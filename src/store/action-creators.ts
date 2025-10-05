import { FETCH_WEATHER_DATA_STARTED } from "./actions";

function fetchInitialWeatherDataStarted() {
	return {
		type: FETCH_WEATHER_DATA_STARTED,
	}
}