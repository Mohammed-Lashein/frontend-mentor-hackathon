import { useAppSelector } from '../hooks'
import WeatherCard from './WeatherCard'

function WeatherCards() {
	const data = useAppSelector((state) => {
		const weatherData = state.weatherData
		return [
			{
				label: 'Feels Like',
				value: weatherData.current.temperature_2m + state.currently_selected_units.temperature,
			},
			{
				label: 'Humidity',
				value: weatherData.current.relative_humidity_2m + weatherData.current_units.relative_humidity_2m,
			},
			{
				label: 'Wind',
				value: weatherData.current.wind_speed_10m + state.currently_selected_units.wind_speed,
			},
			{
				label: 'Precipitation',
				value: weatherData.current.precipitation + state.currently_selected_units.precipitation,
			},
		]
	})
	const dataForCards = data
	return (
		<div className='grid grid-cols-2 sm:grid-cols-4 pt-400 gap-300'>
			{dataForCards.map(({ label, value }) => (
				<WeatherCard
					label={label}
					value={value}
					key={label}
				/>
			))}
		</div>
	)
}
export default WeatherCards
